const mongodb=vars.database.mongodb;
const fail=vars.req.fail;
const success=vars.req.success;

function login(query,res,req)
{
    if(query.qq)
    {
        try
        {
            query.qq=JSON.parse(query.qq);
        }
        catch(err)
        {
            res.end(fail(err));
            return ;
        }
        if(!query.qq.openid)
        {
            res.end(fail(`no openid`));
            return ;
        }
        mongodb.twesix.user.qq.login(query.qq)
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
        res.end(fail('request parameter in not complete'));
    }
}

module.exports=login;