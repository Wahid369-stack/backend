import http from 'http';
import fs from 'fs';
// import gfName from './feature.js';
import {generateLovePercent}from './feature.js';
const home=fs.readFileSync('./index.html','utf-8');
console.log(home);

const server=http.createServer((req,res)=>{
  if(req.url=="/about"){
    res.end(`<h1>Love is ${generateLovePercent()}</h1>`);
  }else if(req.url=="/contact"){
    res.end("<h1>Contact page</h1>");
  }else if(req.url=="/"){
    res.end("abc");
  }else 
    res.end("<h1>Page not found</h1>");
    
});
server.listen(5000,()=>{
    console.log("server is listining");
})
