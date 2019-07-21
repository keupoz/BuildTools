import Watcher from '../Watcher';

export default abstract class AbstractBundler {
  protected watcher: Watcher;

  public abstract async bundle (path: string): Promise<void>;

  protected initWatcher (input: string, autobundle: boolean, filter?: RegExp): void {
    this.watcher = new Watcher(input, {
      filter,
      ignoreInitial: !autobundle
    });

    if (autobundle) {
      this.getWatcher().on('all', (ev, path) => { this.bundle(path); });
    }
  }

  public getWatcher () {
    return this.watcher.getWatcher();
  }
}
