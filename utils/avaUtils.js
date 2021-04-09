const Web3 = require('web3');
const governContract = require('../contracts/Governance.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');
tofAddress = process.env.AVA_TOF_ADDRESS;

const createAccount = async () => {
    try {
        const provider = new HDWalletProvider(
            process.env.ADMIN_PRIVATE_KEY,
            process.env.NODE_ENDPOINT
        );
        const web3 = new Web3(provider);
        const account = await web3.eth.accounts.create();
        return account;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const fundAccounts = async ({buyer, seller}) => {
    try {
        const provider = new HDWalletProvider(
            process.env.AVA_TOF_PRIVATE_KEY,
            process.env.AVA_ENDPOINT
        );
        const web3 = new Web3(provider);
        const fundBuyer = await web3.eth.sendTransaction({ to: buyer.address, from: tofAddress, value: web3.utils.toWei('5', 'ether') });
        const fundSeller = await web3.eth.sendTransaction({ to: seller.address, from: tofAddress, value: web3.utils.toWei('.5', 'ether') });
        return { fundBuyer, fundSeller };
    } catch (error) {
        console.log(error);
        return error;
    }
};

const deployContract = async (params) => {
    try {
        const { name, price, buyer, privateKey } = params;
        const privateProvider = new HDWalletProvider(
            privateKey,
            process.env.AVA_ENDPOINT
        );
        const web3 = new Web3(privateProvider);
        const contract = new web3.eth.Contract(
            RwsctContract.abi,
        );
        let receipt;
        await contract.deploy({
            data: RwsctContract.bytecode,
            arguments: [
                name,
                tofAddress,
                price
            ]
            })
            .send({
                from: buyer,
                gas: 3000000,
                gasPrice: '470000000000'
            })
            .on('receipt', async (result) => {
                receipt = result;
            });
        return receipt;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const mintToken = async (params) => {
    try {
        const { buyer, privateKey, contractAddress } = params;
        const privateProvider = new HDWalletProvider(
            privateKey,
            process.env.AVA_ENDPOINT
        );
        const web3 = new Web3(privateProvider);
        const contract = new web3.eth.Contract(
            RwsctContract.abi,
            contractAddress
        );
        let receipt;
        await contract.methods.mintToken(buyer, Date.now())
            .send({ from: buyer })
            .on('receipt', async (result) => {
                receipt = result;
            });
        return receipt;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const transferToken = async (params) => {
    try {
        const { buyer, privateKey, contractAddress, seller } = params;
        const privateProvider = new HDWalletProvider(
            privateKey,
            process.env.AVA_ENDPOINT
        );
        const web3 = new Web3(privateProvider);
        const contract = new web3.eth.Contract(
            RwsctContract.abi,
            contractAddress
        );
        const tokenID = await contract.methods.tokenOf(buyer).call();
        let receipt;
        await contract.methods.transferToken(seller, tokenID)
            .send({ from: buyer })
            .on('receipt', async (result) => {
                receipt = result;
            });
        return receipt;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const disburseToken = async (params) => {
    try {
        const { seller, privateKey, contractAddress } = params;
        const privateProvider = new HDWalletProvider(
            privateKey,
            process.env.AVA_ENDPOINT
        );
        const web3 = new Web3(privateProvider);
        const contract = new web3.eth.Contract(
            RwsctContract.abi,
            contractAddress
        );
        const tokenID = await contract.methods.tokenOf(seller).call();
        let receipt;
        await contract.methods.receiveTokenDisbursePay(tokenID)
            .send({ from: seller })
            .on('receipt', async (result) => {
                receipt = result;
            });
        return receipt;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const deployRwscgContract = async (params) => {
    try {
        const { name, price, releaseDate} = params;
        const privateProvider = new HDWalletProvider(
            process.env.AVA_TOF_PRIVATE_KEY,
            process.env.AVA_ENDPOINT
        );
        const web3 = new Web3(privateProvider);
        const contract = new web3.eth.Contract(
            RwscgContract.abi,
        );
        let receipt;
        await contract.deploy({
            data: RwscgContract.bytecode,
            arguments: [
                name,
                price,
                releaseDate
            ]
            })
            .send({
                from: tofAddress,
                gas: 3000000,
                gasPrice: '470000000000'
            })
            .on('receipt', async (result) => {
                receipt = result;
            });
        return receipt;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const releaseToken = async (params) => {
    try {
        const { contractAddress } = params;
        const privateProvider = new HDWalletProvider(
            process.env.AVA_TOF_PRIVATE_KEY,
            process.env.AVA_ENDPOINT
        );
        const web3 = new Web3(privateProvider);
        const contract = new web3.eth.Contract(
            RwscgContract.abi,
            contractAddress
        );
        let receipt;
        await contract.methods.releaseToken()
            .send({ from: tofAddress })
            .on('receipt', async (result) => {
                receipt = result;
            });
        return receipt;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createAccount,
}
