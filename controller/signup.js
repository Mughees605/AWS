require('dotenv').config()
global.fetch = require('node-fetch')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

function signup(event, context) {
    let { email, password } = event.body;

    let { CLIENT_ID, POOL_ID } = process.env;

    let PoolData = {
        ClientId: CLIENT_ID,
        UserPoolId: POOL_ID
    }

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(PoolData);
    
    let attributeList = [];
    
    let name = {
        Name: 'given_name',
        Value: 'mughees'
    };
    let profile = {
        Name: 'profile',
        Value: 'customer'
    };
    let attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(name);
    let attributeProfile = new AmazonCognitoIdentity.CognitoUserAttribute(profile);

    attributeList.push(attributeName);
    attributeList.push(attributeProfile);

    userPool.signUp(email, password, attributeList, null, function (err, result) {
        if (err) {
           context.succeed({
               statusCode: 0,
               statusDesc: err
           })
           return
        }
        cognitoUser = result.user;
        context.succeed({
            statusCode: 1,
            statusDesc: cognitoUser.getUsername()
        })
    });
}


exports.signup = signup;