# Inception Base
**Заготовка для быстрого старта проекта на WordPress**

## Инструкция
1. Перейти в терминале в папку ```themes``` сборки WordPress и склонировать тему:

```sh
git clone https://github.com/yustnip/inception-base.git
```

2. Перейти в терминале в папку ```inception-base``` и установить плагины:

```sh
sudo npm install --save-dev
```

3. Открыть в редакторе файл ```/inception-base/node_modules/gulp-jsbeautifier/node_modules/js-beautify/js/lib/beautify-html.js``` и добавить в список ```single_token:``` выражение ```?php```.
