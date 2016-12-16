const mongodb=vars.database.mongodb;
const fail=vars.req.fail;
const success=vars.req.success;

function set_account(query,res,req)
{
    if(query.uid&&query.access_token&&query.account)
    {
        mongodb.twesix.user.set_account(query.uid,query.access_token,query.account)
            .then(function(data)
            {
                res.end(success(data));
            },function(err)
            {
                res.end(fail(err));
            })
        ;
    }
    else
    {
        res.end(fail(`request parameters is not complete`));
    }
}

module.exports=set_account;
