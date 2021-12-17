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
        const database = client.db('ToDoListDB');
        const ListCollection = database.collection('ListCollection');

        //adding list
        app.post('/addinglist', async (req, res) => {
            const list = req.body;
            const result = await ListCollection.insertOne(list);
            res.json(result)
        })
        //geting all list
        app.get('/alltodo', async (req, res) => {
            const cursor = ListCollection.find({});
            const list = await cursor.toArray();
            res.send(list)
        })
        //posting complete list list
        app.put('/completetask/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const option = {upsert: true};
            const updatedoc = {
                $set:{
                    isDone: 'done'
                }
            }
            const list = await ListCollection.updateOne(query, updatedoc, option)
            res.json(list)
        })
        
        //delete list
        app.delete('/deleteone/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await ListCollection.deleteOne(query);
            res.send(result)
        })
        app.delete('/deletealldone', async (req, res) => {
            const id = req.params.id;
            const query = {isDone: 'done'};
            const result = await ListCollection.deleteMany(query);
            res.send(result)
        })

        //find update list
        app.get('/findupdatelist', async ())
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