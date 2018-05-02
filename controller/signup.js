require('dotenv').config()
var AWS = require('aws-sdk');
var { Cognito } = require('amazon-cognito-identity-js') 
var CognitoSDK = require('amazon-cognito-identity-js-node');
AWS.CognitoIdentityServiceProvider.AuthenticationDetails = CognitoSDK.AuthenticationDetails;
AWS.CognitoIdentityServiceProvider.CognitoUserPool = CognitoSDK.CognitoUserPool;
AWS.CognitoIdentityServiceProvider.CognitoUser = CognitoSDK.CognitoUser;
AWS.CognitoIdentityServiceProvider.CognitoUserAttribute = CognitoSDK.CognitoUserAttribute

function signup(event, context) {
    let { email, password } = event.body;

    let { CLIENT_ID, POOL_ID } = process.env;

    const poolData = {
        UserPoolId: 'us-east-2_zxTW1Lh8f',
        ClientId: '44m58sdc3bsfqdaqphhlgj9qar'
    };

    const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    let attributeList = [];

    let name = {
        Name: 'given_name',
        Value: 'mughees'
    };
    let profile = {
        Name: 'profile',
        Value: 'customer'
    };
    let attributeName = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute('name', 'John Smith');
    let attributeProfile = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute('given_name', 'John Smith');

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
        context.succeed({
            statusCode: 1,
            statusDesc: cognitoUser.getUsername()
        })
    });
}


exports.signup = signup;
