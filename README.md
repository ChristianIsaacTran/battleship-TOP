# Advice to myself

This is the last project in the advanced javascript portion and this is right after learning about
TDD (test driven development). I need to put what I just learned to use in this assignment, so try to
take it one step at a time with this process. Like it says on the project page:

1. Write a test
2. make it pass

note: to run individual test files with jest, I would just have to invoke jest on that specific filepath.
ex: npx jest ./filepathToTest/something.test.js
I could also input an optional --watch or --watchAll so that whenever I make changes to that specific file or any file if I choose
watchAll, then the test would automatically run. I would stop the watch with ctrl + c in command line.
remember that to run an individual test and skip the rest, I have to add the .only flag to the test. So it would look like: test.only()

(8/21/2025) Start using conventional commit headers to make commits more organized. Kind of like:
docs: changed the README.md
or
fix: fixed an issue with the placeShip() function

## Battleship project from The Odin Project

This is a projet that combines the javascript logic of battleship with HTML dom elements. We are re-creating a classic game of battleship but with HTML, CSS, and javascript.

1. ship class/factory

    - has properties length, number of times hit, and
      if they have been sunk status.
    - has hit() function that increases the number of hits on
      the ship instance.
    - isSunk() function calculates whether a ship is considered
      sunk based on the length and number of time's it's been hit.

2. gameboard class/factory (finish ship logic first with TDD)

    - gameboard should be able to place ships at specific coordinates
      by calling the ship factory.
    - gameboards have a receiveAttack() function:
        - pin-points coordinates, determines if that position chosen is a hit or miss.
        - if HIT, then call the hit() fucntion on THAT ship at THAT coordinate.
        - if MISS, record the coordinates of the missed shot.
    - gameboards keep track of missed shots for display purposes
    - gameboards should report whether or not all of the ships have been sunk or not. A win status.

3. player class/factory
    - two types of players in the game:
        - real players
        - computer players (coordinates chosen will be random)
    - each player will have their own gameboard.

note: I am going to convert the gamecontroller.js into a module that manages DOM interactions with the objects that I am using in the 
game of battleship. This is to drive the game.

(8/27/2025) - My current goal right now is to display the ship placement and rendered information on the DOM.