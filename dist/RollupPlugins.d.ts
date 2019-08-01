/// <reference types="node" />
import { MinifyOptions } from 'uglify-js';
import { Plugin } from 'rollup';
/**
 * Built-in Uglify Rollup plugin. Ignores bundles without `compact` output property
 */
export declare function uglify(options: MinifyOptions): Plugin;
/**
 * Rollup plugins resolver
 */
declare class RollupPlugins {
    private static instance;
    static getInstance(): RollupPlugins;
    private req;
    setReq(req: NodeRequireFunction): void;
    private cache;
    /**
     * Resolve and return Rollup plugin
     * @param name Plugin name without 'rollup-plugin-'
     * @param actuallyGet Do actually resolve plugin. Useful with `isProduction` constant
     * @param builtIn Use built-in plugins
     */
    get(name: string, actuallyGet?: boolean, builtIn?: boolean): any;
}
declare const _default: RollupPlugins;
export default _default;
