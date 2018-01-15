# Inception Base
**Boilerplate for quick start a WordPress project**

Technologies: [PostHTML](https://github.com/posthtml/posthtml) with [PostHTML-bem](https://github.com/rajdee/posthtml-bem), [Babel](https://babeljs.io/), [Sass/SCSS](http://sass-lang.com/) and [autoprefixer](https://github.com/postcss/autoprefixer), [spritesmith](https://github.com/Ensighten/spritesmith), [imagemin](https://github.com/imagemin/imagemin), [Jeet](http://jeet.gs/), [slick](http://kenwheeler.github.io/slick/).

## Setup
1. Clone the repo to `themes` folder of WordPress:
  ```sh
  git clone https://github.com/yustnip/inception-base.git
  ```

2. Go to the folder `inception-base` and install:
  ```sh
  npm i
  ```

## Usage

### Commands
Use the following commands to run the build:

* `npm start` - for the default task with PostHTML, Babel, Sass, spritesmith, imagemin and watchers for .php, .js and .scss source files;
* `npm run prod` - the task with PostHTML, Babel, Sass, spritesmith, imagemin but without watchers and cache.
