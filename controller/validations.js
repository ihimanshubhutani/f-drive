const db = require('../models');

/**
* Checks for validity for Password 
* @param  {string}   password 
* @return {boolean} 
*/
const isPasswordValid = password => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    /**
    * isPasswordValid returns boolean value
    * based on the passed-in password
    * format is correct or not.
    */
    return passwordRegex.test(password);
}

/**
* Checks for validity for Email. 
* @param {string} email
* @return {boolean} 
*/
const isEmailValid = email => {
    const emailRegex = /^([a-z\d\.-]+)@([a-z]{2,10})(\.[a-z]+)?(\.[a-z]{2,3})?$/;

    /** 
     *  isEmailValid returns boolean value
     *  based on checking email format.
     **/
    return emailRegex.test(email);
}

const isUrlValid = url => {
    const urlRegex = /^http(s)?:\/\/[a-z:.0-9]+/;

    /** 
     *  isUrlValid returns boolean value
     *  based on checking url format.
     **/
    return urlRegex.test(url);
}


module.exports = { isPasswordValid, isEmailValid, isUrlValid };
