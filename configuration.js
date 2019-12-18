const settings = require('./settings.json');

const hasOverride = (overrides, property, defaultVal) => {
    if (overrides && overrides[property])
        return overrides[property];

    return defaultVal;
}

const getConfiguration = (overrides) => {
    const userPoolId = hasOverride(overrides, "userPoolId", settings.userPoolId);
    const clientId = hasOverride(overrides, "clientId", settings.clientId);
    const tempPwd = hasOverride(overrides, "tempPwd", settings.tempPwd);
    const newPwd = hasOverride(overrides, "newPwd", settings.newPwd);
    const user = hasOverride(overrides, "user", settings.user);

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