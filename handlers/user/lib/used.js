const mongodb=vars.database.mongodb;
const fail=vars.req.fail;
const success=vars.req.success;

function used(query,res,req)
{
    var key=query.key;
    var value=query.value;
    if(key&&value)
    {
        switch(key)
        {
            default         : res.end(fail('invalid query type')); return; break;
            case 'username' : break;
            case 'account'  : break;
            case 'email'    : break;
            case 'phone'    : break;
            case 'qq'       : key=`qq.openid`; break;
            case 'wechat'   : key=`wechat.openid`; break;
        }
        mongodb.twesix.user.used(key,value)
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
        res.end(fail(`parameter is not complete`));
    }
}

module.exports=used;