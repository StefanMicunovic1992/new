const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const signUpTemplate = require('../models/SignupModels')
const savePodcastTemplate = require('../models/SavePodcastModels')
const saveCommentTemplate = require('../models/SaveCommentModels');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');


router.post('/signup', async (req, res) => {

    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    let findUserByEmail = await signUpTemplate.findOne({ email: req.body.email });
    let findUserByUsername = await signUpTemplate.findOne({ username: req.body.username });
    
    if (findUserByEmail || findUserByUsername) {
        console.log('postoji')
        return res.json({ status: "error", error: "Account on this email or username already existing" });
    } else {
        const signUpUser = new signUpTemplate({
            username: req.body.username,
            email: req.body.email,
            password: securePassword
        })
        console.log(signUpUser);
        signUpUser.save()
            .then(data => {
                res.json(data)
            })
            .catch(error => {
                res.json(error)
            })
    }
})

router.post('/findUser', async (req, res) => {
    
    console.log(req.body);
    let findUser = await signUpTemplate.findOne({ username: req.body.username });
    if (findUser) {
        console.log(findUser)
        bcrypt.compare(req.body.password, findUser.password, (err, data) => {
            if (data) {
                const accessToken = jwt.sign(findUser.username, process.env.ACCESS_TOKEN_SECRET)
                return res.status(200).json([
                    { accessToken: accessToken },
                    {
                        username:findUser.username,
                        administrator:findUser.administrator
                    }
                ])
            } else {
                return res.status(203).json({ msg: "Wrong username or password" })
            }
        })
    } else {
        console.log('ne postoji');
    }
})

router.post('/deleteaccount', async (req, res) => {
    console.log(req.body)
    let findUser = await signUpTemplate.findOneAndDelete({ username: req.body.username });
    res.send({msg:'succes'})
})

router.post('/savePodcastInDatabase', async (req, res) => {
    console.log(req.body);
    const podcastSave = new savePodcastTemplate({
        name: req.body.name,
        chanelId: req.body.chanelId,
        playListId: req.body.playlistId
    })
    podcastSave.save()
            .then(data => {
                res.json(data)
            })
            .catch(error => {
                res.json(error)
            })
})

router.post('/getSelectedPodcast',async (req, res) => {
    
     let findSelectedPodcast = await savePodcastTemplate.findOne({ chanelId: req.body.idOfSelectedPodcast});
     res.send(findSelectedPodcast)
})


router.post('/checkCookie', (req, res) => {
    console.log(req.body.isCookie)
    jwt.verify(req.body.isCookie, process.env.ACCESS_TOKEN_SECRET,async (err, user) => {
        if (err) {
            return res.status(203).json({ msg: "false" })
        } else {
            console.log(user)
            let findUser = await signUpTemplate.findOne({ username: user });
            console.log(findUser);
            res.status(201).json([
                { msg: "OK" },
                {
                    username:findUser.username,
                    administrator:findUser.administrator,
                    email:findUser.email,
                    fullName:findUser.fullName
                }
            ])
        }
    })
})

router.get('/getAllPodcast',async(req,res)=>{
    const allPodcast = await savePodcastTemplate.find()
    res.send(allPodcast)
})

router.post('/sendcomment',async(req,res)=>{
    
    let findComment = await saveCommentTemplate.findOne({ idOfVideo: req.body.video});
    if(findComment){
        findComment.dataOfcomment.unshift(req.body)
        findComment.save().then(data=>{res.json(data)}).then(data=>{res.send(data)})
    }else{
        const commentSave = new saveCommentTemplate({
            idOfVideo: req.body.video,
            dataOfcomment: req.body
        })
        commentSave.save()
                .then(data => {
                    res.json(data)
                }).then(data=>{
                    res.send(data)
                })
                .catch(error => {
                    res.json(error)
                })
    }
})

router.post('/getAllComents',async(req,res)=>{
    console.log(req.body);
    let findComment = await saveCommentTemplate.findOne({ idOfVideo: req.body.videoId});
    console.log(findComment);
    res.send(findComment)
})

router.post('/deleteComment',async(req,res)=>{
    let findComment = await saveCommentTemplate.findOne({ idOfVideo: req.body.idOfVideo});
    const newComments = findComment.dataOfcomment.filter(elem=>elem.time!=req.body.idOfComment)
    findComment.dataOfcomment = newComments;
    findComment.save();
    res.send(findComment)
})

router.get('/getAllUsersFromDatabase',async(req,res)=>{
    
    let findAllUsers = await signUpTemplate.find();
    console.log(findAllUsers);
    res.send(findAllUsers)
})

router.post('/deleteUsers',async(req,res)=>{
    
    console.log(req.body.idOfUser);

    const deleteUser = await signUpTemplate.findOneAndDelete({_id:req.body.idOfUser})
    let findAllUsers = await signUpTemplate.find();
    res.send(findAllUsers)
})

router.get('/getAllPodcastFromDatabase',async(req,res)=>{
    
    let allPodcast = await savePodcastTemplate.find();
    res.send(allPodcast)
})

router.post('/deletePodcast',async(req,res)=>{
    
    console.log(req.body.idOfPodcast);
    const allPodcast = await savePodcastTemplate.findOneAndDelete({_id:req.body.idOfPodcast});
    const findAllPodcast = await savePodcastTemplate.find();
    res.send(findAllPodcast)
})

router.post('/changeAdministratorValue',async(req,res)=>{
    
    const changeAdministratorValue = await signUpTemplate.findByIdAndUpdate(req.body.user,{administrator:+req.body.value});
    const allUsers = await signUpTemplate.find();
    res.send(allUsers)
})

router.post('/sendmessage',async(req,res)=>{
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'stefanmicunovic1992@gmail.com',
            pass: 'svkqwmyjrtwvnfrn'
        }
    });

    const mailOption = {
        from: req.body.email,
        to: 'stefanmicunovic1992@gmail.com',
        subject: `Message from -- ${req.body.email} -- ${req.body.name}  ${req.body.surname}`,
        text: req.body.message
    }

    transporter.sendMail(mailOption, (error,info) => {
        if(error){
            console.log(error)
            res.send('error')
        }else{
            console.log(info)
            res.send('success')
        }
    })
})

router.post('/saveChanges', async (req, res) => {
    
    
    let findUserByNewUsername = await signUpTemplate.findOne({ username: req.body.username });
    let findUserByNewEmail = await signUpTemplate.findOne({ username: req.body.email });
    
    if(findUserByNewUsername || findUserByNewEmail){

        return res.send('There is already an account with this username or email')

    }else{
        let findUser = await signUpTemplate.findOne({ username: req.body.findByUsername });

        if(req.body.username !== 'no change'){
            findUser.username = req.body.username
            findUser.save()
        }

        if(req.body.email !== 'no change'){
            findUser.email = req.body.email
            findUser.save()
        }

        if(req.body.password !== 'no change'){
            const saltPassword = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, saltPassword)
            findUser.password = securePassword
            findUser.save()
        }
        
    }

})


module.exports = router;