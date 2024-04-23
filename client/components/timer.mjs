class Timer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.innerHTML = 'Testing';
  }
}

customElements.define('timer-item', Timer);