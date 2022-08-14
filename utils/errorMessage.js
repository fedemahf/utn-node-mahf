module.exports = {
  GENERAL: {
    required: "The field {PATH} is required",
    min: "The field {PATH} is too short",
    invalidToken: 'Please set a valid Bearer token in the authorization header'
  },
  USERS: {
    wrongPassword: "The field {PATH} should have at least one letter, one lower case and one upper case",
    loginFailed: "Wrong user or password",
    userCreated: "The user has been created"
  },
  CATEGORIES: {
    alreadyExists: "This category already exists"
  }
}
