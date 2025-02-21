export function displayDialogue(text, onDisplayEnd) { /* onDisplayEnd function will run after text is displayed*/
    const dialogueUI = document.getElementById("textbox-container"); /* constant for dialogue textbox container */
    const dialogue = document.getElementById("dialogue"); /* constant for dialogue itself */

    dialogueUI.style.display = "block"; /* textbox container becomes visible */

    /*text scrolling functionality */
    let index = 0;
    let currentText = ""; 
    const intervalRef = setInterval(() => {
        if (index < text.length) {
            currentText += text[index]; /* blank currentText default will updend characters of text */
            dialogue.innerHTML = currentText;
            index++; /* repeats until condition is clear */
            return;
        }

        clearInterval(intervalRef); 
    },5);
}