const { MongoClient, ServerApiVersion } = require('mongodb');
const { logEvents } = require('../middleware/logger')

const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        useNewUrlParser: true,// extra
        useUnifiedTopology: true// extra
    }
});

async function connection() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("auction").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } 
    catch(err){
        //to show error
        console.log("An error occurred\n",err);
        logEvents(`${err.name} ::> ${err.message}\t`, 'errLog.log')
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
//connection().catch(console.dir);

module.exports = connection