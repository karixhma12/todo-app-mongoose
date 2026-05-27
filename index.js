const express = require("express");
const mongoose = require("mongoose");
const {UserModel, TodoModel} = require("./db.js");

mongoose.connect("mongodb+srv://karishma7022_db_user:welcome%20123@cluster0.ntuwokz.mongodb.net/todo-app");

const app = express();

app.use(express.json());

app.post("/signup",async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email : email,
        password : password,
        name : name
    });

    res.json({message : "You are signed up!"});
})

app.post("/signin",(req,res)=>{

})

app.post("/todo",(req,res)=>{

})

app.get("/todos",(req,res)=>{

})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})