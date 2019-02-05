const path = require("path");
const exec = require("child_process").exec;
const uuid = require("uuid");
const del = require("del");
const fs = require('fs-extra');
const PLI = require('@superflycss/pli');
const fixtures = require('./test/fixtures');

const SANDBOX = "test/sandbox/";

describe("The new command", () => {
  it("should create a prototype project by default", async () => {
    const sandbox = tmp();
    let result = await cli(["new", sandbox], ".");
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("prototyping");
    del.sync(SANDBOX);
  });

  it("should create a componet project when -t c is passed", async () => {
    const sandbox = tmp();
    let result = await cli(
      ["new", "-t", "c", sandbox],
      "."
    );
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("component");
    del.sync(SANDBOX);
  });  
  test("should create a empty project when -t e is passed", async () => {
    const sandbox = tmp();
    let result = await cli(
      ["new", "-t", "e", sandbox],
      "."
    );
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("empty");
    del.sync(SANDBOX);
  });  
  test("should create a utility project when -t u is passed", async () => {
    const sandbox = tmp();
    let result = await cli(
      ["new", "-t", "u", sandbox],
      "."
    );
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("utility");
    let t = tmp();
    del.sync(SANDBOX);
  });  
});


describe("The build command", () => {
  it("should build main, test css and html files", async () => {
    const sandbox = tmp();
    let result = await cli(["new",  "-t", "e", sandbox], ".");
    const red = fixtures.css();
    const redPath = path.join(sandbox, PLI.src.main.css,'index.css');

    fs.writeFileSync(redPath, red);

    result = await cli(["b"], sandbox);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("build");
    del.sync(SANDBOX);
  });
  it("should build sss files", async () => {
    const sandbox = tmp();
    let result = await cli(["new",  "-t", "e", sandbox], ".");
    const red = fixtures.sss();
    const redPath = path.join(sandbox, PLI.src.main.sss,'red.sss');

    fs.writeFileSync(redPath, red);

    result = await cli(["b"], sandbox);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("build");
    //del.sync(SANDBOX);
  });
});

describe("The build:main:css command", () => {
  it("should build main css files", async () => {
    const sandbox = tmp();
    let result = await cli(["new",  "-t", "e", sandbox], ".");
    const css = fixtures.css();
    const cssPath = path.join(sandbox, PLI.src.main.css,'index.css');

    fs.writeFileSync(cssPath, css);

    result = await cli(["bmc"], sandbox);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("build");
    del.sync(SANDBOX);
  });
});

describe("The build:test:css command", () => {
  it("should build test css files", async () => {
    const sandbox = tmp();
    let result = await cli(["new",  "-t", "e", sandbox], ".");
    const css = fixtures.css();
    const cssPath = path.join(sandbox, PLI.src.test.css,'index.css');

    fs.writeFileSync(cssPath, css);

    result = await cli(["btc"], sandbox);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("build");
    del.sync(SANDBOX);
  });
});

describe("The build:test:html command", () => {
  it("should build test html files", async () => {
    const sandbox = tmp();
    let result = await cli(["new",  "-t", "e", sandbox], ".");
    const html = fixtures.html();
    const htmlPath = path.join(sandbox, PLI.src.test.html,'index.html');

    fs.writeFileSync(htmlPath, html);

    result = await cli(["bth"], sandbox);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("build");
    //del.sync(SANDBOX);
  });
});

describe("The build:main:html command", () => {
  it("should build main html files", async () => {
    const sandbox = tmp();
    let result = await cli(["new",  "-t", "e", sandbox], ".");
    const html = fixtures.html();
    const htmlPath = path.join(sandbox, PLI.src.main.html,'index.html');

    fs.writeFileSync(htmlPath, html);

    result = await cli(["bmh"], sandbox);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("build");
    del.sync(SANDBOX);
  });
});

describe("The build:main:filtered:css command", () => {
  it("should build main filtered css files", async () => {
    const sandbox = tmp();
    let result = await cli(["new",  "-t", "e", sandbox], ".");
    const html = fixtures.html();
    const htmlPath = path.join(sandbox, PLI.src.main.html,'index.html');
    fs.writeFileSync(htmlPath, html);
    const css = fixtures.css();
    const cssPath = path.join(sandbox, PLI.src.main.css,'index.css');
    fs.writeFileSync(cssPath, css);
    await cli(["b"], sandbox);
    result = await cli(["bmfc"], sandbox);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("filtering");
    del.sync(SANDBOX);
  });
});

describe("The build:test:filtered:css command", () => {
  it("should build main filtered css files", async () => {
    const sandbox = tmp();
    let result = await cli(["new",  "-t", "e", sandbox], ".");
    const html = fixtures.html();
    const htmlPath = path.join(sandbox, PLI.src.test.html,'index.html');
    fs.writeFileSync(htmlPath, html);
    const css = fixtures.css();
    const cssPath = path.join(sandbox, PLI.src.test.css,'index.css');
    fs.writeFileSync(cssPath, css);
    await cli(["b"], sandbox);
    result = await cli(["btfc"], sandbox);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("filtering");
    del.sync(SANDBOX);
  });
});

describe("The build:main:minified:css command", () => {
  it("should build main minified css files", async () => {
    const sandbox = tmp();
    let result = await cli(["new",  "-t", "e", sandbox], ".");
    const html = fixtures.html();
    const htmlPath = path.join(sandbox, PLI.src.main.html,'index.html');
    fs.writeFileSync(htmlPath, html);
    const css = fixtures.css();
    const cssPath = path.join(sandbox, PLI.src.main.css,'index.css');
    fs.writeFileSync(cssPath, css);
    await cli(["b"], sandbox);
    result = await cli(["bmmc"], sandbox);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("minification");
    del.sync(SANDBOX);
  });
});

describe("The build:test:minified:css command", () => {
  it("should build test minified css files", async () => {
    const sandbox = tmp();
    let result = await cli(["new",  "-t", "e", sandbox], ".");
    const html = fixtures.html();
    const htmlPath = path.join(sandbox, PLI.src.test.html,'index.html');
    fs.writeFileSync(htmlPath, html);
    const css = fixtures.css();
    const cssPath = path.join(sandbox, PLI.src.test.css,'index.css');
    fs.writeFileSync(cssPath, css);
    await cli(["b"], sandbox);
    result = await cli(["btmc"], sandbox);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("minification");
    //del.sync(SANDBOX);
  });
});

function cli(args, cwd) {
  return new Promise(resolve => {
    exec(
      `node ${path.resolve("./index")} ${args.join(" ")}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        });
      }
    );
  });
}

function tmp(ext) {
  ext = ext || "";
  return path.join(SANDBOX, uuid(), ext);
}
