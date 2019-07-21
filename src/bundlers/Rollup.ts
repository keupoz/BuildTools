import { rollup, RollupOptions, OutputOptions, RollupCache } from 'rollup';

import AbstractBundler from './AbstractBundler';

export type EOutputOptions = OutputOptions | OutputOptions[];

export type ERollupOptions = Omit<RollupOptions, 'output'> & {
  output: EOutputOptions;
};

export default class Rollup extends AbstractBundler {
  private config: RollupOptions;
  private output: EOutputOptions;

  private cache: RollupCache;

  constructor (config: ERollupOptions, watch: boolean, autobundle?: boolean) {
    super();

    let { output } = config;
    delete config.output;

    this.config = config;
    this.output = output;

    if (watch) {
      this.initWatcher(<string> config.input, autobundle, /(\u0000)/);
    }
  }

  public async bundle (): Promise<void> {
    const { config, cache, output } = this;

    let bundle = await rollup({ ...config, cache });

    if (Array.isArray(output))
      for (let out_entry of output)
        await bundle.write(out_entry);
    else await bundle.write(output);

    this.cache = bundle.cache;

    if (this.watcher) this.watcher.update(bundle.watchFiles);
  }
}
