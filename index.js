
import { colorsByLength } from './color.js'
import { isDark } from './color.js'
import { isValidColor } from './color.js'

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const colorsEl = document.querySelector('.colors')
function displayColor(colors) {
  return colors.map((col) => `<span class=" ${col} color ${isDark(col) ? 'dark' : ''}" style="background :${col}">${col}</span>`).join('')
}


function handleResult({ results }) {
  const words = results[results.length - 1][0].transcript
  let color = words.toLowerCase();
  color = color.replace(/\s/g, '');
  if (!isValidColor(color)) return;
  const colSpan = document.querySelector(`.${color}`)
  colSpan.classList.add('got')
  document.body.style.background = color
}

function start() {
  if (!('SpeechRecognition' in window)) {
    console.log('Sorry your browser does not support Speech Recognition')
    return;
  }
  console.log('Starting')
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = handleResult;
  recognition.start();
}
colorsEl.innerHTML = displayColor(colorsByLength);
start();