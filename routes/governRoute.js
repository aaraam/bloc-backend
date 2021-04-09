const { Router } = require('express');
const router = Router();

const governController = require('../controllers/governControl');

router.post('/create/account', async (req, res) => {
    try {
        const response = await governController.createAccount(req.body); 
        return res.status(200).json({message: 'Account created successfully', data: response});
    } catch (e) {
        return res.status(500).json({message: 'Error Occurred', data: {e}});
    }
});

module.exports = router;
