# SuperflyCSS Commandline Interface

CLI for SuperflyCSS Projects.  The CLI enables the running of [superflycss](https://github.com/superflycss) build, test, and serve/watch tasks.  The CLI uses the [pli - project layout instance](https://github.com/superflycss/pli) for project layout.  See the [Build PostCSS Plugins](https://github.com/superflycss/clid#plugins) list for a list of plugins currently supported.

## Installation

`npm i -g @superflycss/cli`

## Usage

The `sfc serve` command watches and builds the project while also serving the projects html files with live reload courtesy of [browser-sync](https://browsersync.io/).

Place main css files in `src/main/css` and test css files (The CSS used in the test html file) in `src/test/css`.  Built main css files are saved in `target/main/css` and test css files are saved to `target/test/css`.  Use test case files in `src/test/html/` to test the CSS being built.  Run `sfc test:css` to compile the test html files.


| `Command`                | Description                                     |
|--------------------------|-------------------------------------------------|
| `sfc new [project name]` | Create a new Project                            |
| `sfc clean`              | Delete the target directory                     |
| `sfc build:main:css`     | Build the main css file                         |
| `sfc build:test:css`     | Build the test css file                         |
| `sfc test:css`           | Build the test html file                        |
| `sfc serve`              | Rebuilds and serves all files with browser-sync |

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
- Generation of a`Test-render` block that copies and displays the markup contained in the `Test-markup` block

Sample prebuilt content is shown below.  The markup contained in `Test_markup` will be highlighted, and a corresponding `Test-render` block will be generated after the `Test_description` block.  <em>Note that the tree structure of the test markup must match the structure shown.</em>

```html
<div class="Test">
    <span class="Test_counter"></span>
    <span class="Test_component">Button</span>

    <div class="Test_container">
      <div class="Test_input">
          <div class="Test_when"></div>
          <div class="Test_description">When the <code>.Grid</code> container holds 2 <code>.Grid-cell</code> instances.</div>
          <pre class="Test_markup">
            <code class="html">
              <div class="Grid">
                  <!-- Use Nunjucks to keep markup DRY -->
                  {% for cell in ['1', '2'] %}
                      <div class="Grid_cell">{{cell}}/2</div>
                  {% endfor %}
               </div>
            </code>
          </pre>
      </div>
      <div class="Test_output">
          <div class="Test_then"></div>
          <div class="Test_description">Each grid cell occupies the same amount of space witin the grid container row.</div>
      </div>
  </div>
```
Post the test build the content looks like this:

```html
<div class="Test">
  <span class="Test_counter"></span>
  <span class="Test_component">Grid</span>

  <div class="Test_container">
    <div class="Test_input">
      <div class="Test_when"></div>
      <div class="Test_description">When the <code class="hljs"><span class="hljs-title">.Grid</span></code> container holds 2 <code class="hljs"><span class="hljs-title">.Grid-cell</span></code> instances.</div>
      <pre class="Test_markup">
            <code class="html hljs">
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"Grid"</span>&gt;
  <span class="xml"><span class="hljs-comment">&lt;!-- Use Nunjucks to keep markup DRY --&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"Grid_cell"</span>&gt;</span>1/2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"Grid_cell"</span>&gt;</span>2/2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
            </code>
          </pre>
    </div>
    <div class="Test_output">
      <div class="Test_then"></div>
      <div class="Test_description">Each grid cell occupies the same amount of space witin the grid container row.</div>
      <div class="Test_render">
        <div class="Grid">
          <!-- Use Nunjucks to keep markup DRY -->
          <div class="Grid_cell">1/2</div>
          <div class="Grid_cell">2/2</div>
        </div>
      </div>
    </div>
  </div>
</div>
```
