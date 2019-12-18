const AWS = require('aws-sdk');

const createIdentityServiceProvider = (config) => {
    return new AWS.CognitoIdentityServiceProvider({region: config.region});
}

const createUser = async (config) => {
    const params = {
        UserPoolId: config.userPoolId, 
        Username: config.user,
        TemporaryPassword: config.tempPwd,
        DesiredDeliveryMediums: ['EMAIL'],
        UserAttributes: [
            {Name: 'email', Value: config.user}
        ]
    };

    const isp = createIdentityServiceProvider(config);
    const res = await isp.adminCreateUser(params).promise();
    return res;
}

const attemptLogin = async (config) => {
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: config.clientId,
        AuthParameters: {
            "USERNAME": config.user,
            "PASSWORD": config.tempPwd
        }
    };

    const isp = createIdentityServiceProvider(config);
    const res = await isp.initiateAuth(params).promise();
    return res;
}

const resetPasswordToNew = async (config, session) => {
    const params = {
        ClientId: config.clientId,
        UserPoolId: config.userPoolId, 
        ChallengeName: 'NEW_PASSWORD_REQUIRED',
        ChallengeResponses: {
            "NEW_PASSWORD": config.newPwd,
            "USERNAME": config.user
        },
        Session: session
    };

    const isp = createIdentityServiceProvider(config);
    const res = await isp.adminRespondToAuthChallenge(params).promise();
    return res;
}

module.exports = {
    createUser,
    attemptLogin,
    resetPasswordToNew
};