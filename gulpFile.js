var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    gulpMocha = require("gulp-mocha");

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

gulp.task('test', function(){
    gulp.src("Tests/*.js", {read: false})
    .pipe(gulpMocha({report:"myan"}));
    
});