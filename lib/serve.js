module.exports = function serve(cb) {
    mkdirp.sync(PLI.serve.css);

    log('info', "Copy target/test/html/**/*.html to serve/");
    rsync(PLI.target.test.html, PLI.SERVE, function (error, results) {
        if (error) {
            log('error', 'Error on copy of html file(s) to serve directory: ' + error);
        } else {
            log('info', 'Moved ' + (results.length) + ' html file(s) to serve directory.');
        }
    });

    log('info', "Copy target/test/css/**/*.css to serve/css/");
    rsync(PLI.target.test.css, PLI.serve.css, function (error, results) {
        if (error) {
            console.error('Error on copy of target/test/css files: ' + error);
        } else {
            console.info('Moved ' + (results.length) + ' target/test/css files to serve');
        }
    });
    //Call the callback to tell browsersync to reload
}
