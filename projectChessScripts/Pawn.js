let pawnCount = 0, numberOfPawns = 8;
class Pawn extends ChessPiece {
    constructor(o = {}) {
        o = {
            colour: o.colour ? o.colour : pawnCount < numberOfPawns ? "#000000" : "#FFFFFF",
            rot: o.colour == undefined ? pawnCount < numberOfPawns ? [0, 90, 0]: [0, 270, 0] : o.colour == "#000000" ? [0, 90, 0]: [0, 270, 0],
            id: pawnCount++, 
            mesh: ["Pawn", "LP_Pawn_Sphere"],
            type: "pawn",
            pos: o.pos ?? [0, 0, 0],
            size: [0.6, 0.6, 0.6],
            meshScale: [envScale / 6.5],
            meshPos: o.meshPos ?? [0, 0, 0],
            meshColour: ["#FFFFFF", "#000000"], 
            metalness: 0,
            roughness: 1,
            height: 2.5,
        };
        super(o);
    }

    getValidMoves(){
        this.validMoves = pawnValidMoves(this.positionSquare, this.colour);
    };
}

function pawnValidMoves (start, pawnColour){
    /**
     * Valid moves regulation:
     * - Move one square forward.
     * - If the pawn has not previously moved, then move up 2 squares is allowed.
     * - If a different colour piece in the squares diagonal in the two squares infront.
     * - Enpassant - Get the rank letter left and right of the pawn, if their only move was rankLetter + 4 or 5 
     * 
     * @param {String} start - Start square notation i.e. a1.
     * @param {String} pawnColour - Hex string of pawn piece colour.
     */

    let piece = findPieceInSquareName(start); // The actual pawn object
    let posArray = splitSquareNotation(start); // Pawn position in array
    let validMoves = [];

    let modifyMulitplier = pawnColour == "#000000" ? -1 : 1;

    // If the square infront is not occupied and it is a valid board sapce, add to valid moves
    let squareInfront = combineSquareNotation(posArray[0].charCodeAt(0) , posArray[1] + (1 * modifyMulitplier));
    if (!isSquareOccupied(squareInfront) && isSquareValidBoardSpace(squareInfront))
        validMoves.push(squareInfront);
    
    // If the pawn at start coords has allMoves = [], they can move 2 square infront if that space is free
    let twoSquaresInfront = combineSquareNotation(posArray[0].charCodeAt(0) , posArray[1] + (2 * modifyMulitplier));
    if (piece.allMoves.length == 0 && !isSquareOccupied(twoSquaresInfront))
        validMoves.push(twoSquaresInfront);

    // If the diagonal square has an opponents piece on it, then add to validMoves 
    let diagonalSquares = [combineSquareNotation(posArray[0].charCodeAt(0) - 1, posArray[1] + (1 * modifyMulitplier)), combineSquareNotation(posArray[0].charCodeAt(0) + 1, posArray[1] + (1 * modifyMulitplier))];
    if (isSquareOccupied(diagonalSquares[0], getPieceOppositeColour(pawnColour)))
        validMoves.push(diagonalSquares[0]);
    if (isSquareOccupied(diagonalSquares[1], getPieceOppositeColour(pawnColour)))
        validMoves.push(diagonalSquares[1]);

    // En passant: 
    let enpassant = 0;
    if (lastPiecePlayed != undefined){
        enpassant = isEnPassantValid(posArray, pawnColour);
        if (enpassant.length == 2) {
            enpassant = enpassant[0] + enpassant[1];
            validMoves.push(enpassant);
            enPassantValid = [start, enpassant];
        }
    }
    return validMoves;

}

function isEnPassantValid (currentPawnArray, pawnColour, consoleLogs = false){
    /**
     * Valid moves regulation:
     * - 1) Last move (Object) needs to be a pawn a rank to the left or right of the current pawn.
     * - 2) Last move needs to have allMoves of length 1
     * - 3) Last moves need to be on a square 2 moves infront of their original square (calculate with colour and abs)
     * - 4) Current pawn must be on the left or right of this pawn (the exact square number i.e currentPawn[1])
     * 
     * Returns the square that the current pawn would move into if enpassant in possible otherwise returns false.
     * @param {Array} currentPawnArray - An array of the curent piece square notation split i.e a1 --> ["a", 1]
     * @param {String} pawnColour - Hex string of current pawn piece colour.
     */

    let lastMoveArray = splitSquareNotation(lastPiecePlayed.positionSquare);
    let currentPawnStartNumber = pawnColour == "#000000" ? 7 : 2;
    let oppositePawnStartNumber = pawnColour == "#000000" ? 2 : 7;
    let moveMulitplier = pawnColour == "#000000" ? -1 : 1;

    if (/*1*/ lastPiecePlayed.type != "pawn"){
        if (consoleLogs) console.log("isEnPassantValid(): Last move is not a pawn, it is a " + lastPiecePlayed.type);
        return false;
    }

    if (/*1*/ (Math.abs(lastMoveArray[0].charCodeAt(0) - currentPawnArray[0].charCodeAt(0)) != 1)){
        if (consoleLogs) console.log("isEnPassantValid(): Last move pawn is on the rank " + lastMoveArray[0] + "  current pawn is on rank " + currentPawnArray[0]);
        return false;
    }

    if (/*2*/ (lastPiecePlayed.allMoves.length != 1)){
        if (consoleLogs) console.log("isEnPassantValid(): Last move pawn has moved more that once, it has moved " + lastPiecePlayed.allMoves.length + " times");
        return false;
    }

    if (/*3*/ ((oppositePawnStartNumber - lastMoveArray[1]) != 2)){
        if (consoleLogs) console.log("isEnPassantValid(): Last move pawn did not move two spaces forward, it moved " + Math.abs(oppositePawnStartNumber - lastMoveArray[1]) + " spaces");
        return false;
    }

    if (/*4*/ (currentPawnArray[1] != lastMoveArray[1])){
        if (consoleLogs) console.log("isEnPassantValid(): Last move pawn is on space " + lastMoveArray[0] + lastMoveArray[1] + " and current pawn is on space " + currentPawnArray[0] + currentPawnArray[1] 
        + ", this is an invalid enpassant position");
        return false;
    }

    // This is not possible in chess game if everything is working find, but leaving it in anyway incase not
    let enPassantSquare = [lastMoveArray[0], lastMoveArray[1] + (1 * moveMulitplier)];
    //This square also needs to be free
    if (isSquareOccupied(enPassantSquare)){
        if (consoleLogs) console.log("isEnPassantValid(): the enpassant square " + enPassantSquare + " is occupied");
        return false;
    }

    console.log("EN PASSANT IS VALID");
    return enPassantSquare;
}

/**
 * Asset Found at: https://www.cgtrader.com/free-3d-models/sports/game/low-poly-pawn-chess
 */

