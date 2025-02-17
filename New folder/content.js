console.log("Hello from content.js");




function createAIButton(){
   const button=document.createElement("div");
   button.className="T-I J-J5-Ji aoO T-I-atl L3";
    button.style.marginRight="8px";
    button.innerHTML="AI Reply";
    button.setAttribute("role","button");
    button.setAttribute("data-tooltip","Generate AI Reply");
    return button;
}


function getEmailContent(){
    const selectors=[
        '.h7',
        '.a3s.aiL',
        'gmail_quote',
        '.[role="presentation"]'
     ];
     for(const selector of selectors){
         const content=document.querySelector(selector);
         if(content){
             return content.innerText.trim();
         }
         return '';     
     }
}


function findComposeToolbar(){
    const selectors=[
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up',
     ];
     for(const selector of selectors){
         const toolbar=document.querySelector(selector);
         if(toolbar){
             return toolbar;
         }
         return null;     
     }
}


function injectButton(){
    const existingButton=document.querySelector(".ai-reply-button");
    if(existingButton)existingButton.remove();

    const toolbar=findComposeToolbar();
    if(!toolbar){
        console.log("Compose toolbar not found");
        return;
    }
    console.log("Compose toolbar found");
    const button=createAIButton();
    button.classList.add("ai-reply-button");

    button.addEventListener("click", async () => {
        try {
            button.innerHTML = "Generating...";
            button.disabled = true;

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:7070/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to generate AI reply: ${response.status}`);
            }
            const generatedReply = await response.text();

            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.log("Compose box not found");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to generate AI reply");
        } finally {
            button.innerHTML = "AI Reply";
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}


const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElement = addedNodes.some((node) => {
      return node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh,.btC,[role="dialog"]') || node.querySelector('.aDh,.btC,[role="dialog"]'));
    });
    if(hasComposeElement){
        console.log("Compose window detected");
        setTimeout(injectButton, 500);
    }
  });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});