import { writeFileSync } from "fs";
import { Options as PugOptions, renderFile } from "pug";
import AbstractBundler from "./AbstractBundler";

export type Options = PugOptions & {
    output: string;
};

export default class Pug extends AbstractBundler {
    private output: string;
    private config: PugOptions;

    constructor(config: Options, watch: boolean, autobundle?: boolean) {
        super();

        this.output = config.output;
        delete config.output;

        this.config = <PugOptions>config;

        if (watch) {
            this.initWatcher(config.filename, autobundle);
        }
    }

    public async bundle(): Promise<void> {
        let result = renderFile(this.config.filename, this.config);

        writeFileSync(this.output, result);
    }
}
