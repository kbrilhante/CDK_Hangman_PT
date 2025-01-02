class Word {
    constructor(word, wordElement, imgElement) {
        this.wordElement = wordElement;
        this.imgElement = imgElement;
        this.word = word;
        this.blanks = "";
        this._setBlanks();
        this.lives = 10;
        this._showBlanks();
        this._showImage();
    }

    _setBlanks() {
        for (let i = 0; i < this.word.length; i++) {
            const char = this.word[i];
            this.blanks += ALPHABET.includes(char) ?  "_" : char;
        }
    }

    _showBlanks() {
        this.wordElement.innerText = this.blanks;
    }

    _showImage(win = false) {
        this.imgElement.src = win ? "./img/yay.png" : "./img/" + this.lives + ".png";
    }

    guessLetter(letter) {
        let gameOver = false;
        let youWin = false;
        if (this.word.includes(letter)) {
            this._revealLetter(letter);
            youWin = !this.blanks.includes("_");
            gameOver = youWin;
        } else {
            this.lives--;
            gameOver = this.lives === 0;
            if (gameOver) {
                this.blanks = this.word;
                this._showBlanks();
            }
        }
        this._showImage(youWin);
        return gameOver;
    }

    _revealLetter(letter) {
        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] == letter) {
                this._replaceBlankAt(i, letter);
            }
        }
        this._showBlanks();
    }
    _replaceBlankAt(index, letter) {
        let sub = this.blanks.substring(0, index);
        sub += letter;
        sub += this.blanks.substring(index + 1);
        this.blanks = sub;
    }
}