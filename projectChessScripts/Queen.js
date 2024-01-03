let queenCount = 0, numberOfQueens = 1;
class Queen extends ChessPiece {
    constructor(o = {}) {
        o = {
            colour: o.colour ? o.colour : queenCount < numberOfQueens ? "#000000" : "#FFFFFF",
            rot: o.colour == undefined ? queenCount < queenCount ? [0, 90, 0]: [0, 270, 0] : o.colour == "#000000" ? [0, 90, 0]: [0, 270, 0],
            id: queenCount++, 
            mesh: ["Queen", "Queen"],
            type: "queen",
            pos: o.pos ?? [0, 0, 0],
            size: [0.6, 0.6, 0.6],
            meshScale: [envScale / 25],
            meshPos: o.meshPos ?? [0, 0, 0],
            meshColour: ["#FFFFFF", "#000000"], 
            metalness: 0,
            roughness: 0,
            height: 3.75,
        };
        super(o);
    }

    getValidMoves(){
        this.validMoves = queenValidMoves(this.positionSquare, this.colour);
    };
}

function queenValidMoves (start, queenColour){
    /**
     * Valid moves regulation:
     * - Bishop and rook moves combined.
     * 
     * @param {String} start - Start square notation i.e. a1.
     * @param {String} queenColour - Hex string of queen piece colour.
     */

    validMovesTemp = [];

    let piece = findPieceInSquareName(start); // The actual rook object
    
    //Repeat for the four directions
    let modifyArray = [[0, +1], [0, -1], [+1, 0], [-1, 0], [-1, +1], [+1, +1], [+1, -1], [-1, -1]];
    for (let i = 0; i < modifyArray.length; i++){
        isNeighbourSquareValidRecursion(piece.positionSquare, queenColour, modifyArray[i][0], modifyArray[i][1]);
    }      
    
    // TODO: Remove moves that will put the current colours king in check
    return validMovesTemp;

}

//TODO: Queen side castle