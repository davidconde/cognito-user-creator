# Cognito user creator

Creating users in Cognito is not overly straight forward using the AWS UI. This script does it quicker and can potentially be expended for bulk user creation.

## Instructions for use

Get the source code
Run `npm install`
Create a file `settings.json` and populate with the following structure:

```
{
    "userPoolId": "Your Cognito User Pool ID",
    "clientId": "Client Id",
    "tempPwd": "Temporary password to use",
    "newPwd": "User final password",
    "user": "User email",
    "region": "AWS Region"
}
```

### Some remarks

 - Make sure you have different password for the temporary one and the final one
 - Your client for the cognito pool has to have SRP enabled (*Important!*)
 