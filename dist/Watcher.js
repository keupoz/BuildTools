"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar_1 = require("chokidar");
var Watcher = /** @class */ (function () {
    function Watcher(paths, options) {
        this.oldPaths = [];
        var filter = options.filter, ignoreInitial = options.ignoreInitial;
        this.watcher = chokidar_1.watch(paths, { ignoreInitial: ignoreInitial });
        this.filter = filter;
    }
    Watcher.prototype.getWatcher = function () {
        return this.watcher;
    };
    Watcher.prototype.update = function (watchPaths) {
        var _this = this;
        var oldPaths = this.oldPaths;
        var newPaths = this.filter ? watchPaths.filter(function (path) { return !_this.filter.test(path); }) : watchPaths.slice(), toWatch = newPaths.filter(function (path) { return !_this.oldPaths.includes(path); }), toUnwatch = oldPaths.filter(function (path) { return !watchPaths.includes(path); });
        this.watcher.unwatch(toUnwatch);
        this.watcher.add(toWatch);
        this.oldPaths = watchPaths;
    };
    return Watcher;
}());
exports.default = Watcher;
