const character = document.getElementById('character');
const speechBubble = document.getElementById('speech-bubble');

const phrases = [
  "반갑노 이기",
  "북딱!",
  "우흥",
  "만지지 말라노",
  "가만히 있노"
];

function speakRandomLine() {
  const msg = phrases[Math.floor(Math.random() * phrases.length)];
  speechBubble.textContent = msg;
}

document.addEventListener('mousemove', e => {
  character.style.left = (e.pageX - 75) + 'px';
  character.style.top = (e.pageY - 75) + 'px';
});
