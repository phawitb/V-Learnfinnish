import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
const found = new Map();
function add(text, file) {
 text=text.trim(); if (!/[\u0e00-\u0e7f]/.test(text)) return;
 if (text.includes('\n')) { for(const line of text.split('\n')) add(line,file); return; }
 if (text.includes('|')) { for(const part of text.split('|')) add(part,file); return; }
 if (!found.has(text)) found.set(text,new Set()); found.get(text).add(file);
}
function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,ent.name);if(ent.isDirectory()){if(ent.name!=='i18n')walk(file);continue;}
 if(!/\.(tsx?|json)$/.test(file)||/\.test\./.test(file))continue;
 if(file.endsWith('.json')){const visit=v=>{if(typeof v==='string')add(v,file);else if(v&&typeof v==='object')Object.values(v).forEach(visit)};visit(JSON.parse(fs.readFileSync(file,'utf8')));continue;}
 const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);
 function visit(node){if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)||ts.isTemplateHead(node)||ts.isTemplateMiddle(node)||ts.isTemplateTail(node))add(node.text,file);else if(ts.isJsxText(node))add(node.text.replace(/\s+/g,' '),file); ts.forEachChild(node,visit)} visit(source);
}}
walk('src');
const entries=[...found].map(([text,files])=>({text,files:[...files]}));
fs.writeFileSync('scripts/locale-inventory.json',JSON.stringify(entries,null,2)+'\n');
console.log({entries:entries.length,chars:entries.reduce((n,e)=>n+e.text.length,0)});
for(let i=0;i<3;i++){const part=entries.filter((_,j)=>j%3===i).map(e=>e.text);fs.writeFileSync(`scripts/locale-batch-${i+1}.json`,JSON.stringify(part,null,2)+'\n');}
