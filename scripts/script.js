const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let word;

function initialize() {
    const url = "./hangman.json";
    getData(url).then((data) => {
        createCategorySelector(Object.keys(data).sort());
        document.getElementById("options").hidden = false;
        document.getElementById("btnPlay").onclick = () => {
            const category = document.getElementById("selCategories").value;
            play(data[category]);
        }
    });
}

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function createCategorySelector(categories) {
    const selector = document.createElement("select");
    document.getElementById("divSelCategory").appendChild(selector);
    selector.className = "form-select";
    selector.id = "selCategories";
    for (const category of categories) {
        const opt = document.createElement("option");
        selector.appendChild(opt);
        opt.value = category;
        opt.innerText = category;
    }
}

function play(words) {
    const divWord = document.getElementById("divWord");
    divWord.innerHTML = "";
    const wordElement = document.createElement("h1");
    wordElement.className = "display-5 word text-center";
    wordElement.id = "word";
    divWord.appendChild(wordElement);
    const divImg = document.getElementById("divImg");
    divImg.innerHTML = "";
    const img = document.createElement("img");
    img.className = "d-block mx-auto img-thumbnail img";
    divImg.appendChild(img);
    word = new Word(pickWord(words), wordElement, img);
    createLetters();
    document.getElementById("options").hidden = true;
    document.getElementById("game").hidden = false;
}

function pickWord(words) {
    const dice = Math.floor(Math.random() * words.length);
    return words[dice].toUpperCase();
}

function createLetters() {
    const divButtons = document.getElementById("divButtons");
    divButtons.innerHTML = "";
    for (const letter of ALPHABET) {
        const col = document.createElement("div");
        col.className = "col-auto mx-auto my-1";
        divButtons.appendChild(col);
        const btn = document.createElement("button");
        btn.className = "btn btn-secondary btn-lg btn-letter";
        btn.innerText = letter;
        btn.value = letter;
        btn.onclick = () => {
            btn.disabled = true;
            if (word.guessLetter(btn.value)) gameOver();
        };
        col.appendChild(btn);
    }
}

function gameOver() {
    document.getElementById("options").hidden = false;
    document.getElementById("divButtons").innerHTML = "";
}

initialize();