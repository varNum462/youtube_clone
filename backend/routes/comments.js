const { Comment, Reply, validateComment } = require("../models/comment");
const express = require("express");
const router = express.Router();

//Endpoints go here
//GET Comments
router.get("/:videoId", async (req, res) => {
    try {
        let comments = await Comment.find({videoId:req.params.videoId});
        if (!comments) return res.status(400).send("No comments yet! Why don't you add one?");
        return res.status(200).send(comments);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//POST Comments
router.post("/", async (req, res) => {
    try {
        const { error } = validateComment(req.body);
        if (error) return res.status(400).send(error);

        let newComment = await new Comment(req.body);
        await newComment.save();

        return res.status(201).send(newComment);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//PUT Replies
router.put("/:commentId/replies", async (req, res) => {
    try {       
        let comment = await Comment.findById(req.params.commentId);
        
        if (!comment) return res.
            status(400)
            .send(`Comment does not exist!`)
        
        let newReply = await new Reply(req.body);
        
        comment.replies.push(newReply);
        comment.save();
        
        return res.status(200).send(comment);        
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//PUT Likes
router.put("/:commentId/likes", async (req, res) => {
    try {       
        let comment = await Comment.findById(req.params.commentId);
        
        if (!comment) return res.status(400).send(`Comment does not exist!`)
        
        comment.likes++;
        
        await comment.save();
        
        return res.status(200).send(comment);        
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//PUT Dislikes
router.put("/:commentId/dislikes", async (req, res) => {
    try {       
        let comment = await Comment.findById(req.params.commentId);
        
        if (!comment) return res.status(400).send(`Comment does not exist!`)
        
        comment.dislikes++;
        
        await comment.save();
        
        return res.status(200).send(comment);        
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

module.exports = router;