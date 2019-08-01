import * as tc from 'turbocolor';
import { rollup, RollupOptions, OutputOptions, RollupCache, RollupError } from 'rollup';

import AbstractBundler from './AbstractBundler';

export type EOutputOptions = OutputOptions | OutputOptions[];

export type ERollupOptions = Omit<RollupOptions, 'output'> & {
  output: EOutputOptions;
};

// https://github.com/rollup/rollup/blob/master/bin/src/logging.ts
const stderr: typeof console.error = console.error.bind(console);

function handleError(err: RollupError): void {
  let description = err.message || err;

  if (err.name) description = `${err.name}: ${description}`;

  const message =
    ((err as { plugin?: string }).plugin
      ? `(plugin ${(err as { plugin?: string }).plugin}) ${description}`
      : description) || err;

  stderr(tc.bold.red(`[!] ${tc.bold(message.toString())}`));

  if (err.url) stderr(tc.cyan(err.url));

  if (err.loc) {
		stderr(`${err.loc.file || err.id} (${err.loc.line}:${err.loc.column})`);
	} else if (err.id) {
		stderr(err.id);
	}

	if (err.frame) {
		stderr(tc.dim(err.frame));
	}

	if (err.stack) {
		stderr(tc.dim(err.stack));
	}

	stderr('');
}

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
    try {
      const { config, cache, output } = this;

      let bundle = await rollup({ ...config, cache });

      if (Array.isArray(output))
        for (let out_entry of output)
          await bundle.write(out_entry);
      else await bundle.write(output);

      this.cache = bundle.cache;

      if (this.watcher) this.watcher.update(bundle.watchFiles);
    } catch (err) {
      handleError(err as RollupError);
      throw new Error('Rollup error occured');
    }
  }
}
