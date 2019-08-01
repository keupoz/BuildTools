"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RollupPlugins_1 = require("./RollupPlugins");
exports.RollupPlugins = RollupPlugins_1.default;
var Assets_1 = require("./bundlers/Assets");
exports.Assets = Assets_1.default;
var Rollup_1 = require("./bundlers/Rollup");
exports.Rollup = Rollup_1.default;
var Sass_1 = require("./bundlers/Sass");
exports.Sass = Sass_1.default;
var Pug_1 = require("./bundlers/Pug");
exports.Pug = Pug_1.default;
var GulpHelper_1 = require("./GulpHelper");
exports.GulpHelper = GulpHelper_1.default;
var RollupPlugins_2 = require("./RollupPlugins");
exports.uglify = RollupPlugins_2.uglify;
var series;
function setSeriesFunction(fn) {
    series = fn;
}
exports.setSeriesFunction = setSeriesFunction;
function task(name, fn) {
    var cb = function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                fn()
                    .then(function () { return resolve(); })
                    .catch(function (err) { return reject(err); });
            }, 200);
        });
    };
    cb.displayName = name;
    return series(cb);
}
exports.task = task;
