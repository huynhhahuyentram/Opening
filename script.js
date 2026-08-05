const c = document.getElementById("view");
const ctx = c.getContext("2d");

let ORI="Z";

/* ORIENTATION */
function setOri(o){
ORI=o;
document.querySelectorAll(".ori button").forEach(b=>b.classList.remove("active"));
document.getElementById("o"+o.toLowerCase()).classList.add("active");
draw();
}

/* DRAW */
function draw(){

c.width=c.offsetWidth;
c.height=260;

let L=+dx.value||1;
let W=+dy.value||1;
let H=+dz.value||1;

ctx.clearRect(0,0,c.width,c.height);

/* SCALE AUTO */
let max=Math.max(L,W,H);
let scale=150/max;

let cx=300, cy=150;

let l=L*scale;
let w=W*scale;
let h=H*scale;

/* AXIS */
drawAxis();

/* DRAW */
if(ORI==="Z") drawBox(cx,cy,l,w,h);
if(ORI==="X") drawBox(cx,cy,w,h,l);
if(ORI==="Y") drawBox(cx,cy,l,h,w);

/* DIM TEXT */
ctx.font="14px Segoe UI";
ctx.fillText("L="+L, cx+l/2, cy+h+20);
ctx.fillText("W="+W, cx+l+w/2, cy-h/2);
ctx.fillText("H="+H, cx-50, cy+h/2);
}

/* DRAW AXIS */
function drawAxis(){
ctx.lineWidth=2;

/* X đỏ */
ctx.strokeStyle="red";
ctx.beginPath();
ctx.moveTo(40,200);
ctx.lineTo(100,200);
ctx.stroke();
ctx.fillText("X",105,205);

/* Y xanh lá */
ctx.strokeStyle="green";
ctx.beginPath();
ctx.moveTo(40,200);
ctx.lineTo(40,140);
ctx.stroke();
ctx.fillText("Y",30,135);

/* Z xanh dương */
ctx.strokeStyle="blue";
ctx.beginPath();
ctx.moveTo(40,200);
ctx.lineTo(80,160);
ctx.stroke();
ctx.fillText("Z",85,155);
}

/* BOX */
function drawBox(x,y,l,w,h){

ctx.strokeRect(x,y,l,h);

ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x+w,y-w/2);
ctx.lineTo(x+l+w,y-w/2);
ctx.lineTo(x+l,y);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(x+l,y);
ctx.lineTo(x+l+w,y-w/2);
ctx.lineTo(x+l+w,y+h-w/2);
ctx.lineTo(x+l,y+h);
ctx.closePath();
ctx.stroke();
}

/* CHAT */
function log(t){
chat.innerHTML+="<div>"+t+"</div>";
chat.scrollTop=9999;
}

/* VOICE */
function voice(){

speak("Xin chào, tôi có thể giúp gì cho bạn");

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let r=new SR();

r.lang="vi-VN";
r.continuous=true;

let text="";

r.onresult=e=>{
for(let i=e.resultIndex;i<e.results.length;i++){
if(e.results[i].isFinal){
text+=e.results[i][0].transcript;
}
}
};

setTimeout(()=>{
r.stop();
process(text);
},7000);

r.start();
}

/* NLP */
function process(t){

log("👤 "+t);

let nums=t.match(/\d+/g);

if(nums){
dx.value=nums[0]||0;
dy.value=nums[1]||0;
dz.value=nums[2]||0;
}

draw();

speak("Đã cập nhật dữ liệu");
}

/* SPEAK */
function speak(t){
let u=new SpeechSynthesisUtterance(t);
u.lang="vi-VN";
speechSynthesis.speak(u);
}

/* SAVE FILE */
function saveFile(){

let data=`NEW EQUIPMENT
POS X ${px.value}mm Y ${py.value}mm Z ${pz.value}mm

NEW EXTRUSION
HEIG ${dz.value}mm

NEW LOOP

VERTEX ${dx.value} ${dy.value}
`;

let blob=new Blob([data],{type:"text/plain"});
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="opening.mac";
a.click();
}

/* RESET */
function reset(){
px.value=py.value=pz.value=0;
dx.value=dy.value=dz.value=0;
r1.value=r2.value=r3.value=r4.value=150;
draw();
}

/* HELP */
function help(){
window.open("https://drive.google.com/file/d/14NNDzXSCG63m1yQZb51tZhrZfd5k8KPf/view?usp=sharing");
}

document.querySelectorAll("input").forEach(i=>{
i.addEventListener("input",draw);
});

draw();
