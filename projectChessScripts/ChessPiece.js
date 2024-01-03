let lastPiecePlayed = null, enPassantValid = null;

class ChessPiece {
    constructor(o) {
        this.id = o.id;
        this.type = o.type;
        this.shape = view.getGeometry( "chess", this.type + "_shape"),
        this.geometry = view.getGeometry( "chess", this.type, true),
        this.colour = o.colour;
        this.body = view.add({
            name: this.type + "_" + this.id,
            pos: [o.pos[0], 2, o.pos[2]],
            rot: o.rot,
            size: o.size,
            shape: this.shape,
            geometry: this.geometry,
            material: this.colour == "#000000" ? blackMaterial : whiteMaterial,
            type: "convex", 
            geoScale: [ o.size ], 
            mass: 10, 
            friction: 1,
            rolling:0.9,
            angular:0.5,
            margin:0.03,
        });
        this.meshColour = o.colour == "#FFFFFF" ? o.meshColour[0] : o.meshColour[1]; // Black colour, white colour
        this.height = o.height ? o.height : 3;

        this.positionSquare = this.originalPosition = getSquareNotationFromCoords([this.body.position.x, this.body.position.z]);
        this.validMoves = [];
        this.allMoves = [];

        // Change the piece property in view
        this.body.traverse((node) => {
            if (node.material){
                if (this.id < getNumberOfPiecesOnBoardByType(this.type) / 2)
                    node.material = node.material.clone();
                node.material.color = new THREE.Color(this.colour);
            }
        });


    }
    
    //TODO: Need to add this when mass is added
    setPosition = (pos) => {
        /**
         * Updates the position of the piece.
         *
         * @param {Array<Float>} pos - Update piece position to pos
         */
        view.up({
            name: this.body.name,
            pos: pos
        });
    };

    validMovesDisplay() {
        /**
         * Display "this" valid moves on the chess board
         */
        if (this.validMoves != []){
            for (let i = 0; i < validMoveHolder.length; i++){
                if (this.validMoves.includes(validMoveHolder[i].positionSquare)){
                    view.remove(validMoveHolder[i].body.name);

                    validMoveHolder[i] = {body: view.add({ name: validMoveHolder[i].body.name, pos: [validMoveHolder[i].body.position.x, 0.015, validMoveHolder[i].body.position.z] , rot:[0,90,0], size: [1, 0.6, 1], mesh: squareMesh, meshScale: [0.5], meshPos:[0, 0, 0]}), positionSquare: getSquareNotationFromCoords([validMoveHolder[i].body.position.x, validMoveHolder[i].body.position.z])};

                    validMoveHolder[i].body.traverse((node) => {
                        if (node.material){
                            node.material = node.material.clone();
                            node.material.color = new THREE.Color("#808080");
                        }
                    }); 
                }
            }
        }
    };

    removeValidMoveDisplay (){
        /**
         * Remove the validMoveDisplay from the chess board
         */

        //Any squares that have a position 0.015 remove and put to 0
        for (let i = 0; i < validMoveHolder.length; i++){
            if (validMoveHolder[i].body.position.y > 0){
                view.remove(validMoveHolder[i].body.name);
                validMoveHolder[i] = {body: view.add({ name: validMoveHolder[i].body.name, pos: [validMoveHolder[i].body.position.x, envheightMesh-1, validMoveHolder[i].body.position.z] , rot:[0,90,0], size: [1, 0.6, 1], mesh: squareMesh, meshScale: [0.5], meshPos:[0, envheightMesh+0.35, 0]}), positionSquare: getSquareNotationFromCoords([validMoveHolder[i].body.position.x, validMoveHolder[i].body.position.z])};
            }
        }
    }

