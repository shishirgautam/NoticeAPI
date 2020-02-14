const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verify = require('./verifyToken');

//GET BACK ALL THE POSTS
router.get('/', verify,  async (req,res) => {

    try{
        var query = { status: true };

        const posts = await Post.find(query);
        res.json(posts);

    }catch(err){
        res.json({messag:err});
    }
 
});

//SUBMITS A POSTS
router.post('/',verify, async (req,res) => {
   const post = new Post({
       title: req.body.title,
       description: req.body.description,
       status: true
   }); 
try{
const savedPost = await post.save()
res.json(savedPost);
}catch(err){
    res.json({message: err});
}
});

//SPECIFIC POST for either status is true or false
router.get('/:postId', async(req, res) =>{
    try{

        const post = await Post.findById(req.params.postId);
        res.json(post);

    }catch(err){
        res.json({message: err});
    }
})

//find specific post whose status is true
router.get('/:postId/active', async(req, res) =>{
    try{
        var query = { status: true, _id: req.params.postId };

        const post = await Post.find(query);
        res.json(post);

    }catch(err){
        res.json({message: err});
    }
})
//delete post from database
router.delete('/:postId',async (req,res) => {
    try{
    const removedPost= await Post.remove({_id: req.params.postId});
    res.json(removedPost);
    }catch(err){
        res.json({message: err});
    }
});

//soft delete 
router.patch('/:postId/inactive',async(req,res) =>{
    try{
        const id = req.params.postId;
        const updateObject = req.body;
        updateObject.status= false;
        updateObject.update_date = Date.now();
        const updatePost = await Post.update(
            { _id: id },
            { $set: updateObject},

        );
        res.json(updatePost);
    }catch(err){
res.json({message: err});
    }
})

//Update  a post
router.patch('/:postId',async(req,res) =>{
    try{
        const id = req.params.postId;
        const updateObject = req.body;
        updateObject.update_date = Date.now();

        const updatePost = await Post.update(
            { _id: id },
            { $set: updateObject},

        );
        res.json(updatePost);
    }catch(err){
res.json({message: err});
    }
})


module.exports = router;
    