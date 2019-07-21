import Watcher from '../Watcher';
export default abstract class AbstractBundler {
    protected watcher: Watcher;
    abstract bundle(path: string): Promise<void>;
    protected initWatcher(input: string, autobundle: boolean, filter?: RegExp): void;
    getWatcher(): import("chokidar").FSWatcher;
}
