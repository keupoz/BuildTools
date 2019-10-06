import { ensureDirSync, writeFileSync } from "fs-extra";
import { sync as globSync } from "glob";
import { join, parse, resolve } from "path";
import { Options, renderFile } from "pug";
import AbstractBundler from "./AbstractBundler";

export type PugOptions = Options & {
    inputdir: string;
    outputdir: string;
};

export default class Pug extends AbstractBundler {
    private inputdir: string;
    private outputdir: string;
    private config: PugOptions;

    constructor(config: PugOptions, watch: boolean, autobundle?: boolean) {
        super();

        this.inputdir = config.inputdir;
        this.outputdir = config.outputdir;

        delete config.inputdir;
        delete config.outputdir;

        this.config = config;

        if (watch) {
            this.initWatcher(join(this.inputdir, "/*.pug"), autobundle);
        }
    }

    public async bundle(path?: string): Promise<void> {
        if (!path) {
            let paths = globSync(join(this.inputdir, "/*.pug"));
            for (let p of paths) await this.bundle(p);
            return;
        }

        let path_obj = parse(path),
            result = renderFile(path, this.config);

        let outputdir = resolve(this.outputdir, path_obj.base == "index.pug" ? "" : path_obj.name),
            output = join(outputdir, "/index.html");

        ensureDirSync(outputdir);
        writeFileSync(output, result);
    }
}