    move (newSquareCoords, consoleLogs, override = false){ //Override the piece need to move to valid moves
        /**
         * Move the piece "this"
         */
        let newSquareName = typeof(newSquareCoords) != "string" ? getSquareNotationFromCoords(newSquareCoords) : newSquareCoords;
        newSquareCoords = getCoordFromSquareNotation(newSquareName);

        /**
         * A valid piece move is either:
         * - Own king is not in check & piece moved to a valid square & piece move does not put own king in check
         * - Own king is in check & piece moved to a square where own colour king is not in check & that movement is a valid piecemovement
         * 
         * Therefore a valid move is never:
         * - 1) If the square to move into is not a piece valid move, unless override = true
         * - 2) The piece moving puts own king in chck by moving
         * - 3) If king in check and not addressed i.e piece movement does not take king out of check.
         */

        //1
        // if (override == false){
        //     if (!this.validMoves.includes(newSquareName)){
        //         if (consoleLogs) console.log(this.body.name + " at pos (" + this.positionSquare +  ") .move() invalid. " + newSquareName + " is not an available square for this piece to move into.");
        //         return;
        //     }
        // }

        // //2
        // if (doesMovingThisPiecePutOwnKingInCheck(this, newSquareName) == true){
        //     if (consoleLogs) console.log(this.body.name + " at pos (" + this.positionSquare +  ") .move() invalid. Moving this piece will put own king in check");
        //     return;
        // }

        // //3
        // if (isKingOfColourInCheck(this.colour) && !doesMovingAPieceHereTakeOwnKingOutOfCheck(this, newSquareName)){
        //     if (consoleLogs) console.log(this.body.name + " at pos (" + this.positionSquare +  ") .move() invalid. Own king is in check, need to make a valid move to get king out of check.");
        //     return;
        // }

        // Remove the valid move display
        this.removeValidMoveDisplay();
        // Remove last move display
        if (previousMovesDisplayAlways || previousMovesDisplayTemp) removeLastMove();

        // If there is a piece here it needs to be removed
        if (isSquareOccupied(newSquareName))
            removePieceInSquareName(newSquareName);

        //TODO: Testing this, not sure if it works but should be okay
        // If enpassant played need to remove this piece
        if (enPassantValid && enPassantValid[0] == this.positionSquare && enPassantValid[1] == newSquareCoords){
            removePieceInSquareName(lastPiecePlayed.positionSquare);
            enPassantValid = null;
            if (consoleLogs) console.log("En passant played");
        }

        // Castling criteria: if black king starts on e8 and moves to c8 or g8 or white king starts e1 and moves to c1 or g1
        if (this.type == "king" && (this.colour == "#000000" && this.positionSquare == "e8" && (newSquareName == "c8" || newSquareName == "g8")) || 
        (this.colour == "#FFFFFF" && this.positionSquare == "e1" && (newSquareName == "c1" || newSquareName == "g1"))){
            let kingStart = this.positionSquare, kingEnd = newSquareName, rookStart, rookEnd;
            if (kingStart == "e8" && kingEnd == "c8")
                rookStart = "a8", rookEnd = "d8";
            else if (kingStart == "e8" && kingEnd == "g8")
                rookStart = "h8", rookEnd = "f8";
            else if (kingStart == "e1" && kingEnd == "c1")
                rookStart = "a1", rookEnd = "d1";
            else if (kingStart == "e1" && kingEnd == "g1")
                rookStart = "h1", rookEnd = "f1";

            //Move to king and rook
            movePiece(findPieceInSquareName(kingStart), getCoordFromSquareNotation(kingEnd));
            movePiece(findPieceInSquareName(rookStart), getCoordFromSquareNotation(rookEnd));
        } else { //Normal move
            //Moving the piece
            movePiece(this, newSquareCoords);
        }

        this.positionSquare = newSquareName;
        this.allMoves.push(this.positionSquare);
        lastPiecePlayed = this;
        
        //Update all of the other pieces valid moves. TODO, make sure this works
        getPieacesValidMoves();

        //Check if opposite colour king is in check because of this move
        // if (isKingOfColourInCheck(getPieceOppositeColour(this.colour)) == true)
        //     putKingInCheck(getPieceOppositeColour(this.colour));
        // else 
        //     removeKingInCheck(getPieceOppositeColour(this.colour));

        if (previousMovesDisplayAlways) showLastMove();
    }

    /**
     * ACTUALLY VIEW MOVEMENT FUNCTIONS OF THE PEICES LIKE THE DRONE
     */
    movePieceView (pos){
        view.up({
            name: this.body.name, 
            pos: pos,
            rot: [this.body.rotation.x * (180/Math.PI), this.body.rotation.y * (180/Math.PI), this.body.rotation.z * (180/Math.PI)]
        });
    }
}

function movePiece(obj, newSquareCoords){
    /**
     * Support funciton for the .move() method so that the castling can call this too and the parts do not repeat
     * 
     * @param {Object} obj - Object to move
     * @param {Array<Float>} newSquareCoords - Pos coords to move to
     */
    view.remove(obj.body.name);

    obj.body = view.add({
        name: obj.body.name,
        pos: newSquareCoords,
        rot: [obj.body.rotation.x * 180 / Math.PI, obj.body.rotation.y * 180 / Math.PI, obj.body.rotation.z * 180 / Math.PI],
        size: obj.body.size,
        mesh: obj.mesh,
        meshScale: obj.type == "pawn" ? [envScale / 6.5] : [envScale / 25],
        meshPos: [0,0,0],
    });

    obj.body.traverse((node) => {
        if (node.material){
            if (obj.id < getNumberOfPiecesOnBoardByType(obj.type) / 2)
                node.material = node.material.clone();
            node.material.color = new THREE.Color(obj.colour);
            node.material.emissive = new THREE.Color(obj.colour);
        }
    });
}

function getNumberOfPiecesOnBoardByType (pieceType){
    /**
     * Input string type of piece eg. knight, and return the total number of pieces there are of that type on the board.
     * 
     * @param {String} pieceType - The type of the piece i.e. "pawn"
     */
    if (pieceType == "king" || pieceType == "queen"){
        return 2;
    } else if (pieceType == "rook" || pieceType == "bishop" || pieceType == "knight"){
        return 4;
    } else if (pieceType == "pawn"){
        return 16;
    }
    console.log("getNumberOfPiecesOnBoardByType: Invalid piece type: " + pieceType);
}

