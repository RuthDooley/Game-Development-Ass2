let knightCount = 0, numberOfKnights = 2;
class Knight extends ChessPiece {
    constructor(o = {}) {
        o = {
            colour: o.colour ? o.colour : knightCount < numberOfKnights ? "#000000" : "#FFFFFF",
            rot: o.colour == undefined ? knightCount < numberOfKnights ? [0, 0, 0]: [0, 180, 0] : o.colour == "#000000" ? [0, 0, 0]: [0, 180, 0],
            id: knightCount++, 
            mesh: ["Knight", "Knight"],
            type: "knight",
            pos: o.pos ?? [0, 0, 0],
            size: [0.6, 0.6, 0.6],
            meshScale: [envScale / 25],
            meshPos: o.meshPos ?? [0, 0, 0],
            meshColour: ["#FFFFFF", "#000000"], 
            metalness: 0,
            roughness: 0,
            height: 3.4,
        };
        super(o);
    }

    getValidMoves(){
        this.validMoves  = knightValidMoves(this.positionSquare, this.colour);
    };
}

function knightValidMoves (start, knightColour){
    /**
     * Valid moves regulation:
     * - Moving in a L shape (letter + 2 and number + 1, letter + 2 and number - 1, letter - 2 and number + 1 (8 option) ...), 
     * - The spaces need to be on the board.
     * - A pieces of the colour of this piece can not be in that square.
     * 
     * @param {String} start - Start square notation i.e. a1.
     * @param {String} knightColour - Hex string of knight piece colour.
     */

    let posArray = splitSquareNotation(start);
    let allMoves = [combineSquareNotation(posArray[0].charCodeAt(0) + 2, posArray[1] + 1), combineSquareNotation(posArray[0].charCodeAt(0) + 2, posArray[1] - 1), combineSquareNotation(posArray[0].charCodeAt(0) - 2, posArray[1] + 1), combineSquareNotation(posArray[0].charCodeAt(0) - 2, posArray[1] - 1),
        combineSquareNotation(posArray[0].charCodeAt(0) + 1, posArray[1] + 2), combineSquareNotation(posArray[0].charCodeAt(0) - 1, posArray[1] + 2), combineSquareNotation(posArray[0].charCodeAt(0) + 1, posArray[1] - 2), combineSquareNotation(posArray[0].charCodeAt(0) - 1, posArray[1] - 2)];
    let validMoves = [];
    for (let i = 0; i < allMoves.length; i++){
        // Is the square a valid square pieces on the board and is the square free or has opponent piece on it 
        if (!isSquareValidBoardSpace(allMoves[i]))
            continue;

        if (!isSquareOccupied(allMoves[i]) || isSquareOccupied(allMoves[i], getPieceOppositeColour(knightColour)))
            validMoves.push(allMoves[i]);
    }

    // TODO: Remove moves that will put the current colours king in check
    return validMoves;
}

/**
 * Asset Found at: https://www.cgtrader.com/free-3d-models/sports/game/chess-pieces-free
 */