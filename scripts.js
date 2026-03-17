const PASSWORD = "7366062";

const passwordScreen = document.getElementById("password-screen");
const jarvis = document.getElementById("jarvis");

document.getElementById("password-submit").onclick = () => {
  if(document.getElementById("password-input").value === PASSWORD){
    passwordScreen.style.display = "none";
    jarvis.classList.remove("hidden");
    jarvisReply("Hello Mamar njie, Jarvis is online.");
  } else {
    document.getElementById("error").innerText = "Wrong password";
  }
};

function addMessage(text, type){
  const msg = document.createElement("div");
  msg.className = type;
  msg.innerText = text;
  document.getElementById("messages").appendChild(msg);
}

function userMsg(text){ addMessage(text, "user"); }
function jarvisReply(text){ addMessage(text, "jarvis"); }

function cleanInput(text){
  text = text.toLowerCase();

  // remove extra words
  text = text.replace("tell me about","")
             .replace("who is","")
             .replace("what is","")
             .replace("search","")
             .replace("jarvis","")
             .trim();

  return text;
}

async function send(){
  let text = document.getElementById("input").value;
  if(!text) return;

  userMsg(text);
  document.getElementById("input").value = "";

  let lower = text.toLowerCase();

  // Custom commands
  if
    jarvisReply("Hi, how may I help you today?");
    return;
  }

  if(lower.includes("wake up")){
  jarvisReply("Oh, it's you Mamar Njie, my creator. How are you doing? How may I help you today?");
  return;
  }(lower.includes("wake up")){
    jarvisReply("Oh, it's you Mamar njie, Jarvis father. How are you doing? How may I help you today?");
    return;
  }
if(lower.includes("who made you")){
  jarvisReply("I was created by my Father, Mamar Njie.");
  return;
}
  // CLEAN INPUT → makes sentences work
  let query = cleanInput(text);

  try{
    jarvisReply("Searching...");

    let res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
    let data = await res.json();

    if(data.extract){
      jarvisReply(data.extract);
    } else {
      jarvisReply("I couldn't find anything.");
    }

  } catch {
    jarvisReply("Error searching.");
  }
}// 🎤 VOICE
function startListening(){
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = function(event){
    let text = event.results[0][0].transcript;
    document.getElementById("input").value = text;
    send();
  };

  recognition.start();
}


// 🖼 IMAGE (placeholder for now)
function generateImage(){
  let text = document.getElementById("input").value;
  jarvisReply("Generating image for: " + text + " (coming in V6)");
}


// 🧠 MEMORY
let memory = [];

function remember(){
  let text = document.getElementById("input").value;
  if(text){
    memory.push(text);
    jarvisReply("I will remember that.");
  }
}
