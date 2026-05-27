const express = require("express");
const mongoose = require("mongoose");
const {UserModel, TodoModel} = require("./db.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ilovekiara";
const {auth} = require("./auth.js");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb+srv://karishma7022_db_user:welcome%20123@cluster0.ntuwokz.mongodb.net/todo-app");

const app = express();

app.use(express.json());

app.post("/signup",async function(req,res){
    try{
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        const hashedPassword = await bcrypt.hash(password,10);

        await UserModel.create({
            email : email,
            password : hashedPassword,
            name : name
        });

        res.json({message : "You are signed up!"});
    }
    catch(err){
        res.status(500).json({message : "Error while signing up!"});
    }
    
})

app.post("/signin",async function (req,res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email : email
    })

    const passwordMatch = await bcrypt.compare(password,user.password);

    if(user && passwordMatch){
        const token = jwt.sign({
            id : user._id.toString()
        },JWT_SECRET);
        return res.status(200).send({message : "You are signed in!", token : token});
    }
    else{
        return res.status(403).send({message : "Incorrect credentials!"});
    }

})

app.post("/todo",auth,async function(req,res){
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId : userId,
        title : title,
        done : done
    })

    res.status(200).json({message : `Todo successfully added : ${title}`});
})

app.get("/todos",auth,async function(req,res){
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId : userId
    });
    res.json({
        todos
    })
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})