import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
    element.textContent = '';
    loadInterval = setInterval(() => {
        element.textContent += '.';
        if (element.length > 3) { // a lil diff but should accomplish same task
            element.textContent = '';
        }
    }, 300);
}

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
