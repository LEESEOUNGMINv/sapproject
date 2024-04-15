// app/Controller/Login.controller.js

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox", // MessageBox 모듈 추가
	"sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/ad/so/Model/UserModel" // UserModel 모듈 추가
], function(Controller, MessageBox, MessageToast, History, UIComponent, JSONModel, Dialog, Button, UserModel) {
    "use strict";

    return Controller.extend("sap.ad.so.Controller.Login", {
        onInit: function() {
            // UserModel에서 생성한 모델을 가져와서 뷰에 설정
            var oModel = UserModel.createLoginModel();
            this.getView().setModel(oModel, "loginModel");
        },
        onLogin: function() {
            var oView = this.getView();
            var oModel = oView.getModel("loginModel"); // loginModel 이름으로 모델 가져오기
            var sUsername = oModel.getProperty("/username");
            var sPassword = oModel.getProperty("/password");

            jQuery.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/service/projectASvcs/login", // 서버의 로그인 엔드포인트
                data: JSON.stringify({
                    ID: sUsername,
                    PWD: sPassword
                }),
                success: function(data) {
                    // 서버로부터의 응답 처리
                    if (data.value.success) {
                        MessageBox.success(data.value.message);
                    } else {
                        // 서버에서 전달된 메시지를 표시
                        MessageBox.error(data.value.message);
                    }
                },
                error: function() {
                    // 서버에 연결할 수 없는 경우
                    MessageBox.error("서버에 연결할 수 없습니다.");
                }
            });
        },

        onSignUp: function() {
            if (!this.oDialog) {
                // 다이얼로그가 없으면 생성
                // 다이얼로그가 없으면 생성
                this.oDialogModel = new JSONModel({
                    username: "",
                    password: ""
                });

                this.oDialog = new Dialog({
                    title: "Join", 
                    content: [
                        // 회원가입 폼
                        new sap.m.Input({ placeholder: "Username", value: "{/username}" }),
                        new sap.m.Input({ placeholder: "Password", value: "{/password}", type: "Password" })
                        // 필요한 다른 입력 필드 추가
                    ],
                    beginButton: new Button({
                        text: "Join",
                        press: function() {
                            // 회원가입 버튼을 눌렀을 때의 로직
                            var oModel = this.oDialog.getModel();
                            var sUsername = oModel.getProperty("/username");
                            var sPassword = oModel.getProperty("/password");
                            
                            // 회원가입 정보를 서버로 전송
                            jQuery.ajax({
                                type: "POST",
                                contentType: "application/json",
                                //url: "/odata/v4/join/register", // 회원가입 엔드포인트
                                url: "/service/joinService/register", // 회원가입 엔드포인트
                                data: JSON.stringify({
                                    ID: sUsername,
                                    PWD: sPassword
                                }),
                                success: function(data) {
                                    // 서버로부터의 응답 처리
                                    if (data.value.success) {
                                        MessageBox.success(data.value.message);
                                    } else {
                                        // 서버에서 전달된 메시지를 표시
                                        MessageBox.error(data.value.message);
                                    }
                                },
                                error: function() {
                                    // 서버에 연결할 수 없는 경우
                                    MessageBox.error("서버에 연결할 수 없습니다.");
                                }
                            });

                            // 다이얼로그 닫기
                            this.oDialog.close();
                        }.bind(this)
                    }),
                    endButton: new Button({
                        text: "Close",
                        press: function() {
                            // 취소 버튼을 눌렀을 때의 로직
                            this.oDialog.close();
                        }.bind(this)
                    }),
                    afterClose: function() {
                        this.oDialog.destroy();
                        this.oDialog = null;
                    }.bind(this)
                });
                // 모달 다이얼로그에 모델 설정
                this.oDialog.setModel(this.oDialogModel);
            }
            // 다이얼로그 열기
            this.oDialog.open();
        }
    });
});