function getPieceOppositeColour (colour, type = "hex"){
    /**
     * Give the colour of the piece, return the oppposite colour in hex or string. Return black by default.
     * 
     * @param {String} colour - Input colour as a hex string.
     * @param {String} type - Either "hex" or "string" input to determine the type of output. Hex by default.
     */

    let oppHexColour = colour == "#000000" ? "#FFFFFF" : "#000000";
    if (type == "hex")
        return oppHexColour;
    
    let stringColour = oppHexColour == "#000000" ? "black" : "white";
    return stringColour;
}

function findPieceInSquareName (squareNotation){
    /**
     * Given a square notation, return the piece at that location.
     * 
     * @param {String} squareNotation - A string that corresponds to a square on the board eg. a1.
     */

    for (let key in pieces) {
        for (let j = 0; j < pieces[key].length; j ++){
            if (pieces[key][j].positionSquare == squareNotation){
                return pieces[key][j];
            }
        }
    }
    // console.log("findPieceInSquareName(): Piece at " + squareNotation + " doesn't exist.");
    return false;
}

function removePieceInSquareName (squareNotation){
    /**
     * Given a square notation, remove the piece from view at that square and but into necessary taken pieces.
     * 
     * @param {String} squareNotation - A string that corresponds to a square on the board eg. a1.
     */

    let piece = findPieceInSquareName(squareNotation);
    if (piece !== undefined){
        let key = piece.colour == "#000000" ? "black" : "white";
        view.remove(piece.body.name);
        takenPieces[key].push (piece);
        pieces[key].splice(pieces[key].indexOf(piece), 1);
    } else {
        console.log("removePieceInSquareName(): Piece at " + squareNotation + " doesn't exist.");
    }
}

function movePieceInSquareNameToSquareName (squareNotationStart, squareNotationEnd, consoleLogs = true){
    /**
     * Move a peiece form squareNotation space to a different spareNotation space ie. e4 to e5
     * 
     * @param {String} squareNotationStart - A string that corresponds to a square on the board eg. a1, for the start pos
     * @param {String} squareNotationEnd - A string that corresponds to a square on the board eg. a1, for the end pos
     */
    let piece = findPieceInSquareName(squareNotationStart);
    if (piece != false)
        piece.move(squareNotationEnd, consoleLogs);
}

function getPieacesValidMoves(consoleLogs = false){
    /**
     * Get all of the pieces on the board valid moves
     */
    for (let key in pieces) {
        for (let j = 0; j < pieces[key].length; j ++){
            pieces[key][j].getValidMoves();
            if (consoleLogs) console.log(pieces[key][j].body.name + "(" + pieces[key][j].positionSquare + ") : " + pieces[key][j].validMoves);
        }
    }
}

let validMovesTemp;
function isNeighbourSquareValidRecursion (squareNotation, pieceColour, xModify, zModify){
    /**
     * Finds whether the diagonal of a given square is valid for that piece to move into, if it is then that squares diagonal in that
     * diagonal direction is found using recursion.
     * 
     * @param {String} squareNotation - A string that corresponds to a square on the board eg. a1.
     * @param {String} pieceColour - The colour of the original piece in hex.
     * @param {Integer} xModify - The number to increment the x position by eg. +1 or -1
     * @param {Integer} squareNotation - The number to increment the z position by eg. +1 or -1
     */

    let posArray = splitSquareNotation(squareNotation); 
    squareNotation = combineSquareNotation(posArray[0].charCodeAt(0) + xModify, posArray[1] + zModify);

    if (isSquareValidBoardSpace(squareNotation) && !isSquareOccupied(squareNotation)){ // Free square
        validMovesTemp.push(squareNotation);
        isNeighbourSquareValidRecursion(squareNotation, pieceColour, xModify, zModify);
    } else if (isSquareValidBoardSpace(squareNotation) && isSquareOccupied(squareNotation, getPieceOppositeColour(pieceColour))){
        validMovesTemp.push(squareNotation);
    } 
}

// function chessUpdatePosition (){
//     for (let key in pieces) {
//         for (let j = 0; j < pieces[key].length; j ++){
//             view.remove (pieces[key][j].body.name);
//             pieces[key][j].body = view.add({
//                 name: pieces[key][j].type + "_" + pieces[key][j].id,
//                 pos: [o.pos[0], 2, o.pos[2]],
//                 rot: o.rot,
//                 size: o.size,
//                 shape: pieces[key][j].shape,
//                 geometry: pieces[key][j].geometry,
//                 material: pieces[key][j].colour == "#000000" ? blackMaterial : whiteMaterial,
//                 type: 'convex', 
//                 geoScale: [ o.size ], 
//                 mass: 10, 
//                 friction:o.friction || 1,
//                 rolling:0.9,
//                 angular:0.5,
//                 margin:0.03,
//             });
//         }
//     }
// }