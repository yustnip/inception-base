# Inception Base
**Boilerplate for quick start a WordPress project**

Technologies: [b_](https://github.com/azproduction/b_), [cssnext](http://cssnext.io/)(autoprefixer is included), [spritesmith](https://github.com/Ensighten/spritesmith), [imagemin](https://github.com/imagemin/imagemin), [Bootstrap](http://getbootstrap.com/).

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

### Templates
For creating BEM class names you can use the following syntax:

```html
<div bemClass="b( 'block' )">
    <div bemClass="b( 'block', 'element' )">Element</div>
    <div bemClass="b( 'block', 'element', { size: 'small' } )">Small element</div>
</div>
```

It will be formatted to:

```html
<div class="block">
    <div class="block__element">Element</div>
    <div class="block__element block__element_size_small">Small element</div>
</div>
```

More info you can find in the [b_](https://github.com/azproduction/b_) repo.

### Commands
Use the following commands to run the build:

* `yarn start` or `npm start` - for the default task with Pug, cssnext, spritesmith, imagemin and watchers for .pug and .css source files;
* `yarn prod` or `npm run prod` - the default task without watchers.