# Springroll Seed

Springroll Seed is intended to be used as starting point for games projects. It comes bundled with Webpack, Babel, as well as a few other node modules to streamline development.

## Commands

SpringRoll Seed comes with only two commands

### npm start

Starts the dev server

### npm run build

Builds ap for production

# Dev Flow

## Webpack

Springroll Seed uses Webpack as its build process. If you are not familiar with Webpack, how it works is that it looks for a entry point, in Seed's case there are three options. `index.js`, `vendor.js`, and `styles.css`.

All three entry points work the same way in that they will include and bundle any code or styles that are included inside them recursively and bundle them together into into one file for each entry point and will do it's best to minify the code along the way.

As a convention it's recommended to import all your vendor dependencies in to `vendor.js` while all your own code is stored in `index.js` This will help with caching as your vendor files are less likely to change.

### Media Files

This project also comes pre-configured to load in media files. To include them you just have to import them in to your project like you would Javascript and Webpack will take of adding them to the deployment version of the app. All Media files bundled this will be placed in a assets version directory.
[Click here to read more about file loader.](https://github.com/webpack-contrib/file-loader)

By default supported media types are: png | jpg | gif | mp3 | ogg | mp4

## Templates

Using `html.config.js` We are able modify params or swap out templates based on the needs of the project without effecting the rest of the project. `html.config.js` Contains comments on all available options.
