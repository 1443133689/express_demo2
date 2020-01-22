const bcript = require('bcryptjs');

module.exports = async function(password) {
    const salt = await bcript.genSalt(10);
    const res = await bcript.hash(password, salt);
    return res;
};