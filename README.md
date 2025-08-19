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