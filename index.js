const getConfiguration = require('./configuration');

const {
    createUser,
    attemptLogin,
    resetPasswordToNew
} = require('./cognito');

const main = async () => {
    const config = getConfiguration();
    console.log('Creating user...')

    const result = await createUser(config);

    console.log('Attempting login...')
    const authentication = await attemptLogin(config);

    if (authentication.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        const session = authentication.Session;
        
        console.log('Resetting password...')
        const response = await resetPasswordToNew(config, session);

        console.log(response);
    }
};

main();