const getConfiguration = require('./../configuration')

jest.mock('./../settings.json', ()=>({
    "userPoolId": "eu-west-1_lol",
    "clientId": "123456",
    "tempPwd": "ThisIsNotSecure",
    "newPwd": "ThisIsNotSecureEither",
    "user": "dcm@davidcondemarin.com",
    "region": "eu-west-1"
}), { virtual: true });

describe('Tests for configuration loading', () => {
    it('Should load default configs from settings file', () => {
        const config = getConfiguration();
        expect(config.userPoolId).toBe('eu-west-1_lol');
    })

    it('Should load override settings file from config', () => {
        const override = {
            "userPoolId": "eu-west-1_override",
            "region": "eu-west-1"
        };

        const config = getConfiguration(override);
        expect(config.userPoolId).toBe('eu-west-1_override');
    })
})