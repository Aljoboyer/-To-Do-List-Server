const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors()); 
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.obwta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect(); 
    }
    finally{
        
    }
}

run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('To Do Server is connected');
})

app.listen(port, (req, res) => {
    console.log('Flower Shop Port is', port)
})