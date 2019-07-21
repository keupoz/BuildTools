import { RollupOptions, OutputOptions } from 'rollup';
import AbstractBundler from './AbstractBundler';
export declare type EOutputOptions = OutputOptions | OutputOptions[];
export declare type ERollupOptions = Omit<RollupOptions, 'output'> & {
    output: EOutputOptions;
};
export default class Rollup extends AbstractBundler {
    private config;
    private output;
    private cache;
    constructor(config: ERollupOptions, watch: boolean, autobundle?: boolean);
    bundle(): Promise<void>;
}
