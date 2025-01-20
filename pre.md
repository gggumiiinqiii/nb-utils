nb-utils
### check you registry
// show your rigistry
npm config get registry
// shoult set default npm registry to publish
npm config set registry https://registry.npmjs.org/
// set npm registry as taobao regisrty
npm config set registry https://registry.npmmirror.com/
### how to publish
//  v1.0.0->v1.0.1
npm version patch 
//  v1.0.0->v1.1.0
npm version minor
//  v1.0.0->v2.0.0
npm version major

npm publish
###  how to test
npm run build ->go to dist to run