"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(login, name, password) {
        this.login = login;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.login === this.login &&
            another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    'fernandoprado': new User('fernandoprado', 'Fernando Prado', 'fernando123'),
    'mtunucci': new User('mtunucci', 'Matheus Tunucci', 'tunucci123')
};
