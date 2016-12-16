const success=global.vars.req.success;

function welcome(query,res,req)
{
    res.end(success('hello world'));
}

module.exports=welcome;