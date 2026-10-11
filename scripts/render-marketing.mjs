import {readFile,writeFile,mkdir} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
export async function renderMarketing(){
 const part=async name=>readFile(new URL(`marketing/${name}.html`,root),'utf8');
 const [head,header,footer,dialogs]=await Promise.all(['head','header','footer','dialogs'].map(part));
 const pages=[['home','', 'Bordeon — Policy changes. Reporting that keeps up.','Bordeon helps specialty MGAs and brokers keep policy changes, premiums and carrier reporting connected and traceable through the same transaction history. Explore the solution and book a demo.'],['architecture','architecture/','Architecture & connectivity — Bordeon','Explore Bordeon’s transaction model, system boundaries and connected insurance workflows.'],['company','company/','Company & partners — Bordeon','Carrier-side experience. Transaction infrastructure for specialty MGAs and brokers. We are seeking industry, technology and strategic partners to grow Bordeon.']];
 for(const [name,path,title,description] of pages){await mkdir(new URL(`dist/${path}`,root),{recursive:true});await writeFile(new URL(`dist/${path}index.html`,root),`<!doctype html><html lang="en"><head>${head}<title>${title}</title><meta name="description" content="${description}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"></head><body>${header}<main id="main">${await part(name)}</main>${footer}${dialogs}</body></html>`);}
}
await renderMarketing();
