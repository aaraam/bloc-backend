const avaUtils = require('../utils/avaUtils.js');

const createAccount = () => {
    try {

        const result = avaUtils.createAccount();
        console.log({result});

        return result;
        
    } catch(e) {
        throw e;
    }
}

module.exports = {
    createAccount,
}
