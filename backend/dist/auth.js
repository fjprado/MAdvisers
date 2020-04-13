"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var api_config_1 = require("./api-config");
var jwt = require("jsonwebtoken");
exports.handleAuthentication = function (request, response) {
    var user = request.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.login];
        var token = jwt.sign({ sub: dbUser.login, iss: 'madv-api' }, api_config_1.apiConfig.secret);
        response.json({ name: dbUser.name, email: dbUser.login, accessToken: token });
    }
    else {
        response.status(403).json({ message: 'Dados inválidos.' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.login];
    return dbUser !== undefined && dbUser.matches(user);
}
