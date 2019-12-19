
const setVerboseLevel = (verbose) => {
    if (verbose) {
        process.env.cognito_tool_verbose = true;
    } else {
        process.env.cognito_tool_verbose = false;
    }
}

const log = (message, ...args) => {
    const isVerboseOn = process.env.cognito_tool_verbose;

    if (isVerboseOn) 
        console.log(message, ...args);
}

module.exports = {log, setVerboseLevel};