let db=global.vars.db;

module.exports.get=function(req,res)
{
    let query=req.query;
    console.log(query);
    if
    (
        !
            (
                query.email&&
                query.email.match(/[0-9a-zA-Z.\-_]@[0-9a-zA-Z\-_].[0-9a-zA-Z\-_]/)
            )
    )
    {
        res
            .status(200)
            .json
            (
                {
                    status:'email_check_failed',
                    error:'参数检查未通过'
                }
            )
        ;
    }
    else
    {

        let sql=`
                 select uid
                 from user.user
                 where email='${query.email}'
                
            `;
        // console.log(sql);
        db.query
        (
            sql,
            function(err,result)
            {
                console.log(result);
                if(err)
                {
                    res
                        .status(200)
                        .json
                        (
                            {
                                status:'database_error',
                                error:'查询失败'
                            }
                        )
                    ;
                    console.log(err);
                }
                else
                {
                    if(result.length !== 0 )
                    {
                        res
                            .status(200)
                            .json
                            (
                                {
                                    status:'user_exists',
                                    uid:result[0].uid
                                }
                            )
                        ;
                    }
                    else
                    {
                        res
                            .status(200)
                            .json
                            (
                                {
                                    status:'user_not_exist',
                                    message:'该用户不存在'
                                }
                            )
                        ;
                    }
                }
            }
        );
    }
};