/**
 * @callback textFn
 * @param {string} text
 * @returns {void}
 */

/**
 * @typedef {object} State
 * @property {string} fullText Entire string from the Boop editor.
 * @property {string} selection The currently selected text.
 * @property {string} text Behaves like `selection` if there is one or more selected piece of text, otherwise it will behave like `fullText`.
 * @property {textFn} insert Insert text at the cursor position. If there is selected text, it will be replaced.
 * @property {textFn} postInfo Present an info message to the Boop toolbar
 * @property {textFn} postError Present an error message to the Boop toolbar
 */
export {};
