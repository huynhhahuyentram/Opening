// ================= VOICE =================
let recognition;
let finalTranscript = "";
let silenceTimer;

function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Browser không hỗ trợ voice!");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "vi-VN"; // hỗ trợ tiếng Việt
    recognition.interimResults = true;
    recognition.continuous = true;

    finalTranscript = "";

    recognition.onstart = () => {
        document.getElementById("voiceStatus").innerText = "🎤 Đang nghe...";
    };

    recognition.onresult = (event) => {
        let interim = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            let transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalTranscript += transcript + " ";
            } else {
                interim += transcript;
            }
        }

        document.getElementById("voiceStatus").innerText =
            "Nghe: " + finalTranscript + interim;

        // reset timer khi người dùng vẫn nói
        clearTimeout(silenceTimer);

        silenceTimer = setTimeout(() => {
            recognition.stop();
            processVoice(finalTranscript);
        }, 2000); // đợi 2s im lặng mới xử lý
    };

    recognition.onend = () => {
        document.getElementById("voiceStatus").innerText += " ✅ Done";
    };

    recognition.start();
}

// ================= PARSE VOICE =================
function processVoice(text) {
    text = text.toLowerCase();

    console.log("VOICE:", text);

    function extract(keyword) {
        let regex = new RegExp(keyword + "\\s*(\\d+)", "i");
        let match = text.match(regex);
        return match ? match[1] : null;
    }

    let map = {
        x: extract("x"),
        y: extract("y"),
        z: extract("z"),
        dx: extract("dx|length"),
        dy: extract("dy|width"),
        dz: extract("dz|height"),
    };

    for (let key in map) {
        if (map[key]) document.getElementById(key).value = map[key];
    }
}

// ================= LOGIC =================
function getOrientation(axis) {
    if (axis === "X") return ["ORI Y is Y and Z is X", "ORI Y is -Y and Z is Z"];
    if (axis === "Y") return ["ORI Y is -X and Z is Y", "ORI Y is -Y and Z is Z"];
    return ["ORI Y is Y and Z is Z", "ORI Y is -Y and Z is Z"];
}

function getVal(id, def = 150) {
    let v = document.getElementById(id).value;
    return v ? parseFloat(v) : def;
}

function getData() {
    return {
        x: parseFloat(x.value || 0),
        y: parseFloat(y.value || 0),
        z: parseFloat(z.value || 0),
        dx: parseFloat(dx.value || 0),
        dy: parseFloat(dy.value || 0),
        dz: parseFloat(dz.value || 0),
        r1: getVal("f1"),
        r2: getVal("f2"),
        r3: getVal("f3"),
        r4: getVal("f4"),
        axis: document.querySelector('input[name="axis"]:checked').value
    };
}

function generateMAC(d) {
    let [ori_eq, ori_ext] = getOrientation(d.axis);

    return `NEW EQUIPMENT
POS X ${d.x}mm Y ${d.y}mm Z ${d.z}mm
${ori_eq}

NEW EXTRUSION${ori_ext}
HEIG ${d.dz}mm

NEW LOOP
NEW VERTEX
FRAD ${d.r1}mm
END
NEW VERTEX
POS X 0mm Y ${d.dy}mm Z 0mm
FRAD ${d.r2}mm
END
NEW VERTEX
POS X ${d.dx}mm Y ${d.dy}mm Z 0mm
FRAD ${d.r3}mm
END
NEW VERTEX
POS X ${d.dx}mm Y 0mm Z 0mm
FRAD ${d.r4}mm
END
END
END`;
}

// ================= ACTION =================
function saveFile() {
    let content = generateMAC(getData());
    let blob = new Blob([content]);
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "opening.mac";
    a.click();
}

function autoSave() {
    saveFile();
}

function openHelp() {
    window.open("https://drive.google.com/file/d/14NNDzXSCG63m1yQZb51tZhrZfd5k8KPf/view");
}

function resetForm() {
    document.querySelectorAll("input").forEach(i => {
        if (i.type === "radio") {
            i.checked = i.value === "Z";
        } else {
            i.value = "";
        }
    });
}
