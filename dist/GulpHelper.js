"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GulpHelper = /** @class */ (function () {
    function GulpHelper() {
    }
    GulpHelper.prototype.setCloseCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    GulpHelper.prototype.close = function () {
        this.watchers.forEach(function (watcher) { return watcher.close(); });
        this.callback();
    };
    GulpHelper.prototype.add = function (bundler, callback) {
        var watcher = bundler.getWatcher();
        watcher.on('all', callback);
        this.watchers.push(watcher);
        return this;
    };
    return GulpHelper;
}());
exports.default = GulpHelper;
