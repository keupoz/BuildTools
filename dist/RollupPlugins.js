"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uglify_js_1 = require("uglify-js");
/**
 * Built-in Uglify Rollup plugin. Ignores bundles without `compact` output property
 */
function uglify(options) {
    return {
        name: 'uglify',
        renderChunk: function (code, chunk, outputOptions) {
            if (!outputOptions.compact)
                return code;
            var output = uglify_js_1.minify(code, options);
            if (output.error)
                throw output.error;
            return output.code;
        }
    };
}
exports.uglify = uglify;
/**
 * Rollup plugins resolver
 */
var RollupPlugins = /** @class */ (function () {
    function RollupPlugins() {
        this.req = require;
        this.cache = {};
    }
    RollupPlugins.getInstance = function () {
        return this.instance;
    };
    RollupPlugins.prototype.setReq = function (req) {
        this.req = req;
    };
    /**
     * Resolve and return Rollup plugin
     * @param name Plugin name without 'rollup-plugin-'
     * @param actuallyGet Do actually resolve plugin. Useful with `isProduction` constant
     * @param builtIn Use built-in plugins
     */
    RollupPlugins.prototype.get = function (name, actuallyGet, builtIn) {
        if (actuallyGet === void 0) { actuallyGet = true; }
        if (builtIn === void 0) { builtIn = true; }
        if (!actuallyGet)
            return function () { return undefined; };
        if (name == 'uglify' && builtIn)
            return uglify;
        if (!(name in this.cache))
            this.cache[name] = this.req("rollup-plugin-" + name);
        return this.cache[name];
    };
    RollupPlugins.instance = new RollupPlugins();
    return RollupPlugins;
}());
exports.default = RollupPlugins.getInstance();
