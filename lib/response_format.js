function set_properties(res)
{
    res.fail=function(err)
    {
        return {
            ok:false,
            err:err
        }
    };

    res.success=function(data)
    {
        return {
            ok:true,
            data:data
        }
    };
}

module.exports=set_properties;