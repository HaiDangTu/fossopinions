const express = require('express');
var AWS = require("aws-sdk");
const crypto = require("crypto");





const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 80;

app.get('/getdescription', (req, res) => {
  var name = req.query.name
  if(name == undefined)
    res.write("{'error':'name field is undefined'}");
  else
  {
    AWS.config.update({
          accessKeyId: process.env.accessKeyId,
          secretAccessKey: process.env.secretAccessKey,
          region: 'eu-south-1',
        });
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
          TableName: "TestDynamo",
          Key:{
              "name": name
          }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            res.write(JSON.stringify(data, null, 2));

        }
    });

  }
  res.end();
});
app.post('/setdescription', (req, res) => {

  if(req.body.key != "ejgiwiwwngnj332nfsjfn2542fj")
  {
    res.send("API KEY INCORRECT !");
    return;
  }

  console.log("called");
  console.log(process.env.accessKeyId)
  console.log(process.env.secretAccessKey)
  console.log(req.body);
    AWS.config.update({
          accessKeyId: process.env.accessKeyId,
          secretAccessKey: process.env.secretAccessKey,
          region: 'eu-south-1',
        });
    const docClient = new AWS.DynamoDB.DocumentClient();

    let name = decodeURIComponent(req.body.name)
    let description = decodeURIComponent(req.body.description)
    console.log(description)
    if(name == undefined)
    {
      //console.log("ID UNDEFINED");
      //let id = crypto.randomBytes(16).toString("hex");

      var params =
      {
        TableName: "TestDynamo",
        Item: {
          "name":name,
          "description":description

        }
      };
    }
    else
    {

      var params =
      {
        TableName: "TestDynamo",
        Item: {
          "name":name,
          "description":description
        }
      };
    }



  docClient.put(params, function(err, data) {
    if (err) {
      console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));

        res.write("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2))
        res.write("Added item:", JSON.stringify(data, null, 2));
    }
});


  res.end();
});

app.get('/', (req, resp) => {
  resp.send("OK");
});
app.listen(port, () => console.log(`Ready`))
