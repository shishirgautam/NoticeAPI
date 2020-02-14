const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const verify = require('./verifyToken');

//GET BACK ALL THE comments either active or inactive
router.get('/', verify,  async (req,res) => {
    try{
        var query = { status: true };
        const posts = await Comment.find(query);
        res.json(posts);

    }catch(err){
        res.json({messag:err});
    }
 
});

//GET BACK ALL THE comments for particular post
//SPECIFIC POST
router.get('/:post_id/posts', async(req, res) =>{
    try{
        const id = req.params.post_id;
        var query = { postId: id, status: true};

        const userComments = await Comment.find(query);
        res.json(userComments);

    }catch(err){
        res.json({message: err});
    }
})

//SUBMITS A POSTS
router.post('/:postId/posts', verify,async (req,res) => {
   const userComments = new Comment({
        comments: req.body.comments,
        postId: req.params.postId,
        // userId: req.params.userId
        status: true,
       }); 
try{
const savedComments = await userComments.save()
res.json(savedComments);
}catch(err){
    res.json({message: err});
}
});

//SPECIFIC Comments
router.get('/:commentId/posts',verify, async(req, res) =>{
    try{
        const userComments = await Comment.findById(req.params.commentId);
        res.json(userComments);

    }catch(err){
        res.json({message: err});
    }
})

//delete post

router.delete('/:post_id/posts/:commentId',async (req,res) => {
    try{
    const post_id = req.params.post_id;
    const removedComment= await Comment.remove({_id: req.params.commentId});
    res.json(removedComment);
    }catch(err){
        res.json({message: err});
    }
});


router.patch('/:post_id/posts/:commentId',async(req,res) =>{
    try{
        const post_id = req.params.post_id;
        const comment_id = req.params.commentId;
        const updateObject = req.body;
        updateObject.status = false;
        updateObject.update_date = Date.now();
        updateObject.postId = post_id;

        const updatePost = await Comment.update(
            { _id: comment_id },
            { $set: updateObject},

        );
        res.json(updatePost);
    }catch(err){
res.json({message: err});
    }
})


//Update  a comment
router.patch('/:post_id/posts/:commentId',async(req,res) =>{
    try{
        const post_id = req.params.post_id;
        const comment_id = req.params.commentId;
        const updateObject = req.body;
        updateObject.update_date = Date.now();
        updateObject.postId = post_id;

        const updatePost = await Comment.update(
            { _id: comment_id },
            { $set: updateObject},

        );
        res.json(updatePost);
    }catch(err){
res.json({message: err});
    }
})


module.exports = router;
    