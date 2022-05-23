const express = require('express');
const cors = require('cors');
const app = express(); 
const port = process.env.PORT || 4000 ;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vycem.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
function verifyJwt(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({message:"Unauthorized access!!"})
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRECT,function(err,decoded){
        if(err){
            res.status(403).send({message:"Forbidden !!"});
        }
        req.decoded = decoded;
        next();
    });
}

async function run(){
   try{
    await  client.connect();

    const toolsCollection = client.db("cycle").collection("tools");
    const orderCollection = client.db("cycle").collection("order");
    const userCollection = client.db("cycle").collection("users");

    //admin verify
    const  verifyAdmin = async( req,res,next)=>{
        const requester = req.decoded.email;
        const requesterAccount = await userCollection.findOne({email:requester});
        if(requesterAccount.role ==='admin'){
            next();
            }
            else{
                res.status(403).send({message:'forbidden'});
            }
    }
    



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
    //console.log(tool);
    res.send(tool);  
    });

//update qty 
app.put('/tools/:id',async(req,res)=>{
    const id = req.params.id;
    const data = req.body;
    const filter ={_id:ObjectId(id)};
    const updatedoc = {
        $set:{
            available: data.availableProduct,
        }
    }
    const tool = await  toolsCollection.updateOne(filter,updatedoc);
    // console.log(tool);
    res.send(tool);  
    });

//user order save in database 
app.post('/order',async(req,res)=>{
    const order = req.body;
    const result = await orderCollection.insertOne(order);
    res.send( result);
   });
// get all order data 
app.get('/order', async(req,res)=>{
    const user = await orderCollection.find().toArray();
    res.send(user);
});


// get all user 
app.get('/user',verifyJwt, async(req,res)=>{
    const user = await userCollection.find().toArray();
    res.send(user);
});
//SAVE USER
app.put('/user/:email',async(req,res)=>{
    const email = req.params.email;
    const user = req.body;
    const filter ={email:email};
    const options = {upsert:true};
    const updatedoc = {
        $set:user,
    };
    //console.log(user);
    const result = await userCollection.updateOne(filter,updatedoc,options);
    const token = jwt.sign({email:email},process.env.ACCESS_TOKEN_SECRECT,{expiresIn:'30d'})
    res.send({result,token});
 });
 //get my order
 app.get('/order/:email',verifyJwt,async(req,res)=>{
     const decodedEmail = req.decoded.email
    const email = req.params.email;
    if(decodedEmail===email){
        const query = { email:email.email};
        const result = await orderCollection.find(query).toArray();
        console.log(result);
        return res.send(result);
    }
    else{
 return res.status(403).send({message:'Forbidden Access!!!'});
    }
   
 });

 //make admin
 app.put('/user/admin/:email',verifyJwt,async(req,res)=>{
    const email = req.params.email;  
    const requester = req.decoded.email;
    const reqAccount = await userCollection.findOne({email:requester});
    if(reqAccount.role=="admin"){
        const filter ={email:email};
        const updatedoc = {
            $set:{role:'admin'},
        };
        const result = await userCollection.updateOne(filter,updatedoc);
        res.send({result});
    }
    else{
        return res.status(403).send({message:'Forbidden Access!!!'});
    }
        
    });


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

