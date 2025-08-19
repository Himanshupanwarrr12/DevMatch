"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var cookie_parser_1 = require("cookie-parser");
var port = 7777;
var cors_1 = require("cors");
var database_js_1 = require("./config/database.js");
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
(0, database_js_1.default)()
    .then(function () {
    console.log("Database connected");
    app.listen(port, function () {
        console.log("server is running at ".concat(port));
    });
}).catch(function (err) {
    console.error("Database connection failed:", err);
});
