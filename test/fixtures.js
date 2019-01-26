"use strict";

const html = ()=>{
return `<!DOCTYPE html>
<html lang="en" class="red">
</html>
`} 
const css = ()=>{
return `.red { color: red; }
.blue { color: blue; }
`
} 
const sss = ()=>{
return `.a
    color: red`    
}
exports.html = html;
exports.css = css;
exports.sss = sss;