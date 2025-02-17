// console.log("Hello from content.js");


// function createAIButton(){
//    const button=document.createElement("div");
//    button.className="T-I J-J5-Ji aoO T-I-atl L3";
//     button.style.marginRight="8px";
//     button.innerHTML="AI Reply";
//     button.setAttribute("role","button");
//     button.setAttribute("data-tooltip","Generate AI Reply");
//     button.style.borderRadius = "30px";
//     return button;
// }


// function getEmailContent(){
//     const selectors=[
//         '.h7',
//         '.a3s.aiL',
//         'gmail_quote',
//         '.[role="presentation"]'
//      ];
//      for(const selector of selectors){
//          const content=document.querySelector(selector);
//          if(content){
//              return content.innerText.trim();
//          }
//          return '';     
//      }
// }


// function findComposeToolbar(){
//     const selectors=[
//         '.btC',
//         '.aDh',
//         '[role="toolbar"]',
//         '.gU.Up',
//      ];
//      for(const selector of selectors){
//          const toolbar=document.querySelector(selector);
//          if(toolbar){
//              return toolbar;
//          }
//          return null;     
//      }
// }


// function injectButton(){
//     const existingButton=document.querySelector(".ai-reply-button");
//     if(existingButton)existingButton.remove();

//     const toolbar=findComposeToolbar();
//     if(!toolbar){
//         console.log("Compose toolbar not found");
//         return;
//     }
//     console.log("Compose toolbar found");
//     const button=createAIButton();
//     button.classList.add("ai-reply-button");

//     button.addEventListener("click", async () => {
//         try {
//             button.innerHTML = "Generating...";
//             button.disabled = true;

//             const emailContent = getEmailContent();
//             const response = await fetch('http://localhost:7070/api/email/generate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     emailContent: emailContent,
//                     tone: "professional"
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to generate AI reply: ${response.status}`);
//             }
//             const generatedReply = await response.text();

//             const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
//             if (composeBox) {
//                 composeBox.focus();
//                 document.execCommand('insertText', false, generatedReply);
//             } else {
//                 console.log("Compose box not found");
//             }
//         } catch (err) {
//             console.error(err);
//             alert("Failed to generate AI reply");
//         } finally {
//             button.innerHTML = "AI Reply";
//             button.disabled = false;
//         }
//     });
//     toolbar.insertBefore(button, toolbar.firstChild);
// }


// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     const addedNodes = Array.from(mutation.addedNodes);
//     const hasComposeElement = addedNodes.some((node) => {
//       return node.nodeType === Node.ELEMENT_NODE &&
//         (node.matches('.aDh,.btC,[role="dialog"]') || node.querySelector('.aDh,.btC,[role="dialog"]'));
//     });
//     if(hasComposeElement){
//         console.log("Compose window detected");
//         setTimeout(injectButton, 500);
//     }
//   });
// });

// observer.observe(document.body, {
//     childList: true,
//     subtree: true
// });


// console.log("Hello from content.js");

// function createButton(label, tooltip, className) {
//     const button = document.createElement("div");
//     button.className = "T-I J-J5-Ji aoO T-I-atl L3 " + className;
//     button.style.marginRight = "8px";
//     button.innerHTML = label;
//     button.setAttribute("role", "button");
//     button.setAttribute("data-tooltip", tooltip);
//     button.style.borderRadius = "30px";
//     return button;
// }

// function getEmailContent() {
//     const selectors = ['.h7', '.a3s.aiL', 'gmail_quote', '[role="presentation"]'];
//     for (const selector of selectors) {
//         const content = document.querySelector(selector);
//         if (content) {
//             return content.innerText.trim();
//         }
//     }
//     return '';
// }

// function findComposeToolbar() {
//     const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
//     for (const selector of selectors) {
//         const toolbar = document.querySelector(selector);
//         if (toolbar) {
//             return toolbar;
//         }
//     }
//     return null;
// }

// function injectButton() {
//     const existingButton = document.querySelector(".ai-reply-button");
//     if (existingButton) existingButton.remove();

//     const toolbar = findComposeToolbar();
//     if (!toolbar) {
//         console.log("Compose toolbar not found");
//         return;
//     }
//     console.log("Compose toolbar found");

//     const aiButton = createButton("AI Reply", "Generate AI Reply", "ai-reply-button");
//     const speechButton = createButton("🎤 Speech", "Convert speech to text", "speech-to-text-button");

//     aiButton.addEventListener("click", async () => {
//         try {
//             aiButton.innerHTML = "Generating...";
//             aiButton.disabled = true;

//             const emailContent = getEmailContent();
//             const response = await fetch('http://localhost:7070/api/email/generate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     emailContent: emailContent,
//                     tone: "professional"
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to generate AI reply: ${response.status}`);
//             }

//             const generatedReply = await response.text();
//             const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
//             if (composeBox) {
//                 composeBox.focus();
//                 document.execCommand('insertText', false, generatedReply + "\n\n(AI Generated Reply)");
//             } else {
//                 console.log("Compose box not found");
//             }
//         } catch (err) {
//             console.error(err);
//             alert("Failed to generate AI reply");
//         } finally {
//             aiButton.innerHTML = "AI Reply";
//             aiButton.disabled = false;
//         }
//     });

