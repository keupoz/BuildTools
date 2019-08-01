import { minify, MinifyOptions } from 'uglify-js';
import { Plugin } from 'rollup';

/**
 * Built-in Uglify Rollup plugin. Ignores bundles without `compact` output property
 */
export function uglify (options: MinifyOptions): Plugin {
  return {
    name: 'uglify',

    renderChunk (code, chunk, outputOptions) {
      if (!outputOptions.compact) return code;

      let output = minify(code, options);
      if (output.error) throw output.error;
      return output.code;
    }
  };
}

/**
 * Rollup plugins resolver
 */
class RollupPlugins {
  private static instance = new RollupPlugins();

  public static getInstance (): RollupPlugins {
    return this.instance;
  }

  private req: NodeRequireFunction = require;

  public setReq(req: NodeRequireFunction): void {
    this.req = req;
  }

  private cache: Record<string, any> = {};

  /**
   * Resolve and return Rollup plugin
   * @param name Plugin name without 'rollup-plugin-'
   * @param actuallyGet Do actually resolve plugin. Useful with `isProduction` constant
   * @param builtIn Use built-in plugins
   */
  public get (name: string, actuallyGet = true, builtIn = true): any {
    if (!actuallyGet) return () => undefined;

    if (name == 'uglify' && builtIn) return uglify;

    if (!(name in this.cache)) this.cache[name] = this.req(`rollup-plugin-${name}`);
    return this.cache[name];
  }
}

export default RollupPlugins.getInstance();
