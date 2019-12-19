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
    const password = hasOverride(overrides, "password", settings.password);
    const user = hasOverride(overrides, "user", settings.user);

    return {
        userPoolId: userPoolId,
        clientId: clientId,
        tempPwd: tempPwd,
        password: password,
        user: user,
        region: settings.region
    };
};

module.exports = getConfiguration;