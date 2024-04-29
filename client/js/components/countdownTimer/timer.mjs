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
    this.span.textContent = this.setTimer(this.seconds);
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
    this.setTimer = this.setTimer.bind(this);
  }

  setTimer() {
    const duration = [Math.floor(this.seconds / 3600), Math.floor((this.seconds % 3600) / 60), this.seconds % 60];
    for (const attribute of duration) {
      if (attribute.toString().length === 1) {
        const number = attribute;
        console.log(number);
        const index = duration.indexOf(attribute);
        const newAttribute = `0${number}`;
        duration[index] = newAttribute;
        console.log(duration);
      }
    }
    this.span.textContent = `${duration[0]}:${duration[1]}:${duration[2]}`;
    return `${duration[0]}:${duration[1]}:${duration[2]}`;
  }

  updateTimer() {
    this.intervalID = window.setInterval(() => {
      if (this.seconds > 0) {
        this.seconds -= 1;
        this.setTimer();
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
