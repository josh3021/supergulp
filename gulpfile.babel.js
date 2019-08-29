import gulp from "gulp";
import gulpPug from "gulp-pug";
import gulpImage from "gulp-image";
import ws from "gulp-webserver";
import del from "del";

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build"
  },
  image: {
    src: "src/img/*",
    dest: "build/img"
  }
}

const pug = () =>
  gulp
  .src(routes.pug.src)
  .pipe(gulpPug())
  .pipe(gulp.dest(routes.pug.dest));

const image = () =>
  gulp
  .src(routes.image.src)
  .pipe(gulpImage())
  .pipe(gulp.dest(routes.image.dest));

const clean = () => del(["build"]);

const webserver = () =>
  gulp
  .src('build')
  .pipe(ws({
    livereload: true,
    open: true
  }));

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.image.src, image);
}

const prepare = gulp.series([clean, image]);

const assets = gulp.series([pug]);

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);