let db=global.vars.db;
let redis=global.vars.redis;

let login_expire=3600*24*7;

module.exports.get=function(req,res)
{
    let query=req.query;
    let sql='';
    if(!query.password)
    {
        res
            .status(200)
            .json
            (
                {
                    status:'no_password',
                    message:'登录不能没有密码'
                }
            );
        return ;
    }
    else if(!query.account)
    {
        res
            .status(200)
            .json
            (
                {
                    status:'no_account',
                    message:'登录不能没有账户'
                }
            );
        return ;
    }
    else
    {
        sql=
            `
            select uid 
            from user.user
            where email='${query.account}' and password='${query.password}'
            `
        ;
    }
    db.query
    (
        sql,
        function(err,rows)
        {
            if(err)
            {
                database_error(err,res);
                return ;
            }
            if(rows.length===0)
            {
                res
                    .status(200)
                    .json
                    (
                        {
                            status:'account_and_password_not_match',
                            message:'账号不存在或者密码错误'
                        }
                    );
            }
            else
            {
                if(res.length>1)
                {
                    database_exception(res);
                }
                else
                {
                    redis.exists(`access_token:${rows[0].uid}`,function(err,reply)
                    {
                        if(err)
                        {
                            database_error(err,res);
                        }
                        else
                        {
                            if(reply===1)
                            {
                                redis.get(`access_token:${rows[0].uid}`,function(err,reply)
                                {
                                    if(err)
                                    {
                                        database_error(err,res);
                                    }
                                    else
                                    {
                                        res
                                            .status(200)
                                            .json
                                            (
                                                {
                                                    status:'ok',
                                                    data:
                                                        {
                                                            uid:rows[0].uid,
                                                            email:query.email,
                                                            access_token:reply
                                                        }
                                                }
                                            )
                                        ;
                                    }
                                })
                            }
                            else
                            {
                                let access_token=build_access_token();
                                redis.set(`access_token:${rows[0].uid}`,access_token,function(err,reply)
                                {
                                    if(err)
                                    {
                                        database_error(err,res);
                                    }
                                    else
                                    {
                                        redis.expire(`access_token:${rows[0].uid}`,login_expire,function(err,reply)
                                        {
                                            if(err)
                                            {
                                                database_error(err,res);
                                            }
                                            else
                                            {
                                                res
                                                    .status(200)
                                                    .json
                                                    (
                                                        {
                                                            status:'ok',
                                                            data:
                                                                {
                                                                    uid:rows[0].uid,
                                                                    email:query.email,
                                                                    access_token:access_token
                                                                }
                                                        }
                                                    )
                                                ;
                                            }

                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    );
};

function build_access_token()
{
    let access_token='';
    while(access_token.length<64)
    {
        access_token+=Math.random().toString(36);
    }
    return access_token;
}

function database_exception(res)
{
    console.log('[database] : 数据库异常，多于一个拥有相同email和密码的用户');
    res
        .status(200)
        .json
        (
            {
                status:'database_exception',
                message:'数据库异常，请重试'
            }
        );
}

function database_error(err,res)
{
    res
        .status(200)
        .json
        (
            {
                status:'database_error',
                message:'数据库错误',
                error:err
            }
        );
    console.log(err);
}

function end(res)
{
    res.status(200).json({});
}