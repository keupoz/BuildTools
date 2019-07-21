"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Watcher_1 = require("../Watcher");
var AbstractBundler = /** @class */ (function () {
    function AbstractBundler() {
    }
    AbstractBundler.prototype.initWatcher = function (input, autobundle, filter) {
        var _this = this;
        this.watcher = new Watcher_1.default(input, {
            filter: filter,
            ignoreInitial: !autobundle
        });
        if (autobundle) {
            this.getWatcher().on('all', function (ev, path) { _this.bundle(path); });
        }
    };
    AbstractBundler.prototype.getWatcher = function () {
        return this.watcher.getWatcher();
    };
    return AbstractBundler;
}());
exports.default = AbstractBundler;
