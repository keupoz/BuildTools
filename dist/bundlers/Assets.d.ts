import AbstractBundler from './AbstractBundler';
export declare type AssetsConfig = {
    inputDir: string;
    outputDir: string;
};
export default class Assets extends AbstractBundler {
    private config;
    constructor(config: AssetsConfig, watch: boolean, autobundle?: boolean);
    bundle(path?: string): Promise<void>;
}
