import sass, { Options as SassOptions } from 'sass';

import { writeFileSync } from 'fs';

import AbstractBundler from './AbstractBundler';

export default class Sass extends AbstractBundler {
  private config: SassOptions;

  constructor (config: SassOptions, watch: boolean, autobundle?: boolean) {
    super();

    this.config = config;

    if (watch) {
      this.initWatcher(config.file, autobundle);
    }
  }

  public async bundle (): Promise<void> {
    let result = sass.renderSync(this.config);

    writeFileSync(this.config.outFile, result.css);

    if (this.watcher) this.watcher.update(result.stats.includedFiles);
  }
}
