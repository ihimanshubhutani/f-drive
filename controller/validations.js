const db = require('../models');

/**
* Checks for validity for Password 
* @param  {string}   password 
* @return {boolean} 
*/
let isPasswordValid = password => {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    /**
    * passwordRegex() returns boolean value
    * based on the passed-in password
    * format is correct or not.
    */
    console.log('checking password');
    return passwordRegex.test(password);
}

/**
* Checks for validity for Email. 
* @param {string} email
* @return {boolean} 
*/
let isEmailValid = email => {
    let emailRegex = /^([a-z\d\.-]+)@([a-z]{2,10})(\.[a-z]+)?(\.[a-z]{2,3})?$/;

    /** 
     * emailRegex() returns boolean value
     *  based on checking email format.
     **/
    console.log('checking email');
    return emailRegex.test(email);
}

module.exports = { isPasswordValid, isEmailValid };
