import { FSWatcher } from 'chokidar';

import AbstractBundler from './bundlers/AbstractBundler';

export default class GulpHelper {
  private watchers: FSWatcher[] = [];
  private callback: () => void;

  public setCloseCallback (callback: () => void): this {
    this.callback = callback;
    return this;
  }

  public close (): void {
    this.watchers.forEach((watcher) => watcher.close());
    this.callback();
  }

  public add (bundler: AbstractBundler, callback: () => void): this {
    let watcher = bundler.getWatcher();

    watcher.on('all', callback);

    this.watchers.push(watcher);

    return this;
  }
}
