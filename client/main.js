


const app = document.querySelector('#app');
const temp = document.querySelector('#temp');


const clone = temp.content.cloneNode(true);

app.appendChild(temp);

console.log(temp.content);