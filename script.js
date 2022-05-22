const FRAME_NUM = 17;
const PUNCH_AUDIO = new Audio('punch.mp3');
const PUNCH_FRAMES = [4, 8, 12, 16].reduce((o, v) => ({...o, [v]: new Audio('punch_x2.mp3')}), {});
const BG_AUDIO = new Audio('bg.mp3');

var currentFrame = 0;

function getFileName(frame) {
  if (frame < 10) return '0' + String(frame) + '.png';
  return String(frame) + '.png';
}

function nextFrame() {
  var currentImage = document.getElementById(String(currentFrame));
  currentImage.classList.add("hidden");
  ++currentFrame;
  currentFrame %= FRAME_NUM;
  var currentImage = document.getElementById(String(currentFrame));
  currentImage.classList.remove("hidden");
  if (currentFrame in PUNCH_FRAMES) {
    PUNCH_FRAMES[currentFrame].play();
  }
}

var allowAdvance = true;
function advance() {
  if (!allowAdvance) return;
  startBgm();
  nextFrame();
  setTimeout(() => {
    nextFrame();
    allowAdvance = true;
  }, 4.0 / 30)
}

var startedBgm = false;
function startBgm() {
  if (!startedBgm) {
    BG_AUDIO.volume = 0.5;
    BG_AUDIO.loop = true;
    BG_AUDIO.play();
    startedBgm = true;
  }
}

function init() {
  var main = document.getElementById("main");
  for (let i = 0; i < FRAME_NUM; ++i) {
    var img = document.createElement("img");
    img.src = getFileName(i);
    img.id = String(i);
    if (i > 0) img.classList.add("hidden");
    main.appendChild(img);
  }
  document.addEventListener("mousedown", advance);
  document.addEventListener("keydown", advance);
  document.addEventListener("touchstart", advance);
}
