# /bin/bash
set -euo pipefail

PKGROOT="./../.dist/"
PKGNAME="GLRepl"
PKGPATH=$PKGROOT$PKGNAME

npm run compile
rm -rf $PKGROOT
mkdir -p $PKGPATH
rsync -av  ./../ $PKGPATH --exclude $PKGROOT
rm -rf $PKGPATH/.git $PKGPATH/.dist $PKGPATH/.github $PKGPATH/.vscode $PKGPATH/javascript $PKGPATH/.gitignore
rm -rf $PKGPATH/lefthook.yml $PKGPATH/code-coverage-results.md $PKGPATH/commitlint.config.js  $PKGPATH/examples/livecode-max/src $PKGPATH/examples/livecode-max/node_modules $PKGPATH/examples/livecode-max/package* $PKGPATH/examples/livecode-max/tsconfig.json
mkdir $PKGPATH/javascript
rsync -av ./dist/* $PKGPATH/javascript
cd $PKGROOT; zip -r $PKGNAME.zip ./$PKGNAME