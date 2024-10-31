    const express = require("express")
    const app = express()
    const mongoose = require("mongoose")
    const port = 3000;
    const cors = require("cors")

    app.use(express.json())
    app.use(cors())

    mongoose.connect("mongodb://localhost:27017/login")

    const userCredentialSchema = new mongoose.Schema({
        userName : String,
        password : String
    })

    const UserCredential = mongoose.model("UserCredential",userCredentialSchema)



    app.get("/", (req,res) =>{
        res.send("Hello") 
    })

    app.get("/add-user",(req,res) =>{
        res.send("Express")
    })

    app.post("/register" , async (req,res) =>{
        const {userName,password} = req.body;
        const userRegister = new UserCredential({userName,password})

        try{
            await userRegister.save()
            res.status(200).send("Data saved succesfully");
        }
        catch(error){
            res.status(500).send("Failed to save data");
            console.error(error)
        }
    })

    app.post("/login", async (req,res) =>{
        const {userName,password} = req.body
        try{
        const user = await UserCredential.findOne({userName})

        if(user && user.password === password){
            res.status(200).send("Login Succesful")
        }
        else{
            res.status(401).send("Login failed")
        }

    }
        catch(error){
        res.status(500).send("Something went wrong")
        console.log("Error!")
        }
    })

    /*
    async function addUser(userName,password){
        const newUserCredential = new UserCredential({userName,password})
        try{
            await newUserCredential.save();
            console.log("Succesful")
        }
        catch(error){
            console.log("error")
        }
    }
        */



    app.listen(port,()=>{
        console.log("The server is running on port " + port)
    })

