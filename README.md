# Springroll Seed

Developers should use SpringRoll Seed as a starting point for games projects. It comes bundled with Webpack, Babel, and a few node modules to streamline development.

## Setup

```
$ git clone https://github.com/SpringRoll/Springroll-Seed.git my_project

$ cd my_project

$ npm install
```

## Commands

SpringRoll Seed comes with three commands:

### npm start

Starts the dev server

### npm run build:release

Builds app for release

### npm run build:debug

Builds the app without mangling or minifying it for easier debugging

# Dev Flow

## Webpack

SpringRoll Seed uses Webpack as its build process. If you are not familiar with Webpack, here's how it works:

Webpack looks for an entry point, which in Seed's case there are three options: `index.js`, `vendor.js`, and `styles.css`.

All three entry points work the same way. Each entry point includes and bundles any code or styles included inside itself recursively and bundles them together into one file. From there, Webpack will attempt to minify the code along the way.

We recommend importing all of your vendor dependencies into `vendor.js`, while keeping all of your unique code in `index.js`. This helps with caching as your vendor files tend to change infrequently.

### Media Files

This project also comes pre-configured to load in media files, which you can achieve by importing them into your project similarly to Javascript. Webpack will handle adding them to the deployment version of the app in an assets version directory.
[Click here to read more about file loader.](https://github.com/webpack-contrib/file-loader)

By default, supported media types are: png | jpg | gif | mp3 | ogg | mp4

### Dev server

SpringRoll-Seed comes packaged with its own dev server that auto-reloads whenever a developer makes changes to the code base.

To start using it, just run `npm start` and it will be available at `127.0.0.1:8080`/`localhost:8080`

## Templates

Using `html.config.js`, we can modify params or swap out templates based on the needs of the project without affecting the rest of the project. `html.config.js` contains comments on all available options.
