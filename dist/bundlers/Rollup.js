"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rollup_1 = require("rollup");
var AbstractBundler_1 = require("./AbstractBundler");
var Rollup = /** @class */ (function (_super) {
    __extends(Rollup, _super);
    function Rollup(config, watch, autobundle) {
        var _this = _super.call(this) || this;
        var output = config.output;
        delete config.output;
        _this.config = config;
        _this.output = output;
        if (watch) {
            _this.initWatcher(config.input, autobundle, /(\u0000)/);
        }
        return _this;
    }
    Rollup.prototype.bundle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, config, cache, output, bundle, _i, output_1, out_entry;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, config = _a.config, cache = _a.cache, output = _a.output;
                        return [4 /*yield*/, rollup_1.rollup(__assign({}, config, { cache: cache }))];
                    case 1:
                        bundle = _b.sent();
                        if (!Array.isArray(output)) return [3 /*break*/, 6];
                        _i = 0, output_1 = output;
                        _b.label = 2;
                    case 2:
                        if (!(_i < output_1.length)) return [3 /*break*/, 5];
                        out_entry = output_1[_i];
                        return [4 /*yield*/, bundle.write(out_entry)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, bundle.write(output)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        this.cache = bundle.cache;
                        if (this.watcher)
                            this.watcher.update(bundle.watchFiles);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Rollup;
}(AbstractBundler_1.default));
exports.default = Rollup;