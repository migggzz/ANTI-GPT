let messages = [];
  const chatLog = document.getElementById('chat-log');
  const messageInput = document.getElementById('message');
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = messageInput.value.trim(); // Trim whitespace from the message
    if (messageText) { // Only proceed if messageText is not empty
      const newMessage = {"role": "user", "content": messageText};
      messages.push(newMessage);
      console.log(newMessage + ' sent from form');
      messageInput.value = '';
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', 'message--sent');
      messageElement.innerHTML = `
        <div class="message__text">${messageText}</div>
      `;
      chatLog.appendChild(messageElement);
      chatLog.scrollTop = chatLog.scrollHeight;
      console.log(messageText || 'No message');
      fetch('http://localhost:8080', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({messages}),
      })
      .then((res) => res.json())
      .then((data) => {
        const assistantMessageContent = data.completion.content;
        if (assistantMessageContent) { // Only proceed if assistantMessageContent is not empty
          const newAssistantMessage = {"role": "assistant", "content": assistantMessageContent};
          messages.push(newAssistantMessage);
          console.log(newAssistantMessage + ' sent from fetch')
          const messageElement = document.createElement('div');
          messageElement.classList.add('message', 'message--received');
          messageElement.innerHTML = `
            <div class="message__text">${assistantMessageContent}</div>
          `;
          chatLog.appendChild(messageElement);
          chatLog.innerHTML += `<br>`;
          chatLog.scrollTop = chatLog.scrollHeight;
        }
      });
    }
  });