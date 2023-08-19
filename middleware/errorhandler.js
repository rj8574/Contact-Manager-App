const {constants} =require("../constants")

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ?res.statusCode :500;
    switch(statusCode){
        case constants.Validation_ERROR:
            res.json({title :"NOT Found" ,
            message :err.message,
            stackTrace:err.stack})
            break;
        case constants.NOT_FOUND:
            res.json({title :"Validation Failed" ,
            message :err.message,
            stackTrace:err.stack})
        case constants.UNAUTHORIZED:
            res.json({title :"UNUTHORIZED" ,
            message :err.message,
            stackTrace:err.stack})
        case constants.FORBIDDEN:
            res.json({title :"Forbidden" ,
            message :err.message,
            stackTrace:err.stack})
        case constants.SERVER_ERROR:
            res.json({title :"Server Error" ,
            message :err.message,
            stackTrace:err.stack})
        default :
            console.log("No Error, All Good")
            break;

    }
    
};
module.exports=errorHandler;