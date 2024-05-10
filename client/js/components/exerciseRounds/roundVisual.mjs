
import { workoutObj } from '/js/index.mjs';

class Visuals extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `
    <div class='main-container'>
        <span class='header'>Exercise</span>
        <div class='visual-container'></div>
    </div>
    `;

    // Links the component to the stylesheet
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', import.meta.resolve('./rounds.css'));
    this.shadow.append(style);

    // Settings custom attributes
    this.exerciseIndex = 0;
    this.exerciseLength = workoutObj.exercises.length;

    // Binding functions
    this.createCircles = this.createCircles.bind(this);
  }

  createCircles(number) {
    for (let i = 0; i < number; i++) {
      const circleContainer = this.shadow.querySelector('.visual-container');
      const exerciseCircle = document.createElement('div');
      exerciseCircle.setAttribute('class', 'exercise-circle');
      circleContainer.append(exerciseCircle);
    }
  }

  connectedCallback() {
    this.createCircles(5);
  }
}

customElements.define('round-visuals', Visuals);
