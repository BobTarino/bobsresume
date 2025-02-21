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

    /* Close Button Functionality */

    const closeBtn = document.getElementById("close");

    function onCloseBtnClick() {
        onDisplayEnd();
        dialogueUI.style.display = "none";
        dialogue.innerHTML = "";
        clearInterval(intervalRef);
        closeBtn.removeEventListener("click", onCloseBtnClick); /* recursive; removing function itself within function */
    }

    closeBtn.addEventListener("click", onCloseBtnClick);
}

export function setCamScale(k) {   /* camera scaling */
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        k.camScale(k.vec2(1));
        return;
    }

    k.camScale(k.vec2(1.5)); /* zoom by 1.5 in both x and y transformations */
}