const express = require('express');
const mongodb = require('mongodb');
require('dotenv').config();

const mongoClient = mongodb.MongoClient;
const objectID = mongodb.ObjectID;

const dbUrl = proces.env.DB_URL || "mongodb://127.0.0.1:27017";
const port = process.env.PORT || 4000

// demo_db
// yqTyCICf9ehBkygY
const app = express()

//middleware
app.use(express.json());
//this has access for req and resp express.json is a pakage for body parser

//get all users
app.get('/', async (req, res) => {
    try{
        let clientInfo = await mongoClient.connect(dbUrl);
        let db = clientInfo.db("StudentMentor_db");
        let data = await db.collection("student").find().toArray();
        res.status(200).json(data);
        console.log(data)
        clientInfo.close();
    }
    catch(error){
        console.log(error);
    }
})

//create-user
app.post("/create-user", async (req,res) => {
    try{
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("StudentMentor_db");
        await db.collection("student").insertOne(req.body);
        res.status(200).json({ message: "user created"});
        client.close();
    }
    catch (error){
        console.log(error);
    }
})

//update 
app.put("/update-user/:id", async (req,res) => {
    try{
        let client = await mongoClient.connect(dbUrl);
        console.log(req.params)
        let db = client.db("StudentMentor_db");
        await db
        .collection("student")
        .findOneAndUpdate({ _id: objectID(req.params.id) },{ $set: req.body });
        res.status(200).json({ message: "user updated"});
        client.close();
    }
    catch (error){
        console.log(error);
    }
})

app.listen(process.env.PORT || 3000, () => console.log("App is running"))



// connecting with Db
// get db info
// frind collection inside --> createImageBitmap,read,update,delete
// close connection