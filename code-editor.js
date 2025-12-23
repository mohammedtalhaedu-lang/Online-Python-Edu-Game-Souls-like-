// ================================
// CODE EDITOR
// Custom Python Code Editor
// ================================

class CodeEditor {
    constructor(textareaId, lineNumbersId) {
        this.textarea = document.getElementById(textareaId);
        this.lineNumbers = document.getElementById(lineNumbersId);

        if (!this.textarea || !this.lineNumbers) return;

        this.init();
    }

    init() {
        // Update line numbers on input
        this.textarea.addEventListener('input', () => this.updateLineNumbers());
        this.textarea.addEventListener('scroll', () => this.syncScroll());
        this.textarea.addEventListener('keydown', (e) => this.handleTab(e));

        // Initial update
        this.updateLineNumbers();
    }

    updateLineNumbers() {
        const lines = this.textarea.value.split('\n');
        const lineCount = lines.length;

        this.lineNumbers.innerHTML = Array.from(
            { length: lineCount },
            (_, i) => i + 1
        ).join('\n');
    }

    syncScroll() {
        this.lineNumbers.scrollTop = this.textarea.scrollTop;
    }

    handleTab(e) {
        // Allow Tab key for indentation
        if (e.key === 'Tab') {
            e.preventDefault();

            const start = this.textarea.selectionStart;
            const end = this.textarea.selectionEnd;
            const value = this.textarea.value;

            // Insert 4 spaces
            this.textarea.value = value.substring(0, start) + '    ' + value.substring(end);

            // Move cursor
            this.textarea.selectionStart = this.textarea.selectionEnd = start + 4;

            this.updateLineNumbers();
        }
    }

    setValue(code) {
        this.textarea.value = code;
        this.updateLineNumbers();
    }

    getValue() {
        return this.textarea.value;
    }

    clear() {
        this.textarea.value = '';
        this.updateLineNumbers();
    }

    insertAtCursor(text) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const value = this.textarea.value;

        this.textarea.value = value.substring(0, start) + text + value.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + text.length;

        this.updateLineNumbers();
    }

    // Highlight errors (basic implementation)
    highlightError(lineNumber) {
        // Visual indication could be added here
        // For now, just scroll to the error line
        const lines = this.textarea.value.split('\n');
        let charCount = 0;

        for (let i = 0; i < lineNumber - 1 && i < lines.length; i++) {
            charCount += lines[i].length + 1; // +1 for newline
        }

        this.textarea.focus();
        this.textarea.setSelectionRange(charCount, charCount + (lines[lineNumber - 1]?.length || 0));
    }
}

// Utility: Update line numbers (standalone function for backwards compatibility)
function updateLineNumbers() {
    const editor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');

    if (!editor || !lineNumbers) return;

    const lines = editor.value.split('\n');
    const lineCount = lines.length;

    lineNumbers.innerHTML = Array.from(
        { length: lineCount },
        (_, i) => i + 1
    ).join('\n');
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeEditor;
}
