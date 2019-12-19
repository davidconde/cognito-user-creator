const {
    attemptLogin
} = require('./../cognito');

const login = async (config) => {

    console.log('Attemptig login')

    const authentication = await attemptLogin(config.region, config.clientId, config.user, config.password);

    console.log(authentication)

    return authentication;
}

module.exports = login;