const cds = require('@sap/cds');
const express = require('express');
const path = require('path');
const app = express();

// CORS 허용 설정
app.use('/resources', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'webapp')));

// HANA 연결 설정
const hanaConfig = {
    host: 'c3103e2f-7d7d-4699-ba8b-c32323d26b01.hana.trial-us10.hanacloud.ondemand.com',
    port: '443',
    user: 'DBADMIN',
    password: 'F0d9qwjig!'
};

// HANA 연결 모듈을 export
const connectToHANA = async () => {
    return cds.connect.to('hana', hanaConfig);
};

// Define CDS models and service
const defineService = async (app) => {
    try {
        await cds.serve('all').from('srv').in(app);
    } catch (error) {
        console.error('Error:', error);
    }
};

// 서버 시작 함수 정의
const startServer = async () => {
    try {
        // HANA 연결 설정
        await connectToHANA();
        
        // Define CDS models and service
        await defineService(app);
        
        // Start server
        const port = process.env.PORT || 3007;
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

// 서버 시작
startServer();

// connectToHANA 함수를 내보냄
module.exports = { connectToHANA };
