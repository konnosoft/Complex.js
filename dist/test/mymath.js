"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyMath_1 = require("../src/MyMath");
console.log(MyMath_1.default.lim(function (n) { return Math.pow((1 + 1 / n), n); }, true));
