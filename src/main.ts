import { series } from 'gulp';

import RollupPlugins from './RollupPlugins';

import Assets from './bundlers/Assets';
import Rollup from './bundlers/Rollup';
import Sass   from './bundlers/Sass';
import Pug    from './bundlers/Pug';

import GulpHelper from './GulpHelper';

export { uglify } from './RollupPlugins';
export { AssetsConfig } from './bundlers/Assets';

export { RollupPlugins, Assets, Rollup, Sass, Pug };
export { GulpHelper };

export function task<Callback extends () => Promise<void>> (name: string, fn: Callback) {
  let cb = (done: () => void) => {
    setTimeout(async () => {
      await fn();
      done();
    }, 200);
  };
  (<any> cb).displayName = name;
  return <Callback> series(cb);
}
