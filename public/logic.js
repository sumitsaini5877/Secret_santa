// -------- PAGE FLOW PROTECTION ----------
function checkAccess(step){
    if(step === 1) return;

    if(step === 2 && !localStorage.getItem("step1Done")){
        alert("🚫 Scan QR 1 first!");
       
    }

    if(step === 3 && !localStorage.getItem("step2Done")){
        alert("🚫 Scan QR 2 first!");
        
    }

    if(step === 4 && !localStorage.getItem("step3Done")){
        alert("🚫 Scan QR 3 first!");
        
    }

    if(step === 5 && !localStorage.getItem("step4Done")){
        alert("🚫 Scan QR 4 first!");
        
    }
}

// -------- WRONG SOUND ----------
let ctx;
function initAudio(){
  if(!ctx){
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
}
function playWrongSound(){
  initAudio();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  o.type = "square";
  g.gain.value = 0.2;
  o.frequency.setValueAtTime(600, ctx.currentTime);
  o.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.4);
  o.start();
  o.stop(ctx.currentTime + 0.5);
}

// -------- TYPE TEXT ----------
function typeMessage(text){
  const box = document.getElementById("missionText");
  box.innerHTML="";
  box.classList.add("typing-cursor");
  let i=0;

  function type(){
    if(i < text.length){
      box.innerHTML = text.substring(0,i+1);
      i++;
      setTimeout(type,40);
    } else box.classList.remove("typing-cursor");
  }
  type();
}

// -------- PASSWORD VERIFY ----------
function verifyPassword(correctPin, step, message){

  const pin = document.getElementById("pin").value;
  const error = document.getElementById("error");

  if(pin === correctPin){

      document.getElementById("cardBox").style.display="none";
      document.getElementById("successCard").style.display="block";

      typeMessage(message);

      localStorage.setItem(`step${step}Done`, true);
  }
  else{
      error.innerHTML = "❌ Ho Ho NOOO! Wrong Password 😂";
      playWrongSound();
      document.body.classList.add("shake");
      setTimeout(()=> document.body.classList.remove("shake"),700);
  }
}


function togglePin(){
  let pin = document.getElementById("pin");
  pin.type = (pin.type === "password") ? "text" : "password";
}