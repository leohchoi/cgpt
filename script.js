import bot from './assets/bot.png'
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

// so far we have created:
// 1) the loader function which shows the loading phase of the AI
// 2) the typetext function which types each letter at a time
// 3) the unique ID generator
// 4) the chatStripe function which is the html portion that will add the texts from both user and AI to the screen
// 5) the handleSubmit function which will add chatStripe to the actual html file after user presses submit

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        handleSubmit(e);
    }
})