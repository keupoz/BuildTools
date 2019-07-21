import AbstractBundler from './AbstractBundler';

import { copySync } from 'fs-extra';

export type AssetsConfig = {
  inputDir: string;
  outputDir: string;
};

export default class Assets extends AbstractBundler {
  private config: AssetsConfig;

  constructor (config: AssetsConfig, watch: boolean, autobundle?: boolean) {
    super();

    this.config = config;

    if (watch) {
      this.initWatcher(`${config.inputDir}/**/*`, autobundle);
    }
  }

  public async bundle (path = this.config.inputDir): Promise<void> {
    copySync(path, this.config.outputDir);
  }
}
