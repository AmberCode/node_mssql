'use strict';

module.exports = (function () {
    const sql = require('mssql');
    const dateFormat = require('dateformat');


    const sqlConfig = {
        server: 'ANDRIUSPC\\SQLEXPRESS01',
        database: 'Rental',
        user: 'sa',
        password: 'sa',
        port: 2716
    };

    var getProperties = async function() {
        const pool = await sql.connect(sqlConfig);

        try {
            const request = new sql.Request();
            const result = await request.query('select * from Property');
            return result.recordset;     
        } catch (e) {
            console.log(e);
        } finally{
            if (pool.connected){
                sql.close();     
            }
        }
    }

    var createProperty = async function(propertyName){
        const pool = await sql.connect(sqlConfig);

        try {
            const request = new sql.Request();

            const querySql = "Insert Into Property " +
            "(Created,PropertyName) " +
                "Values ('"+ dateFormat(new Date(), 'yyyy-mm-dd HH:mm:ss')  +"','" + propertyName + "'); " + 
                "Select SCOPE_IDENTITY() AS ID";

            console.log(querySql);
     
            const result = await request.query(querySql);
                    
            return result.recordset[0].ID;

        } catch (e) {
            console.log(e);
        } finally{
            if (pool.connected){
                sql.close();     
            }
        }

        return -1;
    }

    return {
        get: getProperties,
        post: createProperty
    }

})();
