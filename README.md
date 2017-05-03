# Inception Base
**Boilerplate for quick start a WordPress project**

Technologies: [bem-cn](https://github.com/albburtsev/bem-cn), [Sass](http://sass-lang.com/) and [autoprefixer](https://github.com/postcss/autoprefixer), [spritesmith](https://github.com/Ensighten/spritesmith), [imagemin](https://github.com/imagemin/imagemin), [Bootstrap](http://getbootstrap.com/).

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

#### All in one mode

```html
<div bClass="b('block')">
  <div bClass="b('block')('element')">Element</div>
  <div bClass="b('block')('element', {size: 'small'})">Small element</div>
</div>
```

It will be formatted to:

```html
<div class="block">
  <div class="block__element">Element</div>
  <div class="block__element block__element_size_small">Small element</div>
</div>
```

#### Block per file mode

*Comments are not required.*

```html
<!-- ./templates/blocks/included-block.php -->
<div bRootClass="b('included-block')">
  <div bClass="b('element')">Element</div>
  <div bClass="b('element', {size: 'small'})">Small element</div>
</div>

<!-- ./templates/index.php -->
<div>
  @@include('included-block.php')
  <div bClass="b('block')({visible: true})">Another element</div>
</div>
```

It will be formatted to:

```html
<div>
  <div class="included-block">
    <div class="included-block__element">Element</div>
    <div class="included-block__element included-block__element_size_small">Small element</div>
  </div>
  <div class="block block_visible">Another element</div>
</div>
```

More info about the bem-cn syntax you can find in the package [repo](https://github.com/albburtsev/bem-cn).

### Commands
Use the following commands to run the build:

* `yarn start` or `npm start` - for the default task with Pug, cssnext, spritesmith, imagemin and watchers for .pug and .css source files;
* `yarn prod` or `npm run prod` - the default task without watchers.