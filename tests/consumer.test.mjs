import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as esm from 'nexus-mobile-kit';
import {detectFeatures} from 'nexus-mobile-kit/features';
const cjs=createRequire(import.meta.url)('nexus-mobile-kit');

for(const [format,library] of [['ESM',esm],['CommonJS',cjs]]) {
 test(format+' package entry preserves server-safe feature detection',()=>assert.deepEqual(library.detectFeatures({}),detectFeatures({})));
 test(format+' package entry renders without a consumer JSX loader',()=>{
  const html=renderToStaticMarkup(React.createElement(library.ButtonBar,{buttons:[{label:'Synthetic action',disabled:true}]}));
  assert.match(html,/Synthetic action/);assert.match(html,/<button/);assert.match(html,/disabled/);
 });
}
