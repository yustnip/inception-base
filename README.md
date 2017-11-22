# Inception Base
**Boilerplate for quick start a WordPress project**

Technologies: [Sass](http://sass-lang.com/) and [autoprefixer](https://github.com/postcss/autoprefixer), [spritesmith](https://github.com/Ensighten/spritesmith), [imagemin](https://github.com/imagemin/imagemin), [Bootstrap](http://getbootstrap.com/).

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

* `npm start` - for the default task with Pug, cssnext, spritesmith, imagemin and watchers for .pug and .css source files;
* `npm run prod` - the default task without watchers.
