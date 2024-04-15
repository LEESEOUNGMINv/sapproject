// srv/lib/JoinService.js

const { connectToHANA } = require('../server.js');
const cds = require('@sap/cds');

module.exports = async function() {
    const db = await connectToHANA();
    const { MEMBER } = db.entities;
    
    this.on('register', async (req) => {
        const { ID, PWD } = req.data;
        
        // 새로운 회원 생성
        try {
            console.log('새로운 회원 데이터:', { ID, PWD }); // 데이터 로그
            const newUser = await cds.run(INSERT.into(MEMBER).entries({ ID, PWD }));
            console.log('회원 데이터 삽입 결과:', newUser); // 삽입 결과 로그
            return { success: true, message: '회원가입에 성공했습니다.' };
        } catch (error) {
            console.error('회원가입 오류:', error); // 오류 로그
            return { success: false, message: '회원가입에 실패했습니다.' };
        }
    });
};
