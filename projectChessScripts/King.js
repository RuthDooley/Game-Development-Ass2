let kingCount = 0, numberOfKings = 1;;
class King extends ChessPiece {
    constructor(o = {}) {
        o = {
            colour: o.colour ? o.colour : kingCount < numberOfKings ? "#000000" : "#FFFFFF",
            rot: o.colour == undefined ? kingCount < numberOfKings ? [0, 90, 0]: [0, 270, 0] : o.colour == "#000000" ? [0, 90, 0]: [0, 270, 0],
            id: kingCount++, 
            mesh: ["King", "King"],
            type: "king",
            pos: o.pos ?? [0, 0, 0],
            size: [0.6, 0.6, 0.6],
            meshScale: [envScale / 25],
            meshPos: o.meshPos ?? [0, 0, 0],
            meshColour: ["#FFFFFF", "#000000"], 
            metalness: 0,
            roughness: -1,
            height: 5.25,
        };
        super(o);
        this.inCheck = false;
        this.piecesPuttingKingInCheck = [];
    }
    
    getValidMoves(){
        this.validMoves = kingValidMoves(this.positionSquare, this.colour);
    };

    kingInCheck(){
        //Put this king in check
        this.inCheck = true; 
        
        //Find the opposite colour peiecs that are putting this king in check
        let colourKey = this.colour == "#000000" ? "black" : "white";
        let oppColourKey = getPieceOppositeColour(this.colour, "string");
        console.log(colourKey + " king is in check");

        for (let i = 0; i < pieces[oppColourKey].length; i++){
            if (pieces[oppColourKey][i].validMoves.includes(this.positionSquare))
                this.piecesPuttingKingInCheck.push(pieces[oppColourKey][i]);
        }
    };

    kingNotInCheck(){
        //Remove from check and empty piecesPutttingKingInCheck
        this.inCheck = false;
        this.piecesPuttingKingInCheck = [];
    }
}

function kingValidMoves (start, kingColour){
    /**
     * Valid moves regulation:
     * - Can move in one space in one direction including diagonally.
     * - Cannot move into another piece of its own colour.
     * - Cannot move into check
     * 
     * @param {String} start - Start square notation i.e. a1.
     * @param {String} kingColour - Hex string of king piece colour.
     */

    let piece = findPieceInSquareName(start); // The actual king object
    let posArray = splitSquareNotation(start); // King position in array
    let validMoves = [];
    let squaresAround = [combineSquareNotation(posArray[0].charCodeAt(0) - 1, posArray[1] + 1), combineSquareNotation(posArray[0].charCodeAt(0) + 0, posArray[1] + 1), combineSquareNotation(posArray[0].charCodeAt(0) + 1, posArray[1] + 1),
        combineSquareNotation(posArray[0].charCodeAt(0) - 1, posArray[1] + 0), combineSquareNotation(posArray[0].charCodeAt(0) + 0, posArray[1] + 0), combineSquareNotation(posArray[0].charCodeAt(0) + 1, posArray[1] + 0),
        combineSquareNotation(posArray[0].charCodeAt(0) - 1, posArray[1] - 1), combineSquareNotation(posArray[0].charCodeAt(0) + 0, posArray[1] - 1), combineSquareNotation(posArray[0].charCodeAt(0) + 1, posArray[1] - 1)];

    // Add the square is a valid board space, it is not occupied by the a piece of the same colour and does not put the king into check, then good
    for (let i = 0; i < squaresAround.length; i++){
        if (isSquareValidBoardSpace(squaresAround[i]) && !isSquareOccupied(squaresAround[i], kingColour) && !isKingOfColourInCheckAtPosition(kingColour, squaresAround[i], false)){
            // console.log(squaresAround[i]);
            validMoves.push(squaresAround[i]);
        }
    }

    // See if castling is a valid move on either side
    let castleKingQueen = [castling(kingColour, "king"), castling(kingColour, "queen")];
    if (castleKingQueen[0] != false){
        // console.log("Kingside castle is valid");
        validMoves.push(castleKingQueen[0][2]);
    }

    if (castleKingQueen != false){
        // console.log("Queenside castle is valid");
        validMoves.push(castleKingQueen[1][2]);
    }
    
    return validMoves;
}

// TODO: King side castle
function isKingOfColourInCheck (colour){
    /**
     * Check to see if the king of colour "colour" is in check. Return true if the king is in check or false otherwise.
     * 
     * @param {String} colour - The colour of the king. This is in hex string format i.e "#000000"
     */

    let piece = findKingOfColour(colour); // The object

    if (piece.inCheck == true) return true;

    //Get the king positionSquare and check does any of the the opposite colour pieces have that in their validMoves
    let kingPositionSquare = piece.positionSquare;
    return isKingOfColourInCheckAtPosition(colour, kingPositionSquare);
}

