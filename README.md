# Inception Base
**Boilerplate for quick start a WordPress project**

Technologies: [Pug](https://pugjs.org/) with [bemto](https://github.com/kizu/bemto), [cssnext](http://cssnext.io/)(autoprefixer is included), [spritesmith](https://github.com/Ensighten/spritesmith), [imagemin](https://github.com/imagemin/imagemin), [Bootstrap](http://getbootstrap.com/).

## Setup
1. Clone the repo to `themes` folder of WordPress:
    ```sh
    git clone https://github.com/yustnip/inception-base.git
    ```

2. Go to the folder `inception-base` and install:
    ```sh
    yarn
    ```

    or

    ```sh
    npm i
    ```

## Usage
Use the following commands to run the build:

* `yarn start` or `npm start` - for the default task with Pug, cssnext, spritesmith, imagemin and watchers for .pug and .css source files;
* `yarn prod` or `npm run prod` - the default task without watchers.