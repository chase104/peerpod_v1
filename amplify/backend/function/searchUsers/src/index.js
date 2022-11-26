
const AWS = require('aws-sdk') 
const cognito = new AWS.CognitoIdentityServiceProvider({region: 'us-east-1'})

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    console.log(`EVENT: ${JSON.stringify(event.body)}`);
    console.log(`EVENT: ${JSON.stringify(JSON.parse(event.body).name)}`);
    console.log(event);


  let stringData = await new Promise((resolve, reject) => {
    var params = {
      UserPoolId: "us-east-1_kscJjnZUJ", /* required */
      Limit: '10',
      Username: event.sub,
     Filter: `given_name ^= "${JSON.parse(event.body).name}"`
    };
    cognito.listUsers(params, function(err,data){
      if (err) {
        reject(err)
      } else {
        console.log(`EVENT: ${JSON.stringify(data)}`);

        resolve(JSON.stringify(data))
      }
    })
  })
  return {
    statusCode: 200,
 headers: {
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Headers": "*"
 }, 
    // body: JSON.stringify({work: response}),
    body: stringData,
};

};
