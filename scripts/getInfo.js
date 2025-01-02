const FILETYPES = {
    json: {
        extension: ".json",
        type: "application/json",
    },
    txt: {
        extension: ".txt",
        type: "text/plain",
    },
    csv: {
        extension: ".csv",
        type: "text/csv",
    }
}

function initialize() {
    const JSONDATA = "./hangman.json";
    getData(JSONDATA).then((data) => {
        const info = processData(data);
        document.getElementById("selType").onchange = () => {changeActivity(info);}
        changeActivity(info);
    });
    document.getElementById("btnCopy").onclick = copyText;
    document.getElementById("btnDownload").onclick = downloadText;
}

async function getData(jsonFile) {
    const response = await fetch(jsonFile);
    const data = await response.json();
    return data;
}

function processData(data) {
    const obj = {}
    for (const category in data) {
        if (Object.prototype.hasOwnProperty.call(data, category)) {
            const list = data[category];
            const newList = [];
            for (const word of list) {
                if(!newList.includes(word)) newList.push(word);
            }
            obj[category] = newList;
        }
    }
    return obj;
}

function changeActivity(info) {
    const txtFileName = document.getElementById("txtFileName");
    const txtOutput = document.getElementById("txtOutput");
    const type = document.getElementById("selType").value;

    let fileName = "hangman" + FILETYPES[type].extension;
    txtFileName.value = fileName;
    txtOutput.value = getText(info, type);
}

function getText(info, type) {
    console.log(info)
    switch (type) {
        case "json":
            return JSON.stringify(info);
        case "txt":
            let txt = [];
            for (const key in info) {
                for (const word of info[key]) {
                    txt.push(word);
                }
            }
            return txt.join("\n");
        case "csv":
            let csv = ["category,word"];
            for (const key in info) {
                for (const word of info[key]) {
                    const line = [key, word].join(",");
                    csv.push(line);
                }
            }
            return csv.join("\n");
    }
}

function copyText() {
    const text = document.getElementById("txtOutput").value;
    navigator.clipboard.writeText(text).then(
        () => {
            console.log("copiado com sucesso");
            alert("copiado com sucesso");
        },
        err => {
            console.error(err);
        }
    );
}

function downloadText() {
    const fileName = document.getElementById("txtFileName").value;
    const text = document.getElementById("txtOutput").value;
    const blob = new Blob([text], { type: "application/json" });
    const downLink = document.createElement("a");
    downLink.download = fileName;
    if (webkitURL != null) {
        downLink.href = webkitURL.createObjectURL(blob);
    } else {
        downLink.href = URL.createObjectURL(blob);
        downLink.onclick = destroyClickedElement;
        downLink.style.display = 'none';
        document.body.appendChild(downLink);
    }
    downLink.click();
}

initialize();