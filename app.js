let express = require('express');
let sql = require('mssql');
let app = express();
let bodyParser = require('body-parser');
let propertyModule = require('./Modules/propertyModule');

app.use(bodyParser.json());

const port = process.env.port || 3000;

app.get('/property', async (req, res) => {
  try{
    const users = await propertyModule.get();
    res.json(users);
  } catch (e){
    console.log(e);
    res.json({message: 'System error'})
  }
});

app.post('/property', async (req, res) =>{
  if (!req.body.propertyName){
    return res.status(401).send({message: "Property name is required"});
  }

  try{
    const result = await propertyModule.post(req.body.propertyName);

    if (result > 0){
      res.json({Id: result});
    } else{
      res.status(500).json({message: 'Failed to create'})
    }    
  } catch (e){
    console.log(e);
    res.json({message: 'System error'})
  }
});

app.listen(port);

console.log('Api is running at: http://localhost:' + port);