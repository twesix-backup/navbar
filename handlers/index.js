let index={};

index.get=function(req,res)
{
    res.status(200).json({ok:true,data:`it works ! request method is --get-- !`});
};

index.post=function(req,res)
{
    res.status(200).json({ok:true,data:`it works ! request method is --post-- !!`});
};


module.exports=index;