function isKingOfColourInCheckAtPosition (colour, squareNotation, consoleLogs = false){
    /**
     * Find whether if a king of a specific colour would be in check if it was on a specific space;
     * 
     * @param {String} colour - The colour of the current king. This is in hex string format i.e "#000000"
     * @param {String} squareNotation - A string that corresponds to a square on the board eg. a1.
     */

    let colourKey = colour == "#000000" ? "black" : "white";
    let oppColourKey = colour == "#000000" ? "white" : "black";

    //Using the king positionSquare, check does any of the the opposite colour pieces have that in their validMoves
    for (let i = 0; i < pieces[oppColourKey].length; i++){
        for (let j = 0; j < pieces[oppColourKey][i].validMoves.length; j++){
            // console.log(pieces[oppColourKey][i].validMoves[j] + " " + squareNotation);
            if (pieces[oppColourKey][i].validMoves[j] == squareNotation){
                if (consoleLogs) console.log(colourKey + " king at position " + squareNotation + " is in check ");
                return true;
            }
        }
    }
    if (consoleLogs) console.log(colourKey + " king at position " + squareNotation + " is not in check ");
    return false;
}

function findKingOfColour (colour) {
    /**
     * Return the object of the king of a specific colour.
     * 
     * @param {String} colour - The colour of the king. This is in hex string format i.e "#000000"
     */

    let colourKey = colour == "#000000" ? "black" : "white";
    for (let i = 0; i < pieces[colourKey].length; i++){
        if (pieces[colourKey][i].type == "king"){
            return pieces[colourKey][i];
        }
    }
}

function putKingInCheck(colour){
    /**
     * Put king of colour in check
     * 
     * @param {String} colour - The colour of the king. This is in hex string format i.e "#000000"
     */
    findKingOfColour(colour).kingInCheck();
}

function removeKingInCheck(colour){
    /**
     * Put king of colour out of check 
     * 
     * @param {String} colour - The colour of the king. This is in hex string format i.e "#000000"
     */
    findKingOfColour(colour).kingNotInCheck();
}

function doesMovingAPieceHereTakeOwnKingOutOfCheck (piece, end){
    /**
     * Called on each pieces, and finds the valid moves for each that will put own king out of check.
     * 
     * @param {Object} piece - The chess object piece that is not the king. King is handlled in isKingOfColourInCheckAtPosition();
     * @param {String} end - The square notation of the end position you want to move the piece to.
     */
    let result;

    if (typeof(piece) == "string") piece = findPieceInSquareName(piece);
    let pieceStartSquare = piece.positionSquare;
    let pieceColour = piece.colour;
    
    // *King is handlled in isKingOfColourInCheckAtPosition();
    if (piece.type == "king") return !isKingOfColourInCheckAtPosition(pieceColour, end);

    //Move the piece object square to the end space (but not in the view)
    piece.positionSquare = end;

    //Update all pieces valid moves
    getPieacesValidMoves(false);

    //Check does it put own king colour in check, and change result var
    result = isKingOfColourInCheck(pieceColour) == true ? false : true;

    //Move the piece object square back to the original space
    piece.positionSquare = pieceStartSquare;

    // Need to reget the valid moves because the pieces didn't actually move 
    getPieacesValidMoves(false);

    return result;
}

function doesMovingThisPiecePutOwnKingInCheck (piece, end, consoleLogs = false){
    /**
     * Does moving this pieces from start to end, put own colour king in check.
     * 
     * @param {Object} piece - The chess object piece or square where the piece is.
     * @param {String} end - The square notation of the end position you want to move the piece to.
     */

    if (typeof(piece) == "string") piece = findPieceInSquareName(piece);
    let pieceStartSquare = piece.positionSquare;
    let pieceColour = piece.colour;
    let result;

    if (isKingOfColourInCheck(pieceColour)){
        console.log("doesMovingThisPiecePutOwnKingInCheck(): Own king is already in check");
        return;
    }

    //Move the piece object square to the end space (but not in the view)
    piece.positionSquare = end;

    //Update all pieces valid moves
    getPieacesValidMoves(false);

    //Check does it put own king colour in check, and change result var
    result = isKingOfColourInCheck(pieceColour) == true ? true : false;

    //Move the piece object square back to the original space
    piece.positionSquare = pieceStartSquare;

    // Need to reget the valid moves because the pieces didn't actually move 
    getPieacesValidMoves(false);

    if (consoleLogs) result == true ? console.log("Moving piece " + piece.body.name + " (" + pieceStartSquare + ") to " + end + " would put own king in check") : console.log("Moving piece " + piece.body.name + " (" + pieceStartSquare + ") to " + end + " would not put own king in check");
    return result;
}

/**
 * Asset Found at: https://www.cgtrader.com/free-3d-models/sports/game/chess-pieces-free
 */