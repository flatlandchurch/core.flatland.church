const mri = require('mri');

const prog = mri(process.argv.slice(2), {
  boolean: ['watch'],
});

require('esbuild').build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'public/bundle.js',
  platform: 'browser',
  format: 'iife',
  minify: true,
  watch: prog.watch,
})
