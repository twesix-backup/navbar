const mongodb=vars.database.mongodb;
const fail=vars.req.fail;
const success=vars.req.success;

function bind(query,res,req)
{
    if(query.qq&&query.uid&&query.access_token)
    {
        query.qq=JSON.parse(query.qq);
        if(!query.qq.openid)
        {
            res.end(fail(`no openid`));
            return ;
        }
        if(!query.qq.avatar)
        {
            res.end(fail(`no avatar`));
            return ;
        }
        if(!query.qq.nickname)
        {
            res.end(fail(`no nickname`));
            return ;
        }
        if(!query.qq.account)
        {
            res.end(fail(`no openid`));
            return ;
        }
        mongodb.twesix.user.qq.bind(query.uid,query.access_token,query.qq)
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

module.exports=bind;