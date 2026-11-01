import test from 'node:test';
import assert from 'node:assert/strict';
import {detectFeatures} from '../features.mjs';

function browser(entries=[]) {
  const data=new Map(entries);
  const localStorage={getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};
  return {scope:{window:{navigator:{userAgent:'Synthetic desktop',maxTouchPoints:0,onLine:true},innerWidth:800,localStorage}},data};
}
test('server-side detection needs no browser globals',()=>assert.deepEqual(detectFeatures({}),{}));
test('storage detection preserves application data and an existing probe key',()=>{
 const {scope,data}=browser([['test','application-value'],['__nexus_mobile_storage_probe__','existing-value']]);
 assert.equal(detectFeatures(scope).hasLocalStorage,true);
 assert.deepEqual([...data],[['test','application-value'],['__nexus_mobile_storage_probe__','existing-value']]);
});
test('a fresh storage probe leaves no key behind',()=>{
 const {scope,data}=browser();assert.equal(detectFeatures(scope).hasLocalStorage,true);assert.equal(data.size,0);
});
test('blocked storage getter fails closed without breaking other detection',()=>{
 const {scope}=browser();Object.defineProperty(scope.window,'localStorage',{get(){throw Error('denied')}});
 const features=detectFeatures(scope);assert.equal(features.hasLocalStorage,false);assert.equal(features.isMediumScreen,true);
});
test('failed writes preserve preexisting values',()=>{
 const {scope,data}=browser([['test','keep']]);scope.window.localStorage.setItem=()=>{throw Error('quota')};
 assert.equal(detectFeatures(scope).hasLocalStorage,false);assert.deepEqual([...data],[['test','keep']]);
});
test('mobile, touch and screen boundaries remain compatible',()=>{
 const {scope}=browser();scope.window.navigator.userAgent='Android Mobile';scope.window.navigator.maxTouchPoints=1;scope.window.innerWidth=639;
 const features=detectFeatures(scope);assert.equal(features.isMobile,true);assert.equal(features.isTablet,false);assert.equal(features.hasTouch,true);assert.equal(features.isSmallScreen,true);
});
