// srv/lib/MemberService.js

const { connectToHANA } = require('../server.js');
const cds = require('@sap/cds');

module.exports = async function() {
    const db = await connectToHANA();
    const { MEMBER } = db.entities;
    
    this.on('login', async (req) => {
        const { ID, PWD } = req.data;
        
        const users = await cds.run(SELECT.from(MEMBER).where({ ID }));
        
        if (users.length === 0) {
            return { success: false, message: '사용자를 찾을 수 없습니다.' };
        }

        // 비밀번호를 비교하여 인증을 수행합니다.
        if (users[0].PWD === PWD) {
            return { success: true, message: '로그인에 성공했습니다.'};
        } else {
            return { success: false, message: '비밀번호가 올바르지 않습니다.' };
        }
    });
};
