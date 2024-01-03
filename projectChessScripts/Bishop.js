let bishopCount = 0, numberOfBishops = 2;
class Bishop extends ChessPiece {
    constructor(o = {}) {
        o = {
            colour: o.colour ? o.colour : bishopCount < numberOfBishops ? "#000000" : "#FFFFFF",
            rot: o.colour == undefined ? bishopCount < numberOfBishops ? [0, 0, 0]: [0, 180, 0] : o.colour == "#000000" ? [0, 0, 0]: [0, 180, 0],
            id: bishopCount++, 
            mesh: ["Bishop", "Bishop"],
            type: "bishop",
            pos: o.pos ?? [0, 0, 0],
            size: [0.6, 0.6, 0.6],
            meshScale: [envScale / 25],
            meshPos: o.meshPos ?? [0, 0, 0],
            meshColour: ["#FFFFFF", "#000000"], 
            metalness: 0,
            roughness: 0,
            height: 2.75,
        };
        super(o);
    }
    
    getValidMoves(){
        this.validMoves = bishopValidMoves(this.positionSquare, this.colour);
    };
}

function bishopValidMoves (start, bishopColour){
    /**
     * Valid moves regulation:
     * - Move in the diagonal
     * - Cannot jump over pieces
     * 
     * @param {String} start - Start square notation i.e. a1.
     * @param {String} bishopColour - Hex string of bishop piece colour.
     */

    validMovesTemp = [];

    let piece = findPieceInSquareName(start); // The actual bishop object
    
    //Repeat for the four directions
    let modifyArray = [[-1, +1], [+1, +1], [+1, -1], [-1, -1]];
    for (let i = 0; i < modifyArray.length; i++){
        isNeighbourSquareValidRecursion(piece.positionSquare, bishopColour, modifyArray[i][0], modifyArray[i][1]);
    }      
    
    // TODO: Remove moves that will put the current colours king in check
    return validMovesTemp;
}

/**
 * Asset Found at: https://www.cgtrader.com/free-3d-models/sports/game/chess-pieces-free
 */