function getOrientation(axis) {
    if (axis === "X")
        return ["ORI Y is Y and Z is X", "ORI Y is -Y and Z is Z"];
    if (axis === "Y")
        return ["ORI Y is -X and Z is Y", "ORI Y is -Y and Z is Z"];
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

function saveFile() {
    let content = generateMAC(getData());

    let blob = new Blob([content], { type: "text/plain" });
    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = "opening.mac";
    a.click();
}

function autoSave() {
    saveFile(); // web không ghi trực tiếp ổ C nên dùng download
}

function openHelp() {
    window.open("https://drive.google.com/file/d/14NNDzXSCG63m1yQZb51tZhrZfd5k8KPf/view");
}

function resetForm() {
    document.querySelectorAll("input").forEach(i => {
        if (i.type !== "radio") i.value = "";
    });
}
