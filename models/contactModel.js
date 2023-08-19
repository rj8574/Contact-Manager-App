const mongoose=require("mongoose");

const conatactSchema =mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    name:{
        type:String,
        require:[true,"please add the contact  name"]
    },
    email:{
        type:String,
        require:[true,"please add the contact  email address"]
    },
    phone :{
        type:String,
        require:[true,"please add the contact phone No"]
    }   
}
,{
    timestamps:true,
});
module.exports =mongoose.model("contact",conatactSchema)