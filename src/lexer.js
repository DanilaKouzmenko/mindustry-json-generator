function isWhitespace(ch) {
    return ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r';
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

function isValidIdentifierStart(ch) {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_';
}

function isValidIdentifierPart(ch) {
    return isValidIdentifierStart(ch) || isDigit(ch) || ch === '-';
}

function Lexer(input) {
    this.input = input;
    this.position = 0;
    this.currentChar = this.input[this.position];
}

Lexer.prototype.advance = function() {
    this.position++;
    if (this.position < this.input.length) {
        this.currentChar = this.input[this.position];
    } else {
        this.currentChar = null;
    }
};

Lexer.prototype.skipWhitespace = function() {
    while (isWhitespace(this.currentChar)) {
        this.advance();
    }
};

Lexer.prototype.getNumber = function() {
    var result = '';
    while (isDigit(this.currentChar) || this.currentChar === '.') {
        result += this.currentChar;
        this.advance();
    }
    return parseFloat(result);
};

Lexer.prototype.getString = function() {
    var result = '';
    this.advance(); // skip opening quote
    while (this.currentChar !== null && this.currentChar !== '"') {
        if (this.currentChar === '\\') {
            this.advance();
            result += this.currentChar;
        } else {
            result += this.currentChar;
        }
        this.advance();
    }
    this.advance(); // skip closing quote
    return result;
};

Lexer.prototype.getIdentifier = function() {
    var result = '';
    while (isValidIdentifierPart(this.currentChar)) {
        result += this.currentChar;
        this.advance();
    }
    return result;
};

Lexer.prototype.getTokens = function() {
    var tokens = [];

    while (this.currentChar !== null) {
        if (isWhitespace(this.currentChar)) {
            this.skipWhitespace();
            continue;
        }

        if (isValidIdentifierStart(this.currentChar)) {
            var identifier = this.getIdentifier();
            if (identifier === 'true') {
                tokens.push({ type: 'true', value: true });
            } else if (identifier === 'false') {
                tokens.push({ type: 'false', value: false });
            } else if (identifier === 'null') {
                tokens.push({ type: 'null', value: null });
            } else {
                tokens.push({ type: 'identifier', value: identifier });
            }
        } else if (isDigit(this.currentChar)) {
            var number = this.getNumber();
            tokens.push({ type: 'number', value: number });
        } else if (this.currentChar === '"') {
            var string = this.getString();
            tokens.push({ type: 'string', value: string });
        } else if (this.currentChar === '{') {
            tokens.push({ type: 'punctuation', value: '{' });
            this.advance();
        } else if (this.currentChar === '}') {
            tokens.push({ type: 'punctuation', value: '}' });
            this.advance();
        } else if (this.currentChar === '[') {
            tokens.push({ type: 'punctuation', value: '[' });
            this.advance();
        } else if (this.currentChar === ']') {
            tokens.push({ type: 'punctuation', value: ']' });
            this.advance();
        } else if (this.currentChar === ',') {
            tokens.push({ type: 'punctuation', value: ',' });
            this.advance();
        } else if (this.currentChar === ':') {
            tokens.push({ type: 'punctuation', value: ':' });
            this.advance();
        } else {
            throw new Error('Invalid character: ' + this.currentChar);
        }
    }

    tokens.push({ type: 'eof', value: null });
    return tokens;
};