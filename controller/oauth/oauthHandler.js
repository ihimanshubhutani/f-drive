const config = require('../../config/default.json');
const path = require("path");
const dotenv = require("dotenv").config({ path: path.join(__dirname, '../../config/.env') });

/**
 * Returns valid and invalid scope from scope array
 * @param   {array} scopeArray 
 * @returns {object}
 */
const checkScopes = scopeArray => {
    const result = { invalid: [], valid: [] }
    const availableScope = config.SCOPE;
    for (let i = 0; i < scopeArray.length; i++) {
        if (!availableScope[scopeArray[i]]) {
            result.invalid.push(scopeArray[i]);
            continue
        }
        result.valid.push(scopeArray[i])
    }
    return result
}

const encryptAuthCode = object => {
    const text = JSON.stringify(object);
    var cipher = crypto.createCipher('aes-256-cbc', process.env.AUTHCODE_ENCRYPTION_KEY)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

const decryptAuthCode = object => {
    const text = JSON.stringify(object);
    var decipher = crypto.createDecipher('aes-256-cbc', process.env.AUTHCODE_ENCRYPTION_KEY)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}



module.exports = { checkScopes, encryptAuthCode, decryptAuthCode };
