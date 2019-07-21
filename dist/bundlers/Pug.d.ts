import { Options as PugOptions } from 'pug';
import AbstractBundler from './AbstractBundler';
export declare type Options = PugOptions & {
    output: string;
};
export default class Pug extends AbstractBundler {
    private output;
    private config;
    constructor(config: Options, watch: boolean, autobundle?: boolean);
    bundle(): Promise<void>;
}
