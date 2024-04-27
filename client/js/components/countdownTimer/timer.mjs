// The key to solving this problem is setInterval and understanding how many milisecs in a sec, minute , hour

export class Timer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Creating the stylesheet
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', import.meta.resolve('./timer.css'));
    shadow.append(style);

    // Setting attributes
    this.seconds = parseInt(this.getAttribute('seconds'));
    this.intervalID = null;

    // Create container
    this.container = document.createElement('div');
    this.container.setAttribute('class', 'container');
    shadow.append(this.container);

    // Create the text content
    this.span = document.createElement('span');
    this.span.textContent = `00:00:${this.seconds}`;
    this.container.append(this.span);

    // Create buttons
    this.startBtn = document.createElement('button');
    this.startBtn.setAttribute('class', 'startBtn');
    this.startBtn.setAttribute('type', 'button');
    this.startBtn.textContent = 'Start';
    this.container.append(this.startBtn);

    this.pauseBtn = document.createElement('button');
    this.pauseBtn.setAttribute('class', 'pauseBtn');
    this.pauseBtn.setAttribute('type', 'button');
    this.pauseBtn.textContent = 'Pause';
    this.container.append(this.pauseBtn);

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
  }

  updateTimer() {
    this.intervalID = window.setInterval(() => {
      if (this.seconds > 0) {
        this.seconds -= 1;
        this.span.textContent = `00:00:${this.seconds}`;
      }
    }, 1000);
  }

  start() {
    this.updateTimer();
  }

  pause() {
    clearInterval(this.intervalID);
  }

  connectedCallback() {
    this.pauseBtn.addEventListener('click', this.pause);
    this.startBtn.addEventListener('click', this.start);
  }
}


customElements.define('timer-item', Timer);
