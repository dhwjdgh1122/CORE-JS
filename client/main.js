class Button extends HTMLElement {

  constructor(){
    super();

    // c-button의 쉐도우 돔을 열어줘 동시에 접근할수있는 권한이 부여됨
    this.attachShadow({mode:'open'});

    console.log(this.shadowRoot);

     // 그리고 그 안에 내가 원하는 태그 집어 넣을거야
     this.shadowRoot.innerHTML = `
        <button>hello</button>
     `






  }

  connectedCallback(){

  }

  disconnectedCallback(){

  }


}


customElements.define('c-button',Button);

console.log(document.querySelector('c-button').shadowRoot.
querySelector('button'));