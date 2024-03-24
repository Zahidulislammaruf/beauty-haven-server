const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d527hvq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
   // await client.connect();
    
    //User Collection 
    const usersCollection = client.db("Taslim-Beauty-Haven").collection("users")
    app.post('/users',async (req,res)=>{
        const user = req.body;
        const result = await usersCollection.insertOne(user)
        res.send(result)
    })
    app.get('/users',async (req,res)=>{
        const result = await usersCollection.find().toArray()
        res.send(result)
    })
    
    //Service Collection 
    const serviceCollection = client.db("Taslim-Beauty-Haven").collection("Service")
    app.post('/service',async (req,res)=>{
        const user = req.body;
        const result = await serviceCollection.insertOne(user)
        res.send(result)
    })
    app.get('/service',async (req,res)=>{
        const result = await serviceCollection.find().toArray()
        res.send(result)
    })
    app.get('/service/:id',async (req,res)=>{
      const id = req.params.id
      const query = { _id : new ObjectId(id)}
      const result = await serviceCollection.findOne(query)
      res.send(result)
  })
    app.delete('/service/:id',async (req,res)=>{
      const id = req.params.id
      const query = { _id : new ObjectId(id)}
      const result = await serviceCollection.deleteOne(query)
      res.send(result)
  })
  //Booking Collection 
  const messageCollection = client.db("Taslim-Beauty-Haven").collection("Message")
  app.post('/message',async (req,res)=>{
      const book = req.body;
      const result = await messageCollection.insertOne(book)
      res.send(result)
  })
  app.get('/message',async (req,res)=>{
      const result = await messageCollection.find().toArray()
      res.send(result)
  })
    


    //Booking Collection 
    const bookingCollection = client.db("Taslim-Beauty-Haven").collection("Booking")
    app.post('/booking',async (req,res)=>{
        const book = req.body;
        const result = await bookingCollection.insertOne(book)
        res.send(result)
    })
    app.get('/booking',async (req,res)=>{
        const result = await bookingCollection.find().toArray()
        res.send(result)
    })
    app.get('/booking/:id',async (req,res)=>{
        const id = req.params.id
        const query = { _id : new ObjectId(id)}
        const result = await bookingCollection.findOne(query)
        res.send(result)
    })
    app.patch('/booking/:id',async (req,res)=>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const updatedDoc = {
          $set: {
            pending: 'no'
          }
        }
        const result = await bookingCollection.updateOne(query, updatedDoc)
        res.send(result)
        
      })

    
     



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Taslim Beauty Haven is Open Now')
})

app.listen(port, ()=>{
    console.log('Taslim Beauty Haven is Open Now')
})