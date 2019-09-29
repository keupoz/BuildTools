import Watcher from "../Watcher";

export default abstract class AbstractBundler {
    protected watcher: Watcher | null = null;

    public abstract async bundle(path: string): Promise<void>;

    protected initWatcher(input: string, autobundle = false, filter?: RegExp): void {
        this.watcher = new Watcher(input, {
            filter,
            ignoreInitial: !autobundle
        });

        if (autobundle) {
            this.getWatcher()!.on("all", (_, path) => { this.bundle(path); });
        }
    }

    public getWatcher() {
        return this.watcher ? this.watcher.getWatcher() : null;
    }
}
