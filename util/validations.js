/**
* Checks for validity for Password
* @param  {string}   password
* @return {boolean}
*/
const isPasswordValid = password => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
* Checks for validity for Email.
* @param {string} email
* @return {boolean}
*/
const isEmailValid = email => {
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^([a-z\d\.-]+)@([a-z]{2,10})(\.[a-z]+)?(\.[a-z]{2,3})?$/;
  return emailRegex.test(email);
};

const isUrlValid = url => {
  // eslint-disable-next-line no-useless-escape
  const urlRegex = /^http(s)?:\/\/[a-z:.0-9\/]+/;
  return urlRegex.test(url);
};

export { isPasswordValid, isEmailValid, isUrlValid };
