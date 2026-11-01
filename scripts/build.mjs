import {build} from 'esbuild';
// Same verified dual-format build pattern as nexus-ui-components.
const shared={entryPoints:['index.js'],bundle:true,loader:{'.js':'jsx'},jsx:'transform',platform:'neutral',target:'es2019',external:['react'],legalComments:'eof'};
await build({...shared,format:'esm',outfile:'dist/index.mjs'});
await build({...shared,format:'cjs',outfile:'dist/index.cjs'});
