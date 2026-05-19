const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://shailavisrivastava977_db_user:Matra04@cluster0.usvsonz.mongodb.net/lmsdb?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('lmsdb');
    const users = database.collection('users');
    const admin = await users.findOne({ email: "admin@cyvanta.com" });
    console.log("Admin password in DB:", admin ? admin.password : "NOT FOUND");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
