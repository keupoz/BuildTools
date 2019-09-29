import { FSWatcher, watch } from "chokidar";

export default class Watcher {
    private watcher: FSWatcher;
    private oldPaths: string[] = [];
    private filter: RegExp;

    constructor(paths: string | string[], options?: { filter?: RegExp, ignoreInitial?: boolean }) {
        let { filter, ignoreInitial } = options;

        this.watcher = watch(paths, { ignoreInitial });
        this.filter = filter;
    }

    public getWatcher(): FSWatcher {
        return this.watcher;
    }

    public update(watchPaths: string[]): void {
        const { oldPaths } = this;

        let newPaths = this.filter ? watchPaths.filter((path) => !this.filter.test(path)) : watchPaths.slice(),
            toWatch = newPaths.filter((path) => !this.oldPaths.includes(path)),
            toUnwatch = oldPaths.filter((path) => !watchPaths.includes(path));

        this.watcher.unwatch(toUnwatch);
        this.watcher.add(toWatch);
        this.oldPaths = watchPaths;
    }
}
