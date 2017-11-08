const propertyModule = require('../../modules/propertyModule');
const express = require('express');

const route = express.Router();

route.get('', async (req, res) => {
    try{
        const users = await propertyModule.get();
        res.status(200).json(users);
      } catch (e){
        console.log(e);
        res.status(500).json({message: 'System error'})
      }
});

route.post('', async (req, res) => {
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

module.exports = route;