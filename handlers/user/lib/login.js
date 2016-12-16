const mongodb=vars.database.mongodb;
const fail=vars.req.fail;
const success=vars.req.success;

function login(query,res,req)
{
    if(query.name&&query.password)
    {
        mongodb.twesix.user.login(query.name,query.password)
            .then(function(data)
            {
                res.end(success(data));
            },function(err)
            {
                res.end(fail(err));
            })
    }
    else
    {
        res.end(fail('请求参数错误'));
    }
}

module.exports=login;