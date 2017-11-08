'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const propertyV1 = require('./routes/v1/property');
const propertyV2 = require('./routes/v2/property');

app.use(bodyParser.json());
app.use('/v1/property', propertyV1);
app.use('/v2/property', propertyV2);

const port = process.env.port || 3000;
app.listen(port);

console.log(`Api is running at: http://localhost: ${port}`);