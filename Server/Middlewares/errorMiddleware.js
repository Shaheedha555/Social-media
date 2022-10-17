const errorHandler = (err,req,res,next)=>{
    console.log('err middl');
    const statusCode = res.statusCode ? res.statusCode : 500
    console.log(statusCode);
    res.status(statusCode)
    console.log(err.message + 'msg');
    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = { 
    errorHandler
}