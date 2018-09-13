# SuperflyCSS Commandline Interface

CLI for SuperflyCSS Projects.  The CLI enables the running of [superflycss](https://github.com/superflycss) build, test, and serve/watch tasks.  The CLI uses the [pli - project layout instance](https://github.com/superflycss/pli) for project layout.  See the [Build PostCSS Plugins](https://github.com/superflycss/clid#plugins) list for a list of plugins currently supported.

## Installation

`npm i -g @superflycss/cli`

## Usage

### Blog Articles

[Prototyping With Bootstrap 4 Using the SuperflyCSS CLI](https://medium.com/@ole.ersoy/prototyping-with-bootstrap-4-using-the-superflycss-cli-a40ec24237c2)


### New Project Types
The `sfc new` command supports four different options for project type.  They are `c` for component, `u` for utility, `p` for prototype, and `a` for application.

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

    new|n <name>         Create a new project
    clean|c              Clean the build (Removes target folder)
    build:main:css|bmc   Build main css)
    build:test:css|btc   Build Test CSS
    build:test:html|bth  Build Test HTML
    build|b              Build main css, test css, and test html
    dist|d               Prepare dist directory for publishing to NPM
    serve|s              Compile and serve main and test css and test html

```

The `sfc serve` command watches and builds the project while also serving the projects html files with live reload courtesy of [browser-sync](https://browsersync.io/).

Specifically it build `src/test/css/**/*.css` files and the results are saved to `serve/css`.  The `src/test/html/**/*.html` files are build and save to the `serve` directory.

Place main css files in `src/main/css` and test css files (The CSS used in the test html file) in `src/test/css`.  Built main css files are saved in `target/main/css` and test css files are saved to `target/test/css`.  Use test case files in `src/test/html/` to test the CSS being built.  Run `sfc test:css` to compile the test html files.


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
| postcss-custom-properties    | https://github.com/postcss/postcss-custom-properties   |
| postcss-each                 | https://github.com/outpunk/postcss-each                |
| postcss-font-magician        | https://github.com/jonathantneal/postcss-font-magician |
| postcss-for                  | https://github.com/antyakushev/postcss-for             |
| postcss-reporter             | https://github.com/postcss/postcss-reporter            |
| postcss-sass-color-functions | https://github.com/adam-h/postcss-sass-color-functions |

## Test CSS Command

The `sfc test:css` command supports the visual testing of [superflycss](https://github.com/superflycss/superflycss) [components](https://github.com/superflycss?utf8=%E2%9C%93&q=components&type=&language=) and [utilities](https://github.com/superflycss?utf8=%E2%9C%93&q=utilities&type=&language=) by building the `src/test/html/**/*.html` content.  It has the following features:
- [Nunjucks](https://mozilla.github.io/nunjucks/) templating
- Highlighting of content contained in the `Test-markup` block

For sample tests using nunjucks templates to keep the content [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) see [component-test](https://github.com/superflycss/component-test).