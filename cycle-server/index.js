const express = require('express');
const cors = require('cors');
const app = express(); 
const port = process.env.PORT || 4000 ;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vycem.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("cycle").collection("tools");
//   // perform actions on the collection object
//   client.close();
// });

async function run(){
   try{
    await  client.connect();

    const toolsCollection = client.db("cycle").collection("tools");
    const orderCollection = client.db("cycle").collection("order");

    //get all tools
    app.get('/tools',async(req,res)=>{
        const query ={};
        const cursor = toolsCollection.find(query);
        const tools = await cursor.toArray();
        res.send(tools);
    });
//single tool details 
app.get('/tools/:id',async(req,res)=>{
    const id = req.params.id;
    const query ={_id:ObjectId(id)};
    const tool = await  toolsCollection.findOne(query);
    console.log(tool);
    res.send(tool);  
    });
//user order



    console.log("cycle db connected");
   }finally{

   }
}
run().catch(console.dir);





app.get('/',(req,res)=>{
    res.send("server is running");
});

//port listening

app.listen(port,()=>{
    console.log('listening to port',port);
});

