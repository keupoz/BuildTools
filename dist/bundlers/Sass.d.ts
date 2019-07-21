import { Options as SassOptions } from 'sass';
import AbstractBundler from './AbstractBundler';
export default class Sass extends AbstractBundler {
    private config;
    constructor(config: SassOptions, watch: boolean, autobundle?: boolean);
    bundle(): Promise<void>;
}
