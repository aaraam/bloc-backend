const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Start Server
app.listen(process.env.PORT || 7100, () => console.log('Server started on port 7100'));

// Routes
const GovernRoute = require('./routes/governRoute.js');
app.use('/api/bloc', GovernRoute);