//     speechButton.addEventListener("click", () => {
//         if (!('webkitSpeechRecognition' in window)) {
//             alert("Speech recognition not supported in this browser.");
//             return;
//         }

//         const recognition = new webkitSpeechRecognition();
//         recognition.continuous = false;
//         recognition.interimResults = false;
//         recognition.lang = "en-US";

//         recognition.onstart = () => {
//             speechButton.innerHTML = "Listening...";
//             speechButton.disabled = true;
//         };

//         recognition.onresult = (event) => {
//             const transcript = event.results[0][0].transcript;
//             console.log("Recognized Text:", transcript);
//             const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
//             if (composeBox) {
//                 composeBox.focus();
//                 document.execCommand('insertText', false, transcript);
//             }
//         };

//         recognition.onerror = (event) => {
//             console.error("Speech recognition error:", event.error);
//             alert("Speech recognition error. Try again.");
//         };

//         recognition.onend = () => {
//             speechButton.innerHTML = "🎤 Speech";
//             speechButton.disabled = false;
//         };

//         recognition.start();
//     });

//     toolbar.insertBefore(speechButton, toolbar.firstChild);
//     toolbar.insertBefore(aiButton, toolbar.firstChild);
// }

// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         const addedNodes = Array.from(mutation.addedNodes);
//         const hasComposeElement = addedNodes.some((node) => {
//             return node.nodeType === Node.ELEMENT_NODE &&
//                 (node.matches('.aDh,.btC,[role="dialog"]') || node.querySelector('.aDh,.btC,[role="dialog"]'));
//         });
//         if (hasComposeElement) {
//             console.log("Compose window detected");
//             setTimeout(injectButton, 500);
//         }
//     });
// });

// observer.observe(document.body, {
//     childList: true,
//     subtree: true
// });

console.log("Hello from content.js");

function createButton(label, tooltip, className) {
    const button = document.createElement("div");
    button.className = "T-I J-J5-Ji aoO T-I-atl L3 " + className;
    button.style.marginRight = "8px";
    button.innerHTML = label;
    button.setAttribute("role", "button");
    button.setAttribute("data-tooltip", tooltip);
    button.style.borderRadius = "30px";
    return button;
}

function getEmailContent() {
    const selectors = ['.h7', '.a3s.aiL', 'gmail_quote', '[role="presentation"]'];
    const content = [];
    selectors.forEach(selector => {
        const contentElement = document.querySelector(selector);
        if (contentElement) {
            content.push(contentElement.innerText.trim());
        }
    });
    return content.join("\n\n");
}

function findComposeToolbar() {
    const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

function injectButton() {
    const existingButton = document.querySelector(".ai-reply-button");
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Compose toolbar not found");
        return;
    }
    console.log("Compose toolbar found");

    const aiButton = createButton("AI Reply", "Generate AI Reply", "ai-reply-button");
    const summarizeButton = createButton("🔍 Summarize", "Summarize Thread", "summarize-button");
    const speechButton = createButton("🎤 Speech", "Convert speech to text", "speech-to-text-button");

    aiButton.addEventListener("click", async () => {
                try {
                    aiButton.innerHTML = "Generating...";
                    aiButton.disabled = true;
        
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
                        document.execCommand('insertText', false, generatedReply + "\n\n(AI Generated Reply)");
                    } else {
                        console.log("Compose box not found");
                    }
                } catch (err) {
                    console.error(err);
                    alert("Failed to generate AI reply");
                } finally {
                    aiButton.innerHTML = "AI Reply";
                    aiButton.disabled = false;
                }
            });

    summarizeButton.addEventListener("click", async () => {
        try {
            summarizeButton.innerHTML = "Summarizing...";
            summarizeButton.disabled = true;

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:7070/api/email/summer/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailContent })
            });

            if (!response.ok) {
                throw new Error(`Failed to summarize email: ${response.status}`);
            }

            const summarizedContent = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, `Summary:\n\n${summarizedContent}\n\n(AI Generated Summary)`);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to summarize email thread");
        } finally {
            summarizeButton.innerHTML = "🔍 Summarize";
            summarizeButton.disabled = false;
        }
    });

    speechButton.addEventListener("click", () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            speechButton.innerHTML = "Listening...";
            speechButton.disabled = true;
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("Recognized Text:", transcript);
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, transcript);
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            alert("Speech recognition error. Try again.");
        };

        recognition.onend = () => {
            speechButton.innerHTML = "🎤 Speech";
            speechButton.disabled = false;
        };

        recognition.start();
    });

    toolbar.insertBefore(speechButton, toolbar.firstChild);
    toolbar.insertBefore(summarizeButton, toolbar.firstChild);
    toolbar.insertBefore(aiButton, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElement = addedNodes.some((node) => {
            return node.nodeType === Node.ELEMENT_NODE &&
                (node.matches('.aDh,.btC,[role="dialog"]') || node.querySelector('.aDh,.btC,[role="dialog"]'));
        });
        if (hasComposeElement) {
            console.log("Compose window detected");
            setTimeout(injectButton, 500);
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});


