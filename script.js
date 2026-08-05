// ================= SPEAK =================
function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "vi-VN";
    speechSynthesis.speak(msg);
}

// ================= VOICE =================
let recognition;
let silenceTimer;
let finalText = "";

function startVoice() {
    speak("Xin chào, tôi có thể giúp gì cho bạn");

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SR();

    recognition.lang = "vi-VN";
    recognition.continuous = true;
    recognition.interimResults = true;

    finalText = "";

    recognition.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
            let t = e.results[i][0].transcript;
            if (e.results[i].isFinal) finalText += t;
        }

        clearTimeout(silenceTimer);
        silenceTimer = setTimeout(() => {
            recognition.stop();
            processVoice(finalText);
        }, 2500);
    };

    recognition.start();
}

// ================= NLP =================
function processVoice(text) {
    text = text.toLowerCase();

    const map = [
        {k:["x"], id:"x"},
        {k:["y"], id:"y"},
        {k:["z"], id:"z"},
        {k:["length","dài"], id:"dx"},
        {k:["width","rộng"], id:"dy"},
        {k:["height","cao"], id:"dz"}
    ];

    map.forEach(p=>{
        p.k.forEach(k=>{
            let m = text.match(new RegExp(k+"[^0-9]*(\\d+)"));
            if(m) document.getElementById(p.id).value = m[1];
        });
    });

    speak("File của bạn đã được tạo xong");
    saveFile();
}

// ================= GENERATE =================
function getVal(id, def=150){
    let v=document.getElementById(id).value;
    return v?parseFloat(v):def;
}

function getData(){
return{
x:+x.value||0,
y:+y.value||0,
z:+z.value||0,
dx:+dx.value||0,
dy:+dy.value||0,
dz:+dz.value||0,
r1:getVal("f1"),
r2:getVal("f2"),
r3:getVal("f3"),
r4:getVal("f4"),
axis:document.querySelector('input[name="axis"]:checked').value
};
}

function generateMAC(d){
return `POS X ${d.x} Y ${d.y} Z ${d.z}
SIZE ${d.dx} ${d.dy} ${d.dz}`;
}

// ================= SAVE =================
function saveFile(){
let blob=new Blob([generateMAC(getData())]);
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="opening.mac";
a.click();
}

// ================= RESET =================
function resetForm(){
x.value=0;
y.value=0;
z.value=0;

dx.value="";
dy.value="";
dz.value="";

f1.value=150;
f2.value=150;
f3.value=150;
f4.value=150;

document.querySelector('input[value="Z"]').checked=true;
}
