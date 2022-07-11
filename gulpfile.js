//css
const {src,dest,watch,parallel}=require("gulp");
const sass=require("gulp-sass")(require("sass"));
const plumber=require("gulp-plumber");
//AutPrefix se encarga de dar soporte al código para que pueda ser usado en los navegadores al 100
const autoprefixer=require("autoprefixer");
//css nano se encarga de comprimir el codigo css
const cssnano=require("cssnano");
//postcss transformaciones por medio de css nano y autoprefixer
const postcss=require("gulp-postcss");
const sourcemap=require("gulp-sourcemaps");

//imagenes
const cache=require("gulp-cache");
const imagemin=require("gulp-imagemin")
const webp=require("gulp-webp");
const avif=require("gulp-avif");

//JavaScript
const terser=require("gulp-terser-js");

function css(done){
    src("src/scss/**/*.scss")    //identificar el archivo .scss a compilar
        .pipe(sourcemap.init())
        .pipe(plumber())
        .pipe(sass())    // compilarlo 
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemap.write("."))
        .pipe(dest("build/css"))    //almacenarlo

    done();
}
function imagenes(done){
    const opciones={
        optimizationLevel:3
        
    }
    src("src/img/**/*.{jpg,png}")

    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"))
    
    done();
}

function conversion(done){
    const opciones={
        quality:50
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(webp(opciones)) 
        .pipe(dest("build/img"))
    done();
}
function conversionAvif(done){
    const opciones={
        quality:50
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(avif(opciones)) 
        .pipe(dest("build/img"))
    done();
}
function javascript(done){
    src("src/js/**/*.js")
        .pipe(sourcemap.init())
        .pipe(terser())
        .pipe(sourcemap.write("."))
        .pipe(dest("build/js"));
            done();
}

function dev(done){
    watch("src/scss/**/*.scss",css);
    watch("src/js/**/*.js",javascript);

    done();
}

exports.css=css;
exports.js=javascript;
exports.imagenes=imagenes;
exports.conversion=conversion;
exports.conversionAvif=conversion;
exports.dev=parallel(imagenes,conversion,conversionAvif,javascript,dev);