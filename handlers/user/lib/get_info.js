const mongodb=vars.database.mongodb;
const fail=vars.req.fail;
const success=vars.req.success;

function get_info(query,res,req)
{
    if(query.access_token&&query.uid)
    {
        mongodb.twesix.user.get_info(query.uid,query.access_token)
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
        res.end(fail('请求参数不正确'));
    }
}

module.exports=get_info;