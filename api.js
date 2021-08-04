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
        res.end();
    });

  }

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
    res.end();
});



});

app.get('/', (req, resp) => {
  resp.send("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus risus lectus, at tempor dolor gravida ut. Aliquam erat volutpat. Aenean vel magna sed urna molestie maximus. Nunc nec aliquam mi, at tempor est. Nam dictum odio sit amet justo placerat, vitae aliquet est gravida. Nunc ullamcorper neque ligula, et ornare risus venenatis eu. Donec molestie justo nec nisi imperdiet, ac eleifend felis pulvinar. Nam tristique dolor quis posuere mattis. Donec pellentesque, augue sit amet egestas semper, ligula dui placerat elit, rutrum interdum erat leo id mi. Nullam lorem enim, tincidunt a nisi nec, consequat fringilla magna. Integer sed purus cursus, ullamcorper tellus vitae, posuere nibh. Fusce purus ante, egestas molestie justo sed, ullamcorper laoreet lorem. Nam finibus rutrum velit, et aliquet nunc interdum at. Vivamus porta commodo ante id sodales. Suspendisse gravida, lorem id condimentum sollicitudin, quam neque consectetur elit, et porta nunc justo venenatis nunc. Etiam tincidunt nulla vitae scelerisque feugiat. Mauris eu rhoncus sem. Nunc a nibh et quam sodales fermentum nec vel justo. Nunc eleifend eu mi vitae consectetur. Phasellus scelerisque, odio sed commodo consequat, nulla magna condimentum ex, ac convallis mauris tortor a ipsum. Integer iaculis aliquam ligula, quis vehicula neque rutrum ut. Integer suscipit lacus in ornare vehicula. Suspendisse eu dolor enim. In velit odio, sollicitudin id dui eu, tempus bibendum elit. Sed at faucibus tortor. Nulla vehicula justo purus, et bibendum neque consequat eget.Morbi vehicula elit tellus, sed cursus odio lacinia ac. Ut pharetra nisi quam, egestas efficitur mauris commodo vel. Donec sed sem in sem commodo volutpat eget lacinia leo. Integer blandit tempus justo feugiat fermentum. Maecenas aliquam efficitur quam in pretium. Aenean tellus lorem, ultrices ac justo vitae, semper gravida dolor. Curabitur dictum auctor ultrices. Nullam blandit elit ante, sed vestibulum nulla ultricies quis. Nulla nulla arcu, porttitor vel felis eu, tristique scelerisque lorem. Nulla et arcu tempor, vulputate ante ut, hendrerit odio. Curabitur massa dolor, bibendum nec ligula ac, eleifend luctus ligula. Quisque pretium in elit a mattis. Suspendisse non egestas lorem. Vivamus porttitor odio sit amet neque tempor molestie. Nam pellentesque justo placerat egestas convallis. Sed eu elit interdum eros rutrum commodo. Aenean commodo pellentesque nisl, vel viverra elit cursus id. Etiam pretium ipsum sed tortor sodales, quis volutpat mauris luctus. Nullam tincidunt scelerisque nulla, ac condimentum quam auctor a. Nulla eleifend rutrum risus, quis mattis justo. Aenean eros enim, dapibus quis aliquet ac, pellentesque non magna. Donec porta feugiat nunc, vel consectetur velit bibendum sit amet. Mauris nulla est, posuere et sapien non, posuere efficitur est. Etiam sollicitudin, justo sed porttitor posuere, arcu metus malesuada augue, eget egestas tellus nisi nec tortor. In venenatis eros in quam molestie, quis ultrices ligula ultrices. Nulla eget vulputate nisi, vel pellentesque est. Curabitur ut massa aliquet, dapibus ex ut, faucibus enim. Cras ultrices, nunc vel consectetur fermentum, odio nisi posuere nulla, rhoncus aliquet arcu erat ac velit. Cras commodo consequat neque ac cursus. Sed pulvinar leo ac erat fermentum, at maximus risus finibus. Etiam ut aliquam eros. Vivamus faucibus ligula enim, ullamcorper dapibus quam dignissim id. Suspendisse potenti. Etiam tincidunt lectus nibh, sed vestibulum sapien commodo at. Duis vehicula, justo non auctor venenatis, nisi purus fermentum lacus, a euismod nulla arcu id nisl. Mauris fermentum dapibus eros, dapibus euismod mauris rhoncus id. Maecenas pulvinar, ligula eget bibendum scelerisque, lectus nisi facilisis sem, at vestibulum nibh enim non massa. Curabitur ac massa mattis, vehicula nisl vel, lacinia eros. Donec blandit ullamcorper mollis. In sed purus ut ipsum sodales auctor vitae ut lectus. Aenean hendrerit cursus sodales. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam libero felis, eleifend in odio vel, finibus ullamcorper dui. Nulla aliquet odio nec eros laoreet, eget elementum nunc dictum. Nulla mattis a felis sit amet faucibus. Quisque nec condimentum leo, ut facilisis mauris. Vivamus finibus, erat nec consequat gravida, urna metus lobortis erat, at laoreet mauris est maximus tortor. Aenean pharetra tempor sapien at porttitor. Phasellus tristique faucibus dictum. Donec dignissim odio vel vestibulum tincidunt. Mauris et mauris et augue tristique sagittis. Nulla orci leo, consectetur eget mollis sit amet, finibus ac lectus. Morbi id gravida sem, et mattis arcu. Morbi tempor felis porta massa rhoncus pellentesque. Praesent tortor nisi, laoreet quis lacus feugiat, facilisis aliquet augue. Morbi condimentum a magna ut scelerisque. Vestibulum et volutpat ex. Integer elementum mattis mi. Nunc ultricies vitae arcu sit amet semper. Duis iaculis, diam at iaculis suscipit, nisi eros malesuada enim, ac ullamcorper ante elit nec magna. Ut sed scelerisque mauris. Sed sem nulla, blandit eu placerat at, egestas id enim. Sed eu rhoncus quam. Integer egestas sollicitudin ipsum. Aenean vitae mauris efficitur, congue lectus ut, ultrices metus. Sed faucibus iaculis ligula et volutpat.Quisque placerat felis dui, ut mollis dui eleifend id. Proin vestibulum diam risus, quis lobortis felis dictum dapibus. Sed eu neque sodales, gravida dui eget, ultrices ante. Pellentesque dictum lectus velit. Sed ut augue eu enim suscipit placerat. Duis quis tincidunt mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus blandit leo sed augue pellentesque, sit amet venenatis quam ullamcorper. Etiam at accumsan lectus. Fusce nunc libero, ultrices et accumsan non, lobortis id neque. Sed in nibh accumsan purus lacinia posuere in vitae odio. In tristique ac elit ut volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ex nisi. Vestibulum in maximus orci. Maecenas dui ante, gravida in nunc non, laoreet finibus quam. Aliquam feugiat dolor est, sit amet tincidunt sapien faucibus eget. Phasellus sagittis lectus id odio posuere ornare. Mauris diam leo, faucibus non sapien non, vulputate aliquam turpis. Maecenas facilisis sagittis libero. Aenean malesuada ipsum diam, vel facilisis nibh viverra vitae. Sed elementum convallis risus, rutrum tempus justo vestibulum ac. Nullam in ipsum eu nisi accumsan ullamcorper ut sed diam. Nunc nec libero eget libero ornare lobortis quis in turpis. Praesent at odio eu justo tristique gravida. Sed eget consequat velit. Ut viverra volutpat finibus. Etiam eget orci interdum, bibendum ex aliquet, lacinia purus. Donec tempus elit mi, in eleifend massa porta interdum. Donec vitae velit lorem. Nullam commodo nulla sit amet convallis ornare. Cras id mi posuere lorem mattis gravida vitae non felis. Aliquam blandit aliquet lacus, a vestibulum mauris convallis quis. Praesent varius ultricies lorem, a porttitor velit. Aliquam ut est eu elit finibus dignissim. Nam tincidunt laoreet iaculis. Vivamus libero nulla, malesuada et ultrices eu, fermentum a ex. Maecenas luctus urna viverra, semper massa convallis, sodales purus. Aliquam nec pretium risus. Etiam at felis augue. Etiam suscipit nibh vel erat volutpat congue. Aliquam tempus orci nisl, vel placerat nisi consectetur ac. Ut interdum, nibh eu blandit gravida, leo nibh interdum odio, non malesuada libero libero a turpis. Integer ultrices, nunc quis lacinia dapibus, augue dolor finibus ligula, et auctor tellus odio sed dui. Etiam massa velit, iaculis in pellentesque nec, laoreet quis nibh. Donec dapibus arcu justo, a euismod magna suscipit et. Phasellus tempor tellus nec turpis hendrerit porttitor. Curabitur consequat in nunc ac sodales. Vivamus quis purus in tortor egestas auctor. Sed eget molestie felis, vitae tincidunt erat. Nullam efficitur porttitor orci vitae interdum. Etiam eget tempor nisi. Maecenas semper, turpis at hendrerit facilisis, mauris turpis sagittis odio, sodales condimentum nisl nulla at tortor. In at neque eu leo sodales efficitur in ut augue. Pellentesque lacus lorem, pretium eget dapibus nec, accumsan a felis. Maecenas vel purus erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas et elit nec magna blandit blandit. Cras cursus elit ac erat scelerisque, et molestie tortor euismod. Duis sollicitudin nec metus pharetra vulputate. Morbi sodales bibendum laoreet. Integer nunc erat, tincidunt vitae elementum non, sagittis sed nisi. Maecenas id volutpat purus. Sed aliquet lacinia metus, eget vestibulum orci tincidunt eu. Suspendisse lobortis est pretium odio volutpat, in vestibulum augue tincidunt. Nunc id ex turpis. Nulla facilisi. Phasellus eu purus ut diam tincidunt porttitor. Etiam semper, mi sed tristique aliquet, lectus massa gravida risus, quis dapibus ex erat eu diam. Vestibulum mi mi, condimentum et lorem non, vestibulum pretium leo. Ut et augue a velit suscipit euismod a vitae turpis. Proin bibendum pulvinar ipsum id viverra. Quisque eget est sed lacus venenatis mattis. Nullam ante nunc, congue in ipsum sed, volutpat venenatis dui. Donec quis commodo enim. Pellentesque lobortis massa sit amet nulla ornare, id ullamcorper lorem egestas. Nam tincidunt a orci vitae consequat. Maecenas molestie ipsum nec odio aliquam, in suscipit lectus sollicitudin.Sed in dolor risus. Vestibulum nec erat vel eros semper tincidunt ut eu enim. Etiam id porttitor nunc, vitae vehicula odio. Donec eget suscipit ipsum, ac porttitor nulla. Aenean dictum neque non lorem porttitor porttitor. Sed accumsan convallis varius. Nam vel magna lectus. Pellentesque ex turpis, faucibus eu sodales sit amet, suscipit ut elit. Cras quam ante, mattis sed ante vitae, rhoncus porttitor nisi. Vestibulum sollicitudin ipsum lacus, eu mollis eros blandit id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque erat est, lobortis vitae auctor quis, mollis at mi. Maecenas et volutpat arcu, vitae accumsan sem. Morbi diam turpis, dapibus vitae viverra at, tristique sed nisl. Praesent dictum, arcu id blandit mattis, libero ipsum lobortis ante, nec convallis nibh diam nec lectus. Nulla sapien mi, vulputate sit amet pellentesque et, rutrum sit amet erat. In lorem nisi, convallis vel laoreet et, ornare non dui. Vestibulum fringilla sollicitudin enim, in accumsan tellus. Curabitur porttitor efficitur pellentesque. Pellentesque mauris dolor, sodales sed luctus sed, vulputate vel nisi. Pellentesque eu leo ac quam efficitur placerat. Proin placerat fringilla dolor. Cras eleifend in felis at pretium. Quisque sit amet ipsum aliquet, imperdiet ligula eget, facilisis augue. Etiam quis metus rhoncus, interdum ante nec, maximus nibh. Integer sed felis in elit venenatis efficitur vitae nec ligula. Sed maximus leo at interdum auctor. Nulla eget dui laoreet, vulputate nibh in, iaculis justo. Fusce sed auctor sapien. Suspendisse rutrum, elit ac tempor luctus, arcu metus fermentum ex, non vulputate dui tortor non metus. Pellentesque eu odio gravida, malesuada dui id, feugiat tortor. Mauris ipsum nibh, bibendum a nunc euismod, pulvinar dignissim felis. Quisque pretium ornare urna, eget vestibulum enim dictum vitae. Donec orci metus, efficitur eleifend orci non, pellentesque cursus neque. Suspendisse vehicula lacinia blandit. Vivamus ornare malesuada faucibus. In odio tortor, posuere nec pellentesque eget, luctus id est. Fusce sed massa in nunc sollicitudin dapibus ut non enim. Donec in urna massa. Mauris at nisi aliquet, hendrerit risus nec, blandit ligula. Sed eu nunc quam.Fusce dapibus mollis nibh ac cursus. Aenean quis tellus eros. Curabitur blandit, dui porttitor aliquam aliquet, sapien enim pharetra felis, et facilisis purus neque sed enim. Suspendisse quis sem elit. Cras condimentum vehicula dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed at lorem eget dolor.");
});
app.listen(port, () => console.log(`Ready`))
