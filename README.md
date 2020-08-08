# DEVELOPER INTERVIEW TECHNICAL PROBLEMS GUIDE

## TASKS

There are a number of required and optional tasks which form part of the interview. The app is a "mental maths" application which generates questions, verifies the user responses and keeps a score.

Initialise a blank git repo in this folder:

```
git init
```

**Please commit after each task (or subtask) and put the number of the task in the message.**

Tasks

1. [Required] Change the application to run on port `4444`
2. [Required] Centre the question & answer area horizontally and vertically on the screen
3. [Required] Add subtraction, multiplication and division questions. Optional Extension: how can you ensure division questions always result in a whole number answer?
4. [Required] Keep track of the user's score on the front end and display it in a new React component.
   Look for the comment in `QuestionAreaContainer.js` indicating where it should be rendered. The score is a simple counter of how many questions the user has got correct, it does not reset if they get one wrong.
5. [Optional] Add frontend code for a collaborative scoring feature using Sockets. The game works as follows:

   - Each user that opens the app joins the "team" (you can use different windows/tabs)
   - Every time anyone gets a question correct, the team's score is increased
   - There is a communal target that the team is working towards, randomly chosen by the server

   - The backend code for the collaborative scoring is done for you and can be found in `competition.js`.
   - Add listeners to the frontend to react to these three socket events:

     - `player_joined` - fired when a new player joins the team.
     - `score_updated` - fired whenever the team score increases, including when the current user caused the score to go up
     - `target_reached` - fired when the group target is reached

   - **Tasks**:
     - (5a) Show a message on the frontend for 3 seconds telling the user someone else has joined
     - (5b) Display the team score on the screen above the question display
     - (5c) Show a congratulaions message

6. [Optional] Improve the styling on the front end
7. [Optional] Add "best streak" to your score component to show how many questions in a row the user has got correct.
8. [Optional] Add difficulty levels which generate different sums. Include a toggle on the front end to allow the user to switch levels

## General set-up guide

This guide will take you through the environment setup and problems to solve for the Atom Learning developer job.

All steps to complete the task from scratch are included here, assuming no existing environment. Of course, you are free to use different tools/configurations if you would like. The only thing that will be assessed is the code at the end.

### ENVIRONMENT

We use NodeJS running express for our backend with a React app for the frontend.

#### Basic Setup

- Follow instructions for installing NodeJS for your operating system here: https://nodejs.org/en/download/package-manager/
- Install Git on your machine (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Run NPM install
  `cd /path/to/project npm install`
- Start server using the built in script - this will ensure webpack builds the React app
  `npm start`
- Visit http://localhost:3000 in a browser to see the application
- Use a text editor/IDE of your choice to complete the tasks

**Running the "dev" script will start a webpack build process which will compile all the React components and CSS into a single bundle file. It will also start a nodemon instance of the server which means it will automatically restart and rebuild when you make a change to a Javascript file.**

#### Directory Structure

```
.
├── config (contains server specific config file)
├── client (frontend React code)
│   └── css (styles are included via imports in the React component files)
├── public (static, publicly available files)
│   ├── dist (contains generated files, do not edit any files in here)
│   └── img (static image files)
├── routes (API routing configuration)
├── server (backend processing)
└── server.js (main file)
```

### Code Layout

#### Client side app

The client side app is a React app, with the root component being App.js. In general, we use "Container" components that carry out API requests and maintain state and render "Display" components. Display component receive data via props and actually draw elements on the screen.

#### Backend Server

The server is an Express based RESTful API. There is a route file which defines all the endpoints and then passes information to modules in /server which carry out the application logic. It also serves the static files for the frontend.

Question objects consist of three parts: `left, operation and right`. `Left` and `right` are randomly generated single digit integers. `Operation` is the mathematical operation the user needs to apply - in the starting version for this interview, we only generate addition questions.

We use `node-persist` to keep a record of all questions generated and stores them with a unique ID as the key. This is the ID that the frontend will send back to the API when submitting the user's answer. Using that ID, you can retrieve the question and verify if the user supplied a correct answer.
