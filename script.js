// ================= SPEAK =================
function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "vi-VN";
    msg.rate = 1;
    msg.pitch = 1;
    speechSynthesis.cancel(); // tránh chồng tiếng
    speechSynthesis.speak(msg);
}

// ================= VOICE =================
let recognition;
let silenceTimer;
let finalText = "";

function startVoice() {
    speak("Xin chào, tôi có thể giúp gì cho bạn");

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SR) {
        alert("Trình duyệt không hỗ trợ voice!");
        return;
    }

    recognition = new SR();
    recognition.lang = "vi-VN";
    recognition.continuous = true;
    recognition.interimResults = true;

    finalText = "";

    recognition.onresult = (e) => {
        let interim = "";

        for (let i = e.resultIndex; i < e.results.length; i++) {
            let t = e.results[i][0].transcript;

            if (e.results[i].isFinal) {
                finalText += " " + t;
            } else {
                interim += t;
            }
        }

        // reset timer khi còn nói
        clearTimeout(silenceTimer);

        silenceTimer = setTimeout(() => {
            recognition.stop();
            processVoice(finalText);
        }, 3000); // ⬅ tăng delay để nói tự nhiên hơn
    };

    recognition.onerror = (e) => {
        console.error(e);
        speak("Có lỗi xảy ra, vui lòng thử lại");
    };

    recognition.start();
}

// ================= NLP =================
function processVoice(text) {
    text = text.toLowerCase();

    console.log("VOICE:", text);

    // chuẩn hóa tiếng Việt
    text = text
        .replace(/dài/g, "length")
        .replace(/rộng/g, "width")
        .replace(/cao/g, "height");

    const patterns = [
        { key: "x", id: "x" },
        { key: "y", id: "y" },
        { key: "z", id: "z" },
        { key: "length", id: "dx" },
        { key: "width", id: "dy" },
        { key: "height", id: "dz" }
    ];

    patterns.forEach(p => {
        let regex = new RegExp(`${p.key}[^0-9-]*(\\d+)`);
        let match = text.match(regex);

        if (match) {
            document.getElementById(p.id).value = match[1];
        }
    });

    speak("File của bạn đã được tạo xong");

    setTimeout(() => {
        saveFile();
    }, 800);
}

// ================= GENERATE =================
function getVal(id, def = 150) {
    let v = document.getElementById(id).value;
    return v ? parseFloat(v) : def;
}

function getData() {
    return {
        x: +x.value || 0,
        y: +y.value || 0,
        z: +z.value || 0,
        dx: +dx.value || 0,
        dy: +dy.value || 0,
        dz: +dz.value || 0,
        r1: getVal("f1"),
        r2: getVal("f2"),
        r3: getVal("f3"),
        r4: getVal("f4"),
        axis: document.querySelector('input[name="axis"]:checked').value
    };
}

function generateMAC(d) {
    return `POS X ${d.x} Y ${d.y} Z ${d.z}
SIZE ${d.dx} ${d.dy} ${d.dz}
RADIUS ${d.r1} ${d.r2} ${d.r3} ${d.r4}
AXIS ${d.axis}`;
}

// ================= SAVE =================
function saveFile() {
    let blob = new Blob([generateMAC(getData())], { type: "text/plain;charset=utf-8" });

    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "opening.mac";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// ================= RESET =================
function resetForm() {
    // Position
    x.value = 0;
    y.value = 0;
    z.value = 0;

    // Dimension
    dx.value = "";
    dy.value = "";
    dz.value = "";

    // Radius
    f1.value = 150;
    f2.value = 150;
    f3.value = 150;
    f4.value = 150;

    // Axis default
    document.querySelector('input[value="Z"]').checked = true;
}
