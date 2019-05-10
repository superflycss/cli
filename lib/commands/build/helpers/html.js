/**
 * Load src html files, compile in parallel, and save the result
 * 
 * @param paths An array containing all the paths we are processings
 * @return A promise instance to facilitate calling the next function in the build chain
 */
module.exports = (paths) => {
    return Promise.all(paths.map(source => new Promise((resolve) => {
            const targetDirectory = path.dirname(source).replace(PLI.SRC, PLI.TARGET);
            const targetFile = source.replace(PLI.SRC, PLI.TARGET);
            fs.readFile(source, 'utf8', (err, html) => {
                const html2 = runner(html);
                mkdirp.sync(targetDirectory);
                fs.writeFileSync(targetFile, html2.serialize());
                resolve();
            });
    })));
}