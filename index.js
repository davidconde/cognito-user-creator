const getConfiguration = require('./configuration');
const optionDefinitions = require('./commands-config');
const { setVerboseLevel, log } = require('./logger');

const createAndLoginUser = require('./commands/create-and-login');
const login = require('./commands/login')

const commandLineArgs = require('command-line-args')

const commandMap = [
    { key: '', command: login },
    { key: 'create', command: createAndLoginUser },
    { key: 'login', command: login }
];

const main = async () => {    
    const options = commandLineArgs(optionDefinitions)
    
    const verbose = options.verbose || true;
    const command = options.command || '';
    
    const config = getConfiguration(options);

    setVerboseLevel(false);

    const cmd = commandMap.filter(c => c.key === command);
    
    return cmd[0].command.call(null, config);


    
};

main();