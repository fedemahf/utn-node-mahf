const PATTERN_VALID_PASSWORD = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
const PATTERN_VALID_PHONE = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
const PATTERN_VALID_EMAIL = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

module.exports = {
  passwordValidate: input => PATTERN_VALID_PASSWORD.test(input),
  phoneValidate: input => PATTERN_VALID_PHONE.test(input.replace(/\D/g, "")),
  emailValidate: input => PATTERN_VALID_EMAIL.test(input)
}
