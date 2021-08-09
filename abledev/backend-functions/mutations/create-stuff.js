"use strict";
exports.__esModule = true;
function createStuff(_a) {
    var request = _a.request;
    return { allUppercasedName: request.body.name.toUpperCase() };
}
exports["default"] = createStuff;
