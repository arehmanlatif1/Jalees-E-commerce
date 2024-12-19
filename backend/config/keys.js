module.exports = {
    mongoURI: process.env.MONGO_URI || "your-mongodb-uri",
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    paymentGatewayKey: process.env.PAYMENT_GATEWAY_KEY || "your-payment-gateway-key"
};
