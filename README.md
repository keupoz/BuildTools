# BuildTools

This is my personal package used to build web projects and Node.js libraries. But you are free to use it for your purposes

## Usage
Install with npm:
```bash
npm i -D @keupoz/buildtools
```
... and use it in your build script, e.g. gulpfile.js:
```javascript
import { Rollup, RollupPlugins as RP } from "@keupoz/buildtools";

const rollup = new Rollup({
  // ...
  // here goes rollup config which is directly used by rollup
  // ...
  // plugins example
  plugins: [
    RP.get("uglify")
  ]
});

// Bundle your project
rollup.bundle();
```

### Common bundlers API
All bundlers have similar constructor syntax:
```javascript
new Bundler(config, watch, autobundle);
```
* `config` - usually goes directly to wrapped bundler
* `watch` - should bundler watch for changes?
* `autobundle` - automatically run bundler on changes

### Assets bundler
Just copies assets folder

**Import:**
```javascript
import { Assets } from "@keupoz/buildtools";
```

**Config:**
```javascript
const assets_config = {
  inputDir: "src/assets",
  outputDir: "dest/assets"
};
```

### Pug bundler
Compiles pug files.

**Import:**
```javascript
import { Pug } from "@keupoz/buildtools";
```

**Config:** see https://github.com/pugjs/pug#options

Config is also extended by 2 options:
- `inputdir` - a directory which the bundler should search for pug files
- `outputdir` - output directory

The bundler currently only supports basic pages structure.

**Source structure:**
```
src
+- about.pug
+- help.pug
+- index.pug
```

**Resulting structure:**
```
output
+- about
|  +- index.html
+- help
|  +- index.html
+- index.html
```

### Sass bundler
Compiles sass files

**Import:**
```javascript
import { Sass } from "@keupoz/buildtools";
```

**Config:** see https://sass-lang.com/documentation/js-api#options

### Rollup bundler
Compiles JavaScript using Rollup. Multiple outputs supported. But multiple input configs AREN'T supported, use different instances

**Import:**
```javascript
// Import bundler
import { Rollup } from "@keupoz/buildtools";
// Import plugins getter
import { RollupPlugins } from "@keupoz/buildtools";
```

**Config:** see https://rollupjs.org/guide/en/#big-list-of-options

#### RollupPlugins
Helps getting rollup plugins

**Usage:**
```javascript
// Plugin name is its name without `rollup-plugin-`
// `actuallyGet` specifies do actually get the plugin. Useful with `isProduction` constant
// `builtIn` specifies do use built-in plugins. Currently there is only one: `uglify`
RP.get(pluginName, actuallyGet, builtIn);
```

### GulpHelper
Useful in dev build in watch task. Registers bundlers and stops watchers and ends watch task on close

**Usage:**
```javascript
import { GulpHelper } from "@keupoz/buildtools";

const HELPER = new GulpHelper();

function watch(done: () => void) {
  HELPER
    // does what it says
    // this callback is used when `.close` is called
    .setCloseCallback(done)

    // Register bundler
    // .add(bundlerInstance, taskFunction)
    .add(BUILD.assets, assets)
    .add(BUILD.pug,    html)
    .add(BUILD.sass,   css)
    .add(BUILD.rollup, js);

  let bs = bs_create().init({
    server: "dest",
    files: "dest/**/*"
  });

  process.on("SIGINT", () => {
    console.log("Stopping watchers...");
    bs.exit();
    HELPER.close();
    process.exit();
  });
}
```

#### Task wrapper
There is a helpful function that wraps your functions into Gulp tasks so it will log pretty messages on calling them

> To use task wrapper you must install gulp in your project

**Usage:**
```javascript
import { GulpHelper } from "@keupoz/buildtools";

const bundlerTask = GulpHelper.task("task_name", () => bundler.bundle());
```
