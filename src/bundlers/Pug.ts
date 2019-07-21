import pug, { Options as PugOptions } from 'pug';

import { writeFileSync } from 'fs';

import AbstractBundler from './AbstractBundler';

export type Options = PugOptions & {
  output: string;
};

export default class Pug extends AbstractBundler {
  private output: string;
  private config: PugOptions;

  constructor (config: Options, watch: boolean, autobundle?: boolean) {
    super();

    this.output = config.output;
    delete config.output;

    this.config = <PugOptions> config;

    if (watch) {
      this.initWatcher(config.filename, autobundle);
    }
  }

  public async bundle (): Promise<void> {
    let result = pug.renderFile(this.config.filename, this.config);

    writeFileSync(this.output, result);
  }
}
