// const generatePolicy = (principleId,effect,resource)=>{
//      var authResponse = {};

//      authResponse.principleId = principleId
//      if(effect && resource)
//      {
//         let policyDocument ={
//             Version: "2012-10-17",
//             Statement:[
//                {
//                   Effect : effect,
//                   Resource : resource,
//                   Action : "execute-api:Invoke" 
//                }
//             ]
//         };
//         authResponse.policyDocument = policyDocument
//      }
//     authResponse.context = {
//         foo : "bar"
//     }
//     console.log(JSON.stringify(authResponse));
//      return authResponse
// }

// exports.handler=(event,context,callback)=>{
//     // lambda authorizer code

//     var token = event.authorizationToken; // "allow" or "deny"
//     switch(token){
//         case "allow":
//               callback(null,generatePolicy("user","Allow",event.method.Arn));break;
//         case "deny":
//               callback(null,generatePolicy("user","Deny",event.method.Arn ));break;
//         default:callback("Error:Invalid token")
//     }
// }

// const {cognitoJwtVerifier} = require("aws-jwt-verify")

// const jwtverifier = cognitoJwtVerifier.create({
//     userPoolId : "ap-south-1_xGxr0Nq0o",
//     tokeUse : "id",
//     clientId :"1flkvdkjt4nutlhjg15hh4dvd0"
// })

// const generatePolicy = (principalId, effect, resource) => {
//     const policyDocument = {
//       Version: "2012-10-17",
//       Statement: [
//         {
//           Effect: effect,
//           Action: "execute-api:Invoke",
//           Resource: resource,
//         },
//       ],
//     };
  
//     return {
//       principalId: principalId,
//       policyDocument: policyDocument,
//       context: {
//         foo: "bar",
//       },
//     };
//   };
  
//   exports.handler = async(event, context, callback) => {
//     const token = event.authorizationToken;
//     console.log(token);
    
//     try {

//       const payload = await jwtverifier.verify(token)
//       console.log(JSON.stringify(payload));
//       // return generatePolicy("user", "Allow", event.methodArn);
//       callback(null, generatePolicy("user", "Allow", event.methodArn))

//     }
//     catch(error){
//       callback("Error: Invalid token");
//     }
    // switch (token) {
    //   case "allow":
    //     callback(null, generatePolicy("user", "Allow", event.methodArn));
    //     break;
    //   case "deny":
    //     callback(null, generatePolicy("user", "Deny", event.methodArn));
    //     break;
    //   default:
    //     callback("Error: Invalid token");
    // }




const { CognitoJwtVerifier } = require("aws-jwt-verify")
const COGNITO_USERPOOL_ID = process.env.COGNITO_USERPOOL_ID
const COGNITO_WEB_CLIENT_ID =process.env.COGNITO_WEB_CLIENT_ID

const jwtVerifier = CognitoJwtVerifier.create({

  userPoolId: COGNITO_USERPOOL_ID,
  tokenUse: "id",
  clientId: COGNITO_WEB_CLIENT_ID
})

const generatePolicy = (principalId, effect, resource) => {
    if (effect && resource) {
      const policyDocument = {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: effect,
            Resource: resource,
            Action: "execute-api:Invoke",
          },
        ],
      };
  
      return {
        principalId,
        policyDocument,
        context: {
          foo: "bar",
        },
      };
    }
  };
  exports.handler = async (event, context,callback) => {
    // const token = event.authorizationToken;
  
    // switch (token) {
    //   case "allow":
    //     return generatePolicy("user", "Allow", event.methodArn);
    //   case "deny":
    //     return generatePolicy("user", "Deny", event.methodArn);
    //   default:
    //     throw new Error("Error: Invalid token");
    // }

    // VALIDATE THE TOKEN.......


    const token = event.authorizationToken;
    console.log(token);
    
    try {

      const payload = await jwtVerifier.verify(token)
      console.log(JSON.stringify(payload));
      // return generatePolicy("user", "Allow", event.methodArn);
      callback(null, generatePolicy("user", "Allow", event.methodArn))

    }
    catch(error){
      callback("Error: Invalid token");
    }

  
  };
  