// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
  copyAssets: {
    src: ['{{SRC}}/assets/**/*'],
    dest: '{{WWW}}/assets'
  },
  copyIndexContent: {
    src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
    dest: '{{WWW}}'
  },
  copyFonts: {
    src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyPolyfills: {
    src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
    dest: '{{BUILD}}'
  },
  copySwToolbox: {
    src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
    dest: '{{BUILD}}'
  },
  copyAxios: {
    src: ['node_modules/axios/dist/axios.min.js'], 
    dest: '{{BUILD}}'
  },
  copyDebug: {
    src: ['{{SRC}}/lib/debug.js'], 
    dest: '{{BUILD}}'
  },
  copyPouch: {
    src: ['node_modules/pouchdb/dist/pouchdb.min.js'], 
    dest: '{{BUILD}}'
  },
  copySqlite: {
    src: ['node_modules/pouchdb-adapter-cordova-sqlite/dist/pouchdb.cordova-sqlite.min.js'], 
    dest: '{{BUILD}}'
  }
}
