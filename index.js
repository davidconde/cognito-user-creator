const AWS = require('aws-sdk');
const settings = require('./settings.json');

const userPoolId = settings.userPoolId;
const clientId = settings.clientId;
const tempPwd = settings.tempPwd;
const newPwd = settings.newPwd;
const user = settings.user;

const createIdentityServiceProvider = () => {
    return new AWS.CognitoIdentityServiceProvider({region: settings.region});
}

const createUser = async (userPoolId, email) => {
    const params = {
        UserPoolId: userPoolId, 
        Username: email,
        TemporaryPassword: tempPwd,
        DesiredDeliveryMediums: ['EMAIL'],
        UserAttributes: [
            {Name: 'email', Value: email}
        ]
    };

    const isp = createIdentityServiceProvider();
    const res = await isp.adminCreateUser(params).promise();
    return res;
}

const attemptLogin = async (clientId, userPoolId, user, password) => {
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: {
            "USERNAME": user,
            "PASSWORD": password
        }
    };

    const isp = createIdentityServiceProvider();
    const res = await isp.initiateAuth(params).promise();
    return res;
}

const resetPasswordToNew = async (userPoolId, clientId, user, newPassword, session) => {
    const params = {
        ClientId: clientId,
        UserPoolId: userPoolId, 
        ChallengeName: 'NEW_PASSWORD_REQUIRED',
        ChallengeResponses: {
            "NEW_PASSWORD": newPassword,
            "USERNAME": user
        },
        Session: session
    };

    const isp = createIdentityServiceProvider();
    const res = await isp.adminRespondToAuthChallenge(params).promise();
    return res;
}

const main = async () => {
    const result = await createUser(userPoolId, user);
    const authentication = await attemptLogin(clientId, userPoolId, user, tempPwd);

    if (authentication.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        const session = authentication.Session;
        const response = await resetPasswordToNew(userPoolId, clientId, user, newPwd, session);

        console.log(response);
    }
};

main();