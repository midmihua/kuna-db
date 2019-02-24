function checkUserPassword(username, password) {
    return username === process.env.BASIC_USER && password === process.env.BASIC_PASS;
};

module.exports = {
    'checkUserPassword': checkUserPassword
};