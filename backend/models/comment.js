const mongoose = require("mongoose");
const Joi = require("joi");

const replySchema = new mongoose.Schema({
    message: {type:String, required: true, minlength: 2, maxlength:255},
    dateAdded: {type:Date, default: Date.now()},
    likes: {type:Number,default:0},
    dislikes: {type:Number,default:0}  
}); 

const commentSchema = new mongoose.Schema({
    message: {type:String, required: true, minlength: 2, maxlength:255},
    videoId: {type:String, required: true},
    replies: [{type:replySchema}],
    dateAdded: {type:Date, default: Date.now()},
    likes: {type:Number,default:0},
    dislikes: {type:Number,default:0}  
});

function validateComment(comment){
    const schema = Joi.object({
        message: Joi.string().min(2).max(255).required(),
        videoId: Joi.string().required()        
    });
    return schema.validate(comment);
};

const Comment = mongoose.model("Comment", commentSchema);
const Reply = mongoose.model("Reply", replySchema);

module.exports = {
    Comment,
    Reply,
    validateComment,
    commentSchema,
    replySchema
};