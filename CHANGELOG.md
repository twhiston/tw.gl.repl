# tw.gl.repl changelog

## [1.0.0-beta.8](https://github.com/twhiston/tw.gl.repl/compare/1.0.0-beta.7...1.0.0-beta.8) (2023-10-21)


### Bug Fixes

* c74 feedback adjustments ([#15](https://github.com/twhiston/tw.gl.repl/issues/15)) ([51dfec4](https://github.com/twhiston/tw.gl.repl/commit/51dfec48305f53a137a05a3154b0d4796fbc246e))

## [1.0.0-beta.7](https://github.com/twhiston/tw.gl.repl/compare/1.0.0-beta.6...1.0.0-beta.7) (2023-09-09)

## [1.0.0-beta.6](https://github.com/twhiston/tw.gl.repl/compare/1.0.0-beta.5...1.0.0-beta.6) (2023-09-07)


### Bug Fixes

* fix polarity of ignore_keys option and shortcode, add to help file ([#14](https://github.com/twhiston/tw.gl.repl/issues/14)) ([3571ba9](https://github.com/twhiston/tw.gl.repl/commit/3571ba9423005d6da5b9557420b090a3858c9baa))

## [1.0.0-beta.5](https://github.com/twhiston/tw.gl.repl/compare/1.0.0-beta.4...1.0.0-beta.5) (2023-09-06)


### Features

* add package-info.json ([#13](https://github.com/twhiston/tw.gl.repl/issues/13)) ([41ec4de](https://github.com/twhiston/tw.gl.repl/commit/41ec4deccadf0f5fc32c6c1a5ba10a419d522ae7))

## [1.0.0-beta.4](https://github.com/twhiston/tw.gl.repl/compare/1.0.0-beta.3...1.0.0-beta.4) (2023-09-04)

### Features

* **formatters:** add formatter to remove comment lines from output and activate by default ([#9](https://github.com/twhiston/tw.gl.repl/issues/9)) ([8338b12](https://github.com/twhiston/tw.gl.repl/commit/8338b12fe0c3335e3045c633e71302c05becab14))

* improved help ([#11](https://github.com/twhiston/tw.gl.repl/issues/11)) ([db6a17d](https://github.com/twhiston/tw.gl.repl/commit/db6a17d11c9cde270b9da30e6c989840995dc364))

* feat: expose jumpLine and jumpWord functions to router

### Bug Fixes

* full working windows config as default ([#10](https://github.com/twhiston/tw.gl.repl/issues/10)) ([265c8bb](https://github.com/twhiston/tw.gl.repl/commit/265c8bbcaf461d8cb1cf41f97ae2183e1f237f13))

* fix: fixes issue with scaling not being properly applied on text set commands

* fix: fix gotoIndex bug due to variable overloading

* fix: fix jump word bindings to key which appears on default mac keyboard

* refactor: change package name to GLRepl

* fix: fix keypress processor destruction on config load to ensure preattached functions work

* ci: change artifact path to new package name

* ci: remove cruft from release

* refactor: refactor glrepl variable names and associated documentation

* fix: fix bug with cursor line indices going to -1

* refactor: remove lines function in favor of length and add minimum index function

* fix: fix issue with running the last line of the buffer in ephemeral mode

* refactor(extras-patch): refactor example patch names and fix issue with livecode example when patcher deleted

* docs: update docs and build out overview patch

## [1.0.0-beta.3](https://github.com/twhiston/th.gl.texteditor/compare/1.0.0-beta.2...1.0.0-beta.3) (2023-05-16)

## [1.0.0-beta.2](https://github.com/twhiston/th.gl.texteditor/compare/1.0.0-beta.1...1.0.0-beta.2) (2023-05-16)

## [1.0.0-beta.1](https://github.com/twhiston/th.gl.texteditor/compare/1.0.0-beta.0...1.0.0-beta.1) (2023-05-11)

### Features

* add supress_output function to stop message output, use with output_matrix for mercury drop-in ([5c50ec3](https://github.com/twhiston/th.gl.texteditor/commit/5c50ec364c58185c036ba26a2992cac758163003))