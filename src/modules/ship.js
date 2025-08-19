/*
 the function factory ship() should produce a ship object with the following properties:
 1. ship length 
 2. number of times the ship has been hit 
 3. sunk status (whether it has been sunk or not)

 The odin project also has a reminder that the we are only testing PUBLIC interfaces, so methods or properties that 
 are used outside of the ship object need to be tested. 

 remember to write a test first, then make it pass to encourage TDD and clean code.
*/
export default function ship(length) {
    const shipLength = length;
    let shipHits = 0;
    let shipSunkStatus = false;

    // returns the ship's length
    function getLength() {
        return shipLength;
    }

    // retruns the ship's current hits
    function getHits() {
        return shipHits;
    }

    // increase shipHit counter by 1
    function hit() {
        shipHits += 1;
    }

    /*
     calculates and returns the ship's sunk status
     if the ship's hits is equal to the length of the ship, it is considered sunk
     if not, the ship is still alive
    */

    function isSunk() {
        if (shipHits === shipLength) {
            shipSunkStatus = true;
            return shipSunkStatus;
        }

        return shipSunkStatus;
    }

    return { getLength, getHits, hit, isSunk };
}
