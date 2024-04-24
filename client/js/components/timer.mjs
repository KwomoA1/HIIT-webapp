// The key to solving this problem is setInterval and understanding how many milisecs in a sec, minute , hour

export class Timer extends HTMLElement {
  constructor() {
    super();
    this.shadow.attachShadow({ mode: 'closed' });
    this.span = document.createElement('span');
    this.shadow.append(this.span);

    this.seconds = sec;
  }

}


customElements.define('timer-item', Timer);
