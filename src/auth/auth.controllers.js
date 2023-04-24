const { findUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')

const checkUsersCredentials = async (email, password) => {

}



module.exports = {
    checkUsersCredentials,
    createRecoveryToken
}