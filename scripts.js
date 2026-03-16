/* --------------------------
   Global Styles & Background
--------------------------- */
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #0d0d0d; /* fallback background */
    color: #fff;
    overflow: hidden;
}

/* Iron Man style animated background */
.ai-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, #1a1a1a 0%, #0d0d0d 100%);
    z-index: -1;
}

/* --------------------------
   Password Overlay
--------------------------- */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(10, 10, 10, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.passwordBox {
    background-color: #1a1a1a;
    padding: 40px;
    border: 2px solid #ff0000;
    border-radius: 15px;
    text-align: center;
}

.passwordBox input {
    width: 80%;
    padding: 10px;
    margin-top: 15px;
    border-radius: 5px;
    border: 1px solid #555;
    background-color: #0d0d0d;
    color: #fff;
}

.passwordBox button {
    margin-top: 15px;
    padding: 10px 20px;
    border: none;
    background-color: #ff0000;
    color: #fff;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
}

.passwordBox .error {
    color: #ff5555;
    margin-top: 10px;
}

/* --------------------------
   AI Chat Container
--------------------------- */
#aiInterface.hidden {
    display: none;
}

#chatContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100vh;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

#messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
}

.message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    max-width: 80%;
}

.message.user {
    background-color: #ff0000; /* Red for user */
    align-self: flex-end;
}

.message.ai {
    background-color: #222; /* Dark for Jarvis */
    align-self: flex-start;
}

/* --------------------------
   Input Bar
--------------------------- */
#inputBar {
    display: flex;
    align-items: center;
    background-color: #000;
    border-top: 2px solid #ff0000;
    padding: 10px;
    border-radius: 0 0 10px 10px;
}

#userInput {
    flex-grow: 1;
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid #555;
    background-color: #1a1a1a;
    color: #fff;
}

/* --------------------------
   Buttons inside input bar
--------------------------- */
.inputBtn {
    margin-left: 5px;
    padding: 6px 10px;
    background-color: #ff0000;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

/* Optional hover effects */
.inputBtn:hover {
    background-color: #ff5555;
}

/* Make buttons smaller for compact layout */
#voiceBtn, #generateCodeBtn, #generateImageBtn, #memoryBtn, #sendBtn {
    width: 36px;
    height: 36px;
    padding: 0;
    font-size: 18px;
}

/* --------------------------
   Scrollbar customization
--------------------------- */
#messages::-webkit-scrollbar {
    width: 8px;
}

#messages::-webkit-scrollbar-thumb {
    background-color: #ff0000;
    border-radius: 4px;
}

/* --------------------------
   Responsive
--------------------------- */
@media (max-width: 768px) {
    #userInput {
        font-size: 14px;
    }
    .inputBtn {
        width: 30px;
        height: 30px;
        font-size: 14px;
    }
}
