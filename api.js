const express = require('express');
var AWS = require("aws-sdk");
const crypto = require("crypto");





const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 80;

app.get('/api/getdescription', (req, res) => {
  var id = req.query.id
  if(id == undefined)
    res.write("{'error':'id field is undefined'}");
  else
  {
    AWS.config.update({
          accessKeyId: process.env.accessKeyId,
          secretAccessKey: process.env.secretAccessKey,
          region: 'eu-south-1',
        });
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
          TableName: "TestDynamo"
    };
    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.send({
                success: true,
                movies: Items
            });
        }
    });
    res.write(val);

  }
  res.end();
});
app.post('/sd', (req, res) => {

  console.log("called");
  console.log(req.body);
    AWS.config.update({
          accessKeyId: 'AKIAZQP24JQWBEEBCM7U',
          secretAccessKey: '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',
          region: 'eu-south-1',
        });
    const docClient = new AWS.DynamoDB.DocumentClient();

    let id = req.body.id;
    let description = decodeURIComponent(req.body.description)
    console.log(description)
    if(id == undefined)
    {
      console.log("ID UNDEFINED");
      let id = crypto.randomBytes(16).toString("hex");

      var params =
      {
        TableName: "TestDynamo",
        Item: {
          "id":id,
          "description":description

        }
      };
    }
    else
    {
      console.log("ID: "+id);

      var params =
      {
        TableName: "TestDynamo",
        Item: {
          "id":id,
          "description":description
        }
      };
    }



  docClient.put(params, function(err, data) {
    if (err) {
        res.write("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        res.write("Added item:", JSON.stringify(data, null, 2));
    }
});


  res.end();
});

app.get('/', (req, resp) => {
  resp.send("OK");
});
app.listen(port, () => console.log(`Ready`))
