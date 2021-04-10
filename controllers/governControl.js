const avaUtils = require('../utils/avaUtils.js');

const createAccount = async () => {
    try {

        const result = await avaUtils.createAccount();
        console.log({result});

        return result;
        
    } catch(e) {
        throw e;
    }
}

module.exports = {
    createAccount,
}
