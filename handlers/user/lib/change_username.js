const mongodb=vars.database.mongodb;
const fail=vars.req.fail;
const success=vars.req.success;

function change_username(query,res,req)
{
    if(query.uid&&query.access_token&&query.username)
    {
        mongodb.twesix.user.change_username(query.uid,query.access_token,query.username)
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
        res.end(fail(`request parameters is not complete`));
    }
}

module.exports=change_username;
