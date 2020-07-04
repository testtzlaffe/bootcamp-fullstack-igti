const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://dbAdmin:zFAqUQ5lIH1oHb1p@cluster0.bazmo.mongodb.net/bootcamp?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const collection = client.db("bootcamp").collection("accounts");
  const documents = await collection.find().toArray();
  console.log(documents);
  client.close();
});
