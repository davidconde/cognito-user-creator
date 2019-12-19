const {
    attemptLogin
} = require('./../cognito');

const login = async (config) => {

    console.log(config)

    const authentication = await attemptLogin(config);

    return authentication;
}

module.exports = login;