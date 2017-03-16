// Gulp configuration file
var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    gulpMocha = require("gulp-mocha"),
    env = require("gulp-env"),
    supertest = require("supertest");

// Default task definition, nodemon will execute app.js
gulp.task('default', function(){
    nodemon({
        script : 'app.js', 
        ext: 'js',
        env: {
            PORT:8080
        },
        ignore: ['./node_modules/**'], 
        debug: true
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});

// Test task definition, env to define a ENV variable in case of test
// Test source definition and pipe results with Gulp Mocha
gulp.task('test', function(){
    env({vars: {ENV:'Test'}});
    gulp.src("Tests/*.js", {read: false})
    .pipe(gulpMocha({report:"myan"}));
    
});