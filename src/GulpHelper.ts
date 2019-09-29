import { FSWatcher } from "chokidar";
import { series } from "gulp";
import AbstractBundler from "./bundlers/AbstractBundler";

export default class GulpHelper {
    private watchers: FSWatcher[] = [];
    private callback: () => void = () => { };

    public setCloseCallback(callback: () => void): this {
        this.callback = callback;
        return this;
    }

    public close(): void {
        this.watchers.forEach((watcher) => watcher.close());
        this.callback();
    }

    public add(bundler: AbstractBundler, callback: () => void): this {
        let watcher = bundler.getWatcher();

        if (!watcher) throw new TypeError("Watcher is not initialized");

        watcher.on("all", callback);

        this.watchers.push(watcher);

        return this;
    }

    public task<Callback extends () => Promise<void>>(name: string, fn: Callback) {
        let cb = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    fn()
                        .then(() => resolve())
                        .catch((err) => reject(err));
                }, 200);
            });
        };
        (cb as any).displayName = name;
        return series(cb) as Callback;
    }
}
