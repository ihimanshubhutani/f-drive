const config = require('../config/default.json');

/**
 * Returns valid and invalid scope from scope array
 * @param   {array} scopeArray 
 * @returns {object}
 */
const checkScopes = scopeArray => {
    const result = { invalid: [], valid: [] }
    const availableScope = config.SCOPE;
    console.log(result);
    for (let i = 0; i < scopeArray.length; i++) {
        if (!availableScope[scopeArray[i]]) {
            result.invalid.push(scopeArray[i]);
            continue
        }
        result.valid.push(scopeArray[i])
    }
    console.log(result);
    return result
}

module.exports = { checkScopes };
