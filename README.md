# Tic Tac Toe

## A simple game, made in practice using factory functions and module patterns

[The Odin Tic Tac Toe project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe) is a project made as an exercise to hammer in the good patterns taught during the [factory functions and module pattern](https://www.theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern#encapsulating-with-the-module-pattern) segment of the curriculum. It's an exciting introduction to good and solid programming patterns that result in readable, functional, and safe code practices.

## The exercise

#### A thing to keep in mind is an important detail.

The main goal of the project is to end up using as little global code as possible, tucking as much of the program into factories, with only a single instance or something, like the gameboard, display controller ETC, exposed in global scope, to be wrapped into a IIFE module pattern so it cannot be used to create additional instances.

The exercise is a practice in thinking before coding. It's not just about creating an end-result that works, but creating one that is solid, and follows good practice in it's execution.

#### The exercise is two-fold

Start by creating the game to be fully functional in the console, without thinking about the UI aspect at all. Creating a solid functional foundation independent of the UI ensures the visual features will be able to function with as little influence on the program as possible.

Once the game is working in console, a seperate object should handle displaying the game, and handling the DOM logic. Creating functionality to allow players to add Xs and Os to the UI, having it communicate with the script behind the scenes.
