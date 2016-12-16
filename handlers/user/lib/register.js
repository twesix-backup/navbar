const mongodb=vars.database.mongodb;
const fail=vars.req.fail;
const success=vars.req.success;

function register(query,res,req)
{
    if(query.username&&query.password)
    {
        mongodb.twesix.user.register(query.username,query.password)
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
        res.end(fail(`parameter is not complete`));
    }
}

module.exports=register;