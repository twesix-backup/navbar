let db=global.vars.db;

module.exports.get=function(req,res)
{
    let query=req.query;
    console.log(query);
    if
    (
        !
            (
                query.password&&
                query.email&&
                query.email.match(/[0-9a-zA-Z.\-_]+@[0-9a-zA-Z\-_]+.[0-9a-zA-Z\-_]+/)
            )
    )
    {
        res
            .status(200)
            .json
            (
                {
                    status:'parameter_check_failed',
                    message:'参数检查未通过'
                }
            )
        ;
    }
    else
    {
        let uid=build_uid(query.email);

        let sql=`
                insert into user.user(uid,email,password) 
                values('${uid}','${query.email}','${query.password}')
            `;
        // console.log(sql);
        db.query
        (
            sql,
            function(err,rows,fields)
            {
                if(err)
                {
                    res
                        .status(200)
                        .json
                        (
                            {
                                status:'failed_to_add_user',
                                message:'添加用户失败,该用户可能已经存在'
                            }
                        )
                    ;
                    console.log(err);
                }
                else
                {
                    if(rows.affectedRows == 1)
                    {
                        res
                            .status(200)
                            .json
                            (
                                {
                                    status:'ok',
                                    message:'添加用户成功'
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
                                    status:'failed_to_add_user',
                                    message:'添加用户失败'
                                }
                            )
                        ;
                    }
                }
            }
        );
    }
};

function build_uid(email)
{
    let str=email.replace(/[\-_.@]/,'').replace('.','');
    while(str.length<64)
    {
        str+=((new Date().getTime()+Math.random()*1e21)*Math.random()).toString(36);
    }
    return str;
}