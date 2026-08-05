const canvas = document.getElementById("canvas3d");
const ctx = canvas.getContext("2d");

/* DRAW 3D */
function draw(){
    canvas.width = canvas.offsetWidth;
    canvas.height = 230;

    let L = +dx.value || 0;
    let W = +dy.value || 0;
    let H = +dz.value || 0;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    let scale = 0.6;
    let x = 150, y = 120;

    let l=L*scale,w=W*scale,h=H*scale;

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

    /* TEXT */
    ctx.fillText("L="+L, x+l/2, y+h+15);
    ctx.fillText("W="+W, x+l+w/2, y-h/2);
    ctx.fillText("H="+H, x-40, y+h/2);
}

/* INPUT EVENT */
document.querySelectorAll("input").forEach(i=>{
    i.addEventListener("input", draw);
});

/* CHAT */
function log(msg){
    let chat=document.getElementById("chat");
    chat.innerHTML += "<div>"+msg+"</div>";
    chat.scrollTop = chat.scrollHeight;
}

/* SPEAK */
function speak(t){
    let u=new SpeechSynthesisUtterance(t);
    u.lang="vi-VN";
    speechSynthesis.speak(u);
}

/* VOICE */
function startVoice(){
    speak("Xin chào, tôi có thể giúp gì cho bạn");

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    let r=new SR();

    r.lang="vi-VN";
    r.interimResults=true;

    let final="";

    r.onresult=e=>{
        for(let i=e.resultIndex;i<e.results.length;i++){
            if(e.results[i].isFinal){
                final+=e.results[i][0].transcript;
            }
        }

        clearTimeout(window.t);
        window.t=setTimeout(()=>{
            r.stop();
            processVoice(final);
        },2500);
    };

    r.start();
}

/* PROCESS VOICE */
function processVoice(t){
    log("👤 "+t);

    let nums=t.match(/\d+/g);
    if(nums){
        dx.value=nums[0]||0;
        dy.value=nums[1]||0;
        dz.value=nums[2]||0;
    }

    draw();

    speak("Đã tạo file");
    log("🤖 File created");

    setTimeout(saveFile,800);
}

/* SAVE FILE */
function saveFile(){
    let data=`POS ${x.value} ${y.value} ${z.value}
SIZE ${dx.value} ${dy.value} ${dz.value}`;

    let blob=new Blob([data],{type:"text/plain"});
    let a=document.createElement("a");

    a.href=URL.createObjectURL(blob);
    a.download="opening.mac";

    document.body.appendChild(a);
    a.click();

    setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}

/* RESET */
function resetForm(){
    x.value=y.value=z.value=0;
    dx.value=dy.value=dz.value=0;

    f1.value=f2.value=f3.value=f4.value=150;

    document.querySelector('input[value="Z"]').checked=true;

    draw();
}

/* HELP */
function help(){
    window.open("https://drive.google.com","_blank");
}

draw();
