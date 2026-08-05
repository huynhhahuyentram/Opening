const c = document.getElementById("view");
const ctx = c.getContext("2d");

let ORI = "Z";

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

let L=+dx.value;
let W=+dy.value;
let H=+dz.value;

ctx.clearRect(0,0,c.width,c.height);

/* AUTO SCALE */
let max=Math.max(L,W,H,1);
let scale=150/max;

/* BASE POINT */
let x=200,y=150;

let l=L*scale;
let w=W*scale;
let h=H*scale;

/* PLAN */
ctx.strokeStyle="#000";

if(ORI==="Z"){
rect3D(x,y,l,w,h);
}
if(ORI==="X"){
rect3D(x,y,w,h,l);
}
if(ORI==="Y"){
rect3D(x,y,l,h,w);
}

/* TEXT */
ctx.fillText("L="+L,10,20);
ctx.fillText("W="+W,10,35);
ctx.fillText("H="+H,10,50);
}

/* DRAW BOX */
function rect3D(x,y,l,w,h){

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

/* VOICE AI */
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

r.onend=()=>{
process(text);
};

setTimeout(()=>r.stop(),5000);

r.start();
}

/* NLP SIMPLE */
function process(t){

log("👤 "+t);

let nums=t.match(/\d+/g);

if(nums){
dx.value=nums[0]||0;
dy.value=nums[1]||0;
dz.value=nums[2]||0;
}

draw();

speak("File của bạn đã được tạo xong");

saveFile();
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
USRCOG ( X ( 0 ) Y ( 0 ) Z ( 0 ) )
USRWCO ( X ( 0 ) Y ( 0 ) Z ( 0 ) )
POS X ${px.value}mm Y ${py.value}mm Z ${pz.value}mm
ORI Y is -X and Z is Y
BUIL false
DSCO unset
PTSP unset
INSC unset

NEW EXTRUSION
ORI Y is -Y and Z is Z
LEVE 0 2
HEIG ${dz.value}mm

NEW LOOP

NEW VERTEX
FRAD ${r1.value}mm
END

NEW VERTEX
POS X 0mm Y ${dy.value}mm Z 0mm
FRAD ${r2.value}mm
END

NEW VERTEX
POS X ${dx.value}mm Y ${dy.value}mm Z 0mm
FRAD ${r3.value}mm
END

NEW VERTEX
POS X ${dx.value}mm Y 0mm Z 0mm
FRAD ${r4.value}mm
END

END
END
END
END`;

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

/* AUTO DRAW */
document.querySelectorAll("input").forEach(i=>{
i.addEventListener("input",draw);
});

draw();
