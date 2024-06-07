# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [2.1.0] - unreleased

### Changed

- Pixi: added TerserPlugin options to webpack to drop `console.log` and `console.info` in production builds 
- Pixi: added TerserPlugin options to webpack to maintain function names in debug builds

- Phaser: added TerserPlugin options to webpack to drop `console.log` and `console.info` in production builds 
- Phaser: added TerserPlugin options to webpack to maintain function names in debug builds

- CreateJS: added TerserPlugin options to webpack to drop `console.log` and `console.info` in production builds 
- CreateJS: added TerserPlugin options to webpack to maintain function names in debug builds

## [2.0.0] - 2024-05-09

### Changed

- Pixi: Updated pixi.js to 8.1.0
- Pixi: Updated @pixi/sound to 6.0.0
- Pixi: Updated SpringRoll to 2.6.0
- Pixi: Updated feature list and state listeners to follow a standardized set

- Phaser: Updated Phaser to 3.80.1
- Phaser: Fixed warning with SpringRoll listeners
- Phaser: Updated SpringRoll to 2.6.0
- Phaser: Updated feature list and state listeners to follow a standardized set

- CreateJS: Updated SpringRoll to 2.6.0
- CreateJS: Updated feature list and state listeners to follow a standardized set


## [1.3.1] - 2023-03-28

### Fixed

- Removed incorrect references to non-NPM registry in package-lock

### Changed

- Updated package-lock file to most recent versions

## [1.3.0] - 2023-03-13

### Changed

- Added .nvmrc file to set the project target node version
- All seed templates now target node 18.15.0
- Added `<meta name="robots" content="noindex">` to all template html files to prevent Google indexing

## [1.2.0] - 2022-12-21

### Changed

- Updated webpack to 5.75.0
- Updated webpack packages to match v5
- Bump loader-utils from 2.0.3 to 2.0.4
- updated PIXI to 7.0.4
- updated PIXI Sound to 5.0.0

### Added

- Added eslint rules

## [1.1.2] - 2022-12-02

### Changed

- Changed image loading path to relative to resolve loader hang on Windows
- Bump decode-uri-component from 0.2.0 to 0.2.2
- Bump nth-check and renderkid
- Bump follow-redirects from 1.7.0 to 1.15.2
- Bump url-parse from 1.5.1 to 1.5.10
- Bump ansi-html and webpack-dev-server
- Bump ansi-regex from 3.0.0 to 3.0.1
- Bump minimist and mkdirp
- Bump eventsource from 1.0.7 to 1.1.2
- Bump css-what from 2.1.0 to 2.1.3

- Phaser: Added Cordova file system support, using a fork of 3.55.2
- Phaser: Merged in dependency changes

- Pixi:  Merged in dependency changes

- CreateJS:  Merged in dependency changes


## [1.1.1] - 2022-11-14

### Added

- This CHANGELOG

### Changed

- Phaser: Updated version to 3.55.2

