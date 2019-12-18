const settings = require('./settings.json');

const getConfiguration = () => {
    const userPoolId = settings.userPoolId;
    const clientId = settings.clientId;
    const tempPwd = settings.tempPwd;
    const newPwd = settings.newPwd;
    const user = settings.user;

    return {
        userPoolId: userPoolId,
        clientId: clientId,
        tempPwd: tempPwd,
        newPwd: newPwd,
        user: user,
        region: settings.region
    };
};

module.exports = getConfiguration;