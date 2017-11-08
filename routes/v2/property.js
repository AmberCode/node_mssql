const propertyModule = require('../../modules/propertyModule');
const express = require('express');

const route = express.Router();

route.get('', async (req, res) => {
    try{
        res.status(200).json( { message: 'Property V2'} );
      } catch (e){
        console.log(e);
        res.status(500).json({message: 'System error'})
      }
});

module.exports = route;