# todo list

## learning outcomes
- MANY LEARNING OUTCOMES FROM THIS ONE!
- 1. Start with the basic functionality first, get the app functional, then start adding additional functionality
- 2. If I were to start again, I would
  - 2a. first implement adding project
  - 2b. adding task
  - 2c. deleting task 
  - 2d. completing task
  - 2e. adding subtask  
  - 2f. deleting subtask
- 3. Work on one issue at a time. Adding many features at once leads to confusion!
- 4. Good practice: Listening to "submit" event on form instead of "click" event on submit button

## Bug Analysis
- Issue: Delete current rendered project will crash app [Time: 1.5 hours]
  - Cause: 
    - Clicking delete project button would call switch project function which would try to render the deleted project
    - Switch project function would be called because switch project listener was binded to the entire project element (including the delete button) instead of just the project title
      - Result: Clicking delete button would call delete project, then call switch project onto the deleted project
  - Learning outcome: Please be careful where you bind your event listener functions! Ensure they do not cover other elements

## Self Improvements
- I want the flow of data between DOM - and JS to be more elegant. Right now I am putting data attributes on everything when I believe is there probably a more elegant solution available
- I believe I could using less lines of HTML if I used grid instead of flex for my project sidebar items and task items
  - Significantly lowers the amount of generated HTML I would have to write using JS. Good lesson!
  - EDIT: I refactored to use mostly grid. Reduces so much css, html code and looks better imo!