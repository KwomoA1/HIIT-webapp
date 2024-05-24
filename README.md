# HIIT up2114687

## Key features

### Workout multi-step form:
A multi-step form used to collect data necessary to setup the interval-timer for the workout.
To use this feature click the setup timer button, this will display a multi-step form. There is three sections one for the workout name and number of exercises, the other for exercise details and lastly a validation page. I decided to use this feature as I initially believed it to be the easiest method to collect the necessary data to setup the time, however after careful thought and consideration, while this method is effective and gets the job done, I believe there was another method I could've use to accomplish the same three goals of each section without the use of a multi-step-form. this method would've been simpler and likely easier to read. 

### Timer web component:
A component used to display core information the user needs to know such as workout duration, exercise duration, exercise name, description and the next exercise. 
To use this feature, select submit on the final section of the multi-step form, this will display the web component. Start will initiate the countdown, pause will stop the countdown and reset will reset the countdown to the beginning. I made the decision to use a web component to increase the maintainability of the website as the code and styling would only affect the component and not the shadow dom and not the whole site (to a degree), it meant that the component could be used anywhere as long as it has access to the workout object.

### Visual cues:
Changes in the component color scheme and size to provide subtle information to the use such as when they should rest or workout. 
Workout = green and pulsing animation.
Rest = red and a static focal point.
I used this featured to help provide further clarification and indication to the user if they should be moving or resting. The animation is visually captivating and is centered around the critical information for the workout such as the exercise name, description and countdown. As a result the users attention will be focused on that critical information and won't even require looking at the countdown to know if should rest or not just the surrounding box.

### Mobile Responsive
Attempted to make the app as mobile responsive as I could've. 
To view this simply view certain mobile devices length in the inspect menu.
I used this feature so users would be able to use it on multiple devices, while this was achieved to some degree, I think my CSS code wasn't great some parts messy and overall some of the units of length used may be incorrectly, despite this the desired feature was achieved to some degree.

## AI
REMOVE ME: Detail your use of AI, listing of the prompts you used, and whether the results formed or inspired part of your final submission and where we can see this (and if not, why not?). You may wish to group prompts into headings/sections - use markdown in any way that it helps you communicate your use of AI. 

### Prompts to include functionality for the buttons on the web component 
These prompts helped me understand web components further to add functionality to the timer web component:

>  Explain connectedcallback js
The response was useful as it provided further insight as to what the purpose of the connectedCallback method was and when it was called/used. As a result I knew where to add the button event listeners within the web component.

>  How to pause a set interval
I was unsure as to how to pause/stop the set interval method, this method provided a clear example and method which I implemented into my own code to pause create the functionality behind the pause button on the web component which pauses the timer.

>  Explain this error timer.mjs:24 Uncaught TypeError: this.updateTimer is not a function
I encountered an issue with my code where my function updateTimer was not recognized, this prompt was useful because it helped me locate the problem which was due to javascript scoping of the this callback method, to solve the issue I learnt I needed to bind the function to the callback function this.

### Prompts to use better CSS 
For web component I found out that the shadow dom did not have access to the root selector and the variable colours set within it and I wanted to figure out how to set variables within the web component.

>  How to set css variables wtihin a web component
This prompt helped as it explained step by step the solution to the problem starting with showing how to create the web component then displaying how to define css variables in the shadow DOM.


### Prompts used to understand grid and create a better css layout

> (Pasted code from [grid ex2](https://github.com/portsoc/css-layout/blob/main/grid/ex2.html)) Explain repeat for me
The explanation provided by the AI helped me understand what repeat meant in the code example and as a result I used it in my own css code for my grid layouts.

> (Pasted code from [grid ex4](https://github.com/portsoc/css-layout/blob/main/grid/ex4.html)) Explain grid-template-areas for me
After reading the code example, I didn't fully understand the purpose of grid-template-areas, this prompt provided useful insight on what grid-templates-areas were and what they did in this code.

> (Pasted code from [grid-media-vars-css](https://github.com/portsoc/css-layout/blob/main/gridcustom/grid-media-vars.css)) Explain this css for me
I wanted a simple explanation of what this code was doing to then understand and implement specific features into my own code, this prompt was particular useful as it provided and in-depth analysis on each segment of the code and explained what it was doing.


## Impact on the overall final design
I mostly made use of AI to provide explanations to any coded examples, assist with errors/bugs and assist with any built-in-methods etc explaining what to do and how to use them particularly when documentation proved to be a bit difficult to understand due to the excessive use of jargon etc. These prompts had a large impact on the final product as they furthered my understanding of certain concepts taught in lesson such as web components and CSS layouts tips which I then implemented in my code to make maintaining this code easier, my goal wasn't to have AI do the work for me but help me understand how to do things so that I can use that knowledge to create a functional and maintainable final product.
