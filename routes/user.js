const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')
const Post = require('../schemas/postSchema')


router.get('/',function(req,res,next){
    
    Post.find().then(function(posts){
        //cosole.log(posts)
    res.render('post/viewPost',{posts:posts})
    }).catch(next)    
})

router.get('/register',function(req,res,next){
    
    res.render('registration')
    
})

router.post('/register',function(req,res,next){
    let username = req.body.username.toLowerCase()
    let password = req.body.password.toLowerCase()
    
    User.create({username:username,password:password}).then(function(savedUser){
        console.log(savedUser)
        res.redirect('/login')
    }).catch(next)    

})

router.get('/login',function(req,res,next){
    
    res.render('login')
})

router.post('/login',function(req,res,next){
    let username = req.body.username.toLowerCase()
    let password = req.body.password.toLowerCase()
    User.findOne({username:username,password:password}).then(function(user){
        console.log(user)


        if(!user){
            res.redirect('/register')
            return
        }
        if(user){
            req.session.username = user.username
            console.log(req.session.username)
            req.session.userId = user._id
            console.log(req.session.userId)
            
            var hour = 3600000
            req.session.cookie.expires = new Date(Date.now() + hour)
            req.session.cookie.maxAge = hour

            //Post.find({userId:req.session.userId}).then(function(posts){
            res.redirect('/myposts')
               
        }    
    }).catch(next)
})
router.get('/logout',function(req,res,next){
    req.session.destroy()
    
    res.redirect('/login')
})


module.exports = router