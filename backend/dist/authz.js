"use strict";
exports.__esModule = true;
var api_config_1 = require("./api-config");
var jwt = require("jsonwebtoken");
exports.handleAuthorization = function (request, response, next) {
    var token = extractToken(request);
    if (!token) {
        response.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
        response.status(401).json({ message: 'Você precisa se autenticar.' });
    }
    else {
        jwt.verify(token, api_config_1.apiConfig.secret, function (error, decoded) {
            if (decoded) {
                next();
            }
            else {
                response.status(403).json({ message: 'Não autorizado.' });
            }
        });
    }
};
function extractToken(request) {
    var token = undefined;
    if (request.headers && request.headers.authorization) {
        var parts = request.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
