import Background from '../img/bgc.png';
import { data } from './data.js';

const { list, pointersForReplacing, replaceTo } = data;
const container = document.querySelector('.container');

container.style.backgroundImage = `url("${Background}")`;

const ul = document.querySelector("ul");

function createItem(text) {
  const li = document.createElement('li');
  li.setAttribute('tabindex', '1');
  li.textContent = text;
  return li;
}

list.forEach((text) => ul.append(createItem(text)));

ul.addEventListener('keydown', (e) => {
  const keyCode = e.code;
  const { target } = e;

  if(target.tagName === 'LI') {
    if(e.code === 'Space') {

      target.classList.toggle('completed');
      target.setAttribute('tabindex', '-1')
    }

    if(e.code === 'Backspace') {
      const pointerText = pointersForReplacing.find((t) => target.innerText.trim() === t);

      if(pointerText) {
        target.classList.toggle('replaced');
        target.setAttribute('tabindex', '-1');

        const newElement = createItem(replaceTo[pointersForReplacing.indexOf(pointerText)])
        setTimeout(() => {
          target.after(newElement);
          newElement.focus();

          newElement.classList.toggle('completed');
          newElement.setAttribute('tabindex', '-1')
        }, 1100)
      }
    }
  }
})


