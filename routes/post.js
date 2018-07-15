const express = require('express')
const router = express.Router()

const Post = require('../schemas/postSchema')
const PostComment = require('../schemas/commentSchema')
const User = require('../schemas/userSchema')

// router.get('/',function(req,res,next){
//     Post.find().then(function(posts){
//         //console.log(posts)
//     res.render('post/viewPost',{posts:posts})
//     }).catch(next)
//     //res.send({type:'GET'})
// })


router.post('/post/addpost',function(req,res,next){
    Post.create({title:req.body.title,imageURL:req.body.imageURL,content:req.body.content,userId:req.session.userId}).then(function(savedPost){
        //console.log(savedPost)
        res.redirect('/myposts')
    }).catch(next)    
})

router.get('/post',function(req,res,next){
    Post.find().then(function(posts){
        //cosole.log(posts)
    res.render('post/viewPost',{posts:posts})
    }).catch(next)
    
})

router.get('/post/:id',function(req,res,next){
    //console.log(req.params.id)
    Post.findById({_id:req.params.id}).then(function(selectedPost){
        //console.log(selectedPost)
        res.render('post/viewPostDetails',{post:selectedPost})
            }).catch(next)    
})

router.post('/post/update/:id',function(req,res,next){
    Post.findByIdAndUpdate({_id:req.params.id},{title:req.body.title,imageURL:req.body.imageURL,content:req.body.content,userId:req.session.userId}).then(function(updatedPost){
        //console.log(updatedPost)
        res.redirect('/myposts')
    }).catch(next)    
})

router.post('/post/delete/:id',function(req,res,next){
  
    //console.log(req.body.postId)
    User.findByIdAndRemove({_id:req.params.id}).then(function(removedPost){
        PostComment.findByIdAndRemove({_id:req.params.id}).then(function(removedPost){
            Post.findByIdAndRemove({_id:req.params.id}).then(function(removedPost){
        //console.log(removedPost)
        res.redirect('/post')
            }).catch(next) 
        }).catch(next)    
    }).catch(next)    
})
router.get('/post/comment/:id',function(req,res,next){
    PostComment.find({postId:req.params.id}).then(function(selectedComment){
        
    //PostComment.find({$group: {postId:req.params.id,total:{$sum:"$_id"}}}).then(function(selectedComment){
        console.log(selectedComment)
        //console.log(total)
        res.render('post/viewPostDetails',{commentDetails:selectedComment})
    }).catch(next)    
})

router.post('/post/comment/:id',function(req,res,next){
    //console.log(req.params.id)
    PostComment.create({name:req.body.name,email:req.body.email,comment:req.body.comment,postId:req.params.id}).then(function(savedComment){
        //console.log(savedComment)
        res.redirect('/post/'+req.params.id)
    }).catch(next)    
})

router.get('/myposts',function(req,res,next){
    if(req.session.userId){
    Post.find({userId:req.session.userId}).then(function(myPosts){
        
    res.render('post/myPosts',{myPosts:myPosts})
    }).catch(next)
    return
    } 
    if(!req.session.userId){
        res.redirect('/login')
        return
    }
})

router.get('/myposts/:id',function(req,res,next){
    //console.log(req.params.id)
    Post.findById({_id:req.params.id}).then(function(selectedPost){
        //console.log(selectedPost)
        res.render('post/myViewPostDetails',{post:selectedPost})
            }).catch(next)    
})


module.exports = router
