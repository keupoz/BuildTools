import { FSWatcher } from 'chokidar';
export default class Watcher {
    private watcher;
    private oldPaths;
    private filter;
    constructor(paths: string | string[], options?: {
        filter?: RegExp;
        ignoreInitial?: boolean;
    });
    getWatcher(): FSWatcher;
    update(watchPaths: string[]): void;
}
