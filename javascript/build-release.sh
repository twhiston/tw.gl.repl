# /bin/sh
npm run compile
rm -rf ./../.dist
mkdir -p ./../.dist/tw.gl.repl
rsync -av  ./../ ./../.dist/tw.gl.repl --exclude ./../.dist
rm -rf ./../.dist/tw.gl.repl/.git ./../.dist/tw.gl.repl/.dist ./../.dist/tw.gl.repl/.github ./../.dist/tw.gl.repl/.vscode ./../.dist/tw.gl.repl/javascript ./../.dist/tw.gl.repl/.gitignore
rm -rf ./../.dist/tw.gl.repl/examples/livecode-max/src ./../.dist/tw.gl.repl/examples/livecode-max/node_modules ./../.dist/tw.gl.repl/examples/livecode-max/package* ./../.dist/tw.gl.repl/examples/livecode-max/tsconfig.json
mkdir ./../.dist/tw.gl.repl/javascript
rsync -av ./dist/* ./../.dist/tw.gl.repl/javascript
cd ./../.dist/; zip -r tw.gl.repl.zip ./tw.gl.repl