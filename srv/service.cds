//service.cds
using { projectA as my } from '../db/schema';

@path: '/service/projectASvcs'
@requires: 'authenticated-user'
service projectAService @(impl: './lib/MemberService.js') {
    @readonly entity MEMBER as projection on my.MEMBER;

    action login(ID: String, PWD: String) returns String;
}

@path: '/service/joinService'
@requires: 'authenticated-user'
service joinService @(impl:'./lib/JoinService.js'){
    entity MEMBER as projection on my.MEMBER;
    
    action register(ID: String, PWD: String) returns String;
}


// @path: '/service/projectASvcs'
// @requires: 'authenticated-user'
// service projectAService @(impl: './lib/MemberService.js') {
//     @readonly entity Member as projection on my.Member;
//     // entity Company as projection on my.Company;
//     // entity Department as projection on my.Department;
//     // entity Salary as projection on my.Salary;

//     // JavaScript 파일을 모듈로 가져오기
//     action login(ID: String, PWD: String) returns String;
// }

// service joinService @(impl:'./lib/JoinService.js'){
//     entity Member as projection on my.Member;
    
//     action register(ID: String, PWD: String) returns String;
// }