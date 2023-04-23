const { MongoClient } = require("mongodb");

// The uri string must be the connection string for the database (obtained on Atlas).
const uri = "mongodb+srv://w0708515:KvvngAcid253@jbdb.wr4nvvi.mongodb.net/?retryWrites=true&w=majority";

// --- This is the standard stuff to get it to work on the browser
const express = require('express');
const app = express();
const port = 3000;
app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes will go here

// Default route:
app.get('/', function(req, res) {
  const myquery = req.query;
  var outstring = 'Starting... ';
  res.send(outstring);
});

app.delete('/delete', function(req, res) {
  const searchKey = "{ ticketID: '" + req.body.ticketID + "' }";
      console.log("Looking for: " + searchKey);
      
      async function run() {
        try {
          
          const tickets = db.collection('cmps415mongodb');
    
          const query = { ticketID: '5589' };
      
          const ticket = await tickets.deleteOne(query);
          console.log(ticket);
          res.send('Deleted this: ' + JSON.stringify(ticket));  //Use stringify to print a json
      
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      }
      run().catch(console.dir);
      });


// Route to access database:
app.get('/api/mongo/:item', function(req, res) {
const client = new MongoClient(uri);
const searchKey = "{ partID: '" + req.params.item + "' }";
console.log("Looking for: " + searchKey);

async function run() {
  try {
    const database = client.db('jbdb');
    const parts = database.collection('cmps415mongodb');

    // Hardwired Query for a part that has partID '12345'
    // const query = { partID: '12345' };
    // But we will use the parameter provided with the route
    const query = { partID: req.params.item };

    const part = await parts.findOne(query);
    console.log(part);
    res.send('Found this: ' + JSON.stringify(part));  //Use stringify to print a json

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
});
