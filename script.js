async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  appendMessage('user', message);
  input.value = '';

  appendMessage('bot', '...생각 중이다 노');

  const response = await fetch('/api/chat.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  document.querySelectorAll('.message.bot').forEach(el => {
    if (el.textContent === '...생각 중이다 노') el.remove();
  });
  appendMessage('bot', data.reply);
}

function appendMessage(role, text) {
  const chat = document.getElementById('chat-container');
  const msg = document.createElement('div');
  msg.className = `message ${role}`;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}
