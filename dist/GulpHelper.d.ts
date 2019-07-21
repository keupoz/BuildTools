import AbstractBundler from './bundlers/AbstractBundler';
export default class GulpHelper {
    private watchers;
    private callback;
    setCloseCallback(callback: () => void): this;
    close(): void;
    add(bundler: AbstractBundler, callback: () => void): this;
}
