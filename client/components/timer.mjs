// The key to solving this problem is setInterval and understanding how many milisecs in a sec, minute , hour

class Timer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.innerHTML = 'Testing';
  }
}

customElements.define('timer-item', Timer);