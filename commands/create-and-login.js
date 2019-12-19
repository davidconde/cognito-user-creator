const {
    createUser,
    attemptLogin,
    resetPasswordToNew
} = require('./../cognito');

const createAndLoginUser = async (config) => {
    const result = await createUser(config);

    console.log('Attempting login...')
    const authentication = await attemptLogin(config.region, config.clientId, config.user, config.tempPwd);

    if (authentication.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        const session = authentication.Session;
        
        console.log('Resetting password...')
        const response = await resetPasswordToNew(config, session);

        console.log(response);
    }
}

module.exports = createAndLoginUser;