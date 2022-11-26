

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 const { Client } = require('pg')
 
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event.body)}`);
    console.log(process.env.CLIENTUSER)
      const client = new Client({
    user: process.env.CLIENTUSER,
    host: process.env.CLIENTHOST,
    database: 'postgres',
    password: process.env.CLIENTPASS,
    port: 5432
});
      let response = await client.connect();
      console.log(response, "connnected")
      client.query('INSERT INTO Persons VALUES (2)', (err, res) => {
  client.end()
})
    return {
        statusCode: 200,
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        // body: JSON.stringify({work: response}),
        body: response,
    };

      //your code here



  


};
