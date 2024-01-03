let rookCount = 0, numberOfRooks = 2;
let kingSideCastleValidBlack = null, queenSideCastleValidBlack = null, kingSideCastleValidWhite = null, queenSideCastleValidWhite = null; 
class Rook extends ChessPiece {
    constructor(o = {}) {
        o = {
            colour: o.colour ? o.colour : rookCount < numberOfRooks ? "#000000" : "#FFFFFF",
            rot: o.colour == undefined ? rookCount < numberOfRooks ? [0, 90, 0]: [0, 270, 0] : o.colour == "#000000" ? [0, 90, 0]: [0, 270, 0],
            id: rookCount++, 
            mesh: ["Rook", "Rook"],
            type: "rook",
            pos: o.pos ?? [0, 0, 0],
            size: [0.6, 0.6, 0.6],
            meshScale: [envScale / 25],
            meshPos: o.meshPos ?? [0, 0, 0],
            meshColour: ["#FFFFFF", "#000000"], 
            metalness: 0,
            roughness: 0,
            height: 3,
        };
        super(o);
    }

    getValidMoves(){
        this.validMoves = rookValidMoves(this.positionSquare, this.colour);
    };
}

function rookValidMoves (start, rookColour){
    /**
     * Valid moves regulation:
     * - Can move the verticle straight line and the horizontal straight line
     * - can not jump over other pieces.
     * 
     * @param {String} start - Start square notation i.e. a1.
     * @param {String} rookColour - Hex string of rook piece colour.
     */

    validMovesTemp = [];

    let piece = findPieceInSquareName(start); // The actual rook object
    
    //Repeat for the four directions
    let modifyArray = [[0, +1], [0, -1], [+1, 0], [-1, 0]];
    for (let i = 0; i < modifyArray.length; i++){
        isNeighbourSquareValidRecursion(piece.positionSquare, rookColour, modifyArray[i][0], modifyArray[i][1]);
    }      

    // TODO: Remove moves that will put the current colours king in check
    return validMovesTemp;
}

function castling (colour, side, consoleLogs = false){
    /**
     * Handle the king side castle for a king of a certain colour.
     * - The King cannot have moved before. 
     * - The Rook cannot have moved before. 
     * - Squares between the King and Rook must be unoccupied. 
     * - The King cannot be in Check.
     * 
     * - King goes two spaces to toward to queenside, and the castle 
     * @param {String} colour - The colour of the king. This is in hex string format i.e "#000000"
     */

    let kingOriginalPos = colour == "#000000" ? "e8": "e1";
    let rookOriginalPos, kingNewPos, rookNewPos, positionsInbetween;

    if (side == "queen"){
        rookOriginalPos = colour == "#000000" ? "a8": "a1";
        kingNewPos = colour == "#000000" ? "c8": "c1";
        rookNewPos = colour == "#000000" ? "d8": "d1";

        positionsInbetween =  colour == "#000000" ? ["b8", "c8", "d8"]: ["b1", "c1", "d1"];
    } else if (side == "king") {
        rookOriginalPos = colour == "#000000" ? "h8": "h1";
        kingNewPos = colour == "#000000" ? "g8": "g1";
        rookNewPos = colour == "#000000" ? "f8": "f1";

        positionsInbetween =  colour == "#000000" ? ["f8", "c8"]: ["f1", "g1"];
    } else {
        if (consoleLogs) console.log("castling(): Invalid side parameter. Must be queen or king, " + side + " entered.");
        return;
    }

    //Check if position qualify for kingside castle, return false under the following conditions:

    // If the king will be in check in the new position
    if (isKingOfColourInCheckAtPosition(kingNewPos, colour)){
        if (consoleLogs) console.log("castling(): " + side + "side castle is invalid. King will be in check in new pos.");
        return false;
    }

    // If king or castle have move before return false
    let king = findKingOfColour(colour);
    if (king.allMoves.length > 0){ // If the king has previously moved
        if (consoleLogs) console.log("castling(): " + side + "side castle is invalid. King " + king.body.name + " has moved --> " + king.allMoves);
        return false;
    }

    let rook = findPieceInSquareName(rookOriginalPos);
    if (rook.type != "rook" || rook === undefined){ //If there is a piece that is not a rook here, or square empty
        if (consoleLogs) console.log("castling(): " + side + "side castle is invalid. There is no rook at " + rookOriginalPos);
        return false;
    }

    if (rook.allMoves.length > 0){ //If the rook has previously moved
        if (consoleLogs) console.log("castling(): " + side + "side castle is invalid. Rook " + rook.body.name + " has moved --> " + rook.allMoves);
        return false;
    }

    // If there are pieces inbetween the rook and king 
    for (let i = 0; i < positionsInbetween.length; i++){
        if (findPieceInSquareName(positionsInbetween[i]) != false){
            if (consoleLogs) console.log("castling(): " + side + "side castle is invalid. The piece " + findPieceInSquareName(positionsInbetween[i]).body.name + " is inbetween the king and rook on square " + positionsInbetween[i]);
            return false;
        }
    }

    //Return the new king position and rook position
    return [side, kingOriginalPos, kingNewPos, rookOriginalPos, rookNewPos];
}

/**
 * Asset Found at: https://www.cgtrader.com/free-3d-models/sports/game/chess-pieces-free
 */