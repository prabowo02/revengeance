const FRAME_NUM = 17;
const PUNCH_AUDIO = new Audio('punch.mp3');
var currentFrame = 0;

const PUNCH_FRAMES = [4, 8, 12, 16].reduce((o, v) => ({...o, [v]: new Audio('punch.mp3')}), {});

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

function init() {
  var main = document.getElementById("main");
  for (let i = 0; i < FRAME_NUM; ++i) {
    var img = document.createElement("img");
    img.src = getFileName(i);
    if (i > 0) img.classList.add("hidden");
    img.id = String(i);
    main.appendChild(img);
  }
  document.addEventListener("mousedown", nextFrame);
  document.addEventListener("keydown", nextFrame);
  document.addEventListener("touchstart", nextFrame);
}
