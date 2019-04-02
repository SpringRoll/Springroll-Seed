# Springroll Seed - PIXI4

Developers should use SpringRoll Seed as a starting point for games projects. It comes bundled with Webpack, Babel, and a few node modules to streamline development. This versions comes with an example of how to implement a simple Springroll game using PIXI4

## Setup

```
$ git clone -o template https://github.com/SpringRoll/Springroll-Seed.git my_project

$ cd my_project

$ npm install
```
From here you can add your own remote origin by typing `git remote add origin URL.git`.

__Note__ To receive Springroll-Seed updates, use 'git pull template'.

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

Webpack looks for an entry point, which in Seed's case is `index.js`.

An entry point includes and bundles any code or styles included inside itself recursively and bundles them together into one file. From there, Webpack will attempt to minify the code along the way as well as split it into multiple files when needed.

### Media Files

This project also comes pre-configured to load in media files, which you can achieve by importing them into your project similarly to Javascript. Webpack will handle adding them to the deployment version of the app in an assets version directory.
[Click here to read more about file loader.](https://github.com/webpack-contrib/file-loader)

By default, supported media types are: png | jpg | gif | mp3 | ogg | mp4

### Static Files

In the case where you wish to include static files in your project, SpringRoll Seed has the option to automatically add them to your build. Place any static files in the `static` directory and they will be included to the root of your release directory with the same structure as in the `static` directory.

These files will not be modified by Webpack's build process.

During development you can access these files just as you would during production. You do not need to include the `static` directory as part of the file path.

```html
<link rel="icon" href="favicon.ico"/> <!-- Correct -->
<link rel="icon" href="../static/favicon.ico"/> <!-- Incorrect -->
<link rel="icon" href="/static/favicon.ico"/> <!-- Incorrect -->
```

### Dev server

SpringRoll-Seed comes packaged with its own dev server that auto-reloads whenever a developer makes changes to the code base.

To start using it, just run `npm start` and it will be available at `127.0.0.1:8080`/`localhost:8080`

## Templates

Using `html.config.js`, we can modify params or swap out templates based on the needs of the project without affecting the rest of the project. `html.config.js` contains comments on all available options.
