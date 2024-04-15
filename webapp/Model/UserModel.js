// app/Model/UserModel.js

sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(JSONModel) {
    "use strict";

    var UserModel = {
        createLoginModel: function() {
            var oModel = new JSONModel({
                username: "",
                password: ""
            });
            return oModel;
        }
    };

    return UserModel;
});