const mongodb=vars.database.mongodb;
const fail=vars.req.fail;
const success=vars.req.success;

function login(query,res,req)
{
    if(query.uid&&query.access_token)
    {
        mongodb.twesix.user.qq.unbind(query.uid,query.access_token)
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
        res.end(fail('parameter in not complete'));
    }
}

module.exports=login;