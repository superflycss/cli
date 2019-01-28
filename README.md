# SuperflyCSS Commandline Interface

CLI for SuperflyCSS Projects.  The CLI enables the running of [superflycss](https://github.com/superflycss) build, test, and serve/watch tasks.  The CLI uses the [pli - project layout instance](https://github.com/superflycss/pli) for project layout.  See the [Build PostCSS Plugins](https://github.com/superflycss/clid#plugins) list for a list of plugins currently supported.

## Installation

`npm i -g @superflycss/cli`

## Usage

### Blog Articles

- [Prototyping With Bootstrap 4 Using the SuperflyCSS CLI](https://medium.com/@ole.ersoy/prototyping-with-bootstrap-4-using-the-superflycss-cli-a40ec24237c2)
- [Filtering Unused CSS Selectors With SuperflyCSS](https://medium.com/@ole.ersoy/filtering-unused-css-selectors-with-superflycss-69075e567574)
- [Minifying Your CSS With SuperflyCSS](https://medium.com/@ole.ersoy/minifying-your-css-with-superflycss-8c1b9468beae)
- [Building Sugarss With SuperflyCSS](https://medium.com/@ole.ersoy/building-sugarss-with-superflycss-b38a09d17930)
- [Hacking the SuperflyCSS PostCSS Plugin Configuration](https://medium.com/@ole.ersoy/hacking-the-superflycss-cli-postcss-plugin-configuration-b5157ff5f2e3)


### New Project Types
The `sfc new` command supports five different options for project type.  They are `c` for component, `u` for utility, `p` for prototype, `e` for empty, and `a` for application.

So for example when generating a new component project, use `sfc new -t c`.  Prototype is the default, so when creating a prototype project just use `sfc new projectname`.

### Supported Commands

Type `sfc -h` to see supported commands.  The output will look like this:

``` console
  Usage: sfc [options] [command]

  SuperflyCSS Command Line Interface

  Options:

    -V, --version        output the version number
    -t, --type [type]    
    -h, --help           output usage information

  Commands:

    new|n <name>                 Create a new project
    clean|c                      Clean the build (Removes target folder)
    build:main:css|bmc           Build main css)
    build:test:css|btc           Build test CSS
    build:test:html|bth          Build test HTML
    build:main:filtered:css|bmfc Build main filtered CSS
    build:test:filtered:css|btfc Build test filtered CSS
    build:main:minified:css|bmmc Build main filtered CSS
    build:test:minified:css|btmc Build test filtered CSS
    build|b              Build main css, test css, and test html
    dist|d               Prepare dist directory for publishing to NPM
    serve|s              Compile and serve main and test css and test html
```

The `sfc serve` command watches and builds the project while also serving the projects html files with live reload courtesy of [browser-sync](https://browsersync.io/).

Specifically it build `src/test/css/**/*.css` files and the results are saved to `serve/css`.  The `src/test/html/**/*.html` files are build and save to the `serve` directory.

Place main css files in `src/main/css` and test css files (The CSS used in the test html file) in `src/test/css`.  Built main css files are saved in `target/main/css` and test css files are saved to `target/test/css`.  Use test case files in `src/test/html/` to test the CSS being built.  Run `sfc test:css` to compile the test html files.

#### Filtering

Filter CSS selectors against `target/main/html` or `target/test/html` using `postcss-uncss`.

- Run `sfc bmfc` to filter `target/main/css` files again `target/main/html` content.  
- Run `sfc btfc` to filter `target/test/css` files again `target/test/html` content.  

The files produced will have a `.filtered.css` extension.

#### Minification

Minification is performed with `cssnano` and `mqpackger`.  Uncss is used when html is present to run against.

- Run `sfc bmmc` to minify `src/main/css` files.  
- Run `sfc btmc` to minify `src/test/css` files.

The files produced will have a `.min.css` extension.

## PostCSS Plugins Used by the CSS Build Commands

The following plugins are invoked when the tasks `build:main:css` and `build:test:css` are invoked.


| Plugin Name                  | Plugin URL                                             |
|------------------------------|--------------------------------------------------------|
| autoprefixer                 | https://github.com/postcss/autoprefixer                |
| postcss-import               | https://github.com/postcss/postcss-import              |
| postcss-apply                | https://github.com/pascalduez/postcss-apply            |
| postcss-calc                 | https://github.com/postcss/postcss-calc                |
| postcss-color-function       | https://github.com/postcss/postcss-color-function      |
| postcss-custom-media         | https://github.com/postcss/postcss-custom-media        |
| postcss-css-variables        | https://github.com/MadLittleMods/postcss-css-variables |
| postcss-each                 | https://github.com/outpunk/postcss-each                |
| postcss-font-magician        | https://github.com/jonathantneal/postcss-font-magician |
| postcss-for                  | https://github.com/antyakushev/postcss-for             |
| postcss-reporter             | https://github.com/postcss/postcss-reporter            |
| postcss-sass-color-functions | https://github.com/adam-h/postcss-sass-color-functions |

Filtering is performed by the `postcss-uncss` plugin and minification is performed using `css-mqpacker` and `cssnano`.

## Test CSS Command

The `sfc test:css` command supports the visual testing of [superflycss](https://github.com/superflycss/superflycss) [components](https://github.com/superflycss?utf8=%E2%9C%93&q=components&type=&language=) and [utilities](https://github.com/superflycss?utf8=%E2%9C%93&q=utilities&type=&language=) by building the `src/test/html/**/*.html` content.  It has the following features:
- [Nunjucks](https://mozilla.github.io/nunjucks/) templating
- [Highlighting](https://highlightjs.org/) of content contained in the `Test-markup` block

For sample tests using nunjucks templates to keep the content [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) see [component-test](https://github.com/superflycss/component-test).