import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;
// loader is the three dots that loads while waiting for AI answer
function loader(element) {
    element.textContent = '';
    loadInterval = setInterval(() => {
        element.textContent += '.';
        if (element.length > 3) { // a lil diff but should accomplish same task
            element.textContent = '';
        }
    }, 300);
}
// type text is typing the answer letter by letter
function typeText(element, text) {
    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHtml += text.charAt(index);
            index++;
        }
        else {
            clearInterval(interval);
        }
    }, 20)
}
// generates unique id so you can map over message later
function generateUnqieuId() {
    const timestamp = Date.now();
    const randomeNumber = Math.random();
    const hexadecimalString = randomeNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
}
// check if the below function works
function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
            <div className="profile">
              <img src="${isAi ? bot : user} alt="${isAi ? 'bot' : 'user'}/>
            </div>
            <div class="message" id=${uniqueId}>${value}</div>
          </div>
        </div>

        `
    )
}
// actions that take place when pressing the submit or enter button
const handleSubmit = async(eve) => {
  eve.preventDefault();
  const data = new FormData(form);
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();
  
  const uniqueId = generateUnqieuId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight; // puts new message in view

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
}