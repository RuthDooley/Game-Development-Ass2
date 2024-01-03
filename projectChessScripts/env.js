let env, envheightMesh = 0;
// All square positions 
let allSquareNames = ["a1" , "b1" , "c1" , "d1" , "e1" , "f1" , "g1" , "h1" , "a2" , "b2" , "c2" , "d2" , "e2" , "f2" , "g2" , "h2" , "a3" , "b3" , "c3" , "d3" , "e3" , "f3" , "g3" , "h3" , "a4" , "b4" , "c4" , "d4" , "e4" , "f4" , "g4" , "h4" , "a5" , "b5" , "c5" , "d5" , "e5" , "f5" , "g5" , "h5" , "a6" , "b6" , "c6" , "d6" , "e6" , "f6" , "g6" , "h6" , "a7" , "b7" , "c7" , "d7" , "e7" , "f7" , "g7" , "h7" , "a8" , "b8" , "c8" , "d8" , "e8" , "f8" , "g8" , "h8"];
// Square Names and their associates coords
let squareCoordAndNotation = [{name: "a1", coord: [17.77777777777778, 17.77777777777778]},{name: "b1", coord: [17.77777777777778, 15.555555555555557]},{name: "c1", coord: [17.77777777777778, 13.333333333333334]},{name: "d1", coord: [17.77777777777778, 11.11111111111111]},{name: "e1", coord: [17.77777777777778, 8.88888888888889]},{name: "f1", coord: [17.77777777777778, 6.666666666666667]},{name: "g1", coord: [17.77777777777778, 4.444444444444445]},{name: "h1", coord: [17.77777777777778, 2.2222222222222223]},{name: "a2", coord: [15.555555555555557, 17.77777777777778]},{name: "b2", coord: [15.555555555555557, 15.555555555555557]},{name: "c2", coord: [15.555555555555557, 13.333333333333334]},{name: "d2", coord: [15.555555555555557, 11.11111111111111]},{name: "e2", coord: [15.555555555555557, 8.88888888888889]},{name: "f2", coord: [15.555555555555557, 6.666666666666667]},{name: "g2", coord: [15.555555555555557, 4.444444444444445]},{name: "h2", coord: [15.555555555555557, 2.2222222222222223]},{name: "a3", coord: [13.333333333333334, 17.77777777777778]},{name: "b3", coord: [13.333333333333334, 15.555555555555557]},{name: "c3", coord: [13.333333333333334, 13.333333333333334]},{name: "d3", coord: [13.333333333333334, 11.11111111111111]},{name: "e3", coord: [13.333333333333334, 8.88888888888889]},{name: "f3", coord: [13.333333333333334, 6.666666666666667]},{name: "g3", coord: [13.333333333333334, 4.444444444444445]},{name: "h3", coord: [13.333333333333334, 2.2222222222222223]},{name: "a4", coord: [11.11111111111111, 17.77777777777778]},{name: "b4", coord: [11.11111111111111, 15.555555555555557]},{name: "c4", coord: [11.11111111111111, 13.333333333333334]},{name: "d4", coord: [11.11111111111111, 11.11111111111111]},{name: "e4", coord: [11.11111111111111, 8.88888888888889]},{name: "f4", coord: [11.11111111111111, 6.666666666666667]},{name: "g4", coord: [11.11111111111111, 4.444444444444445]},{name: "h4", coord: [11.11111111111111, 2.2222222222222223]},{name: "a5", coord: [8.88888888888889, 17.77777777777778]},{name: "b5", coord: [8.88888888888889, 15.555555555555557]},{name: "c5", coord: [8.88888888888889, 13.333333333333334]},{name: "d5", coord: [8.88888888888889, 11.11111111111111]},{name: "e5", coord: [8.88888888888889, 8.88888888888889]},{name: "f5", coord: [8.88888888888889, 6.666666666666667]},{name: "g5", coord: [8.88888888888889, 4.444444444444445]},{name: "h5", coord: [8.88888888888889, 2.2222222222222223]},{name: "a6", coord: [6.666666666666667, 17.77777777777778]},{name: "b6", coord: [6.666666666666667, 15.555555555555557]},{name: "c6", coord: [6.666666666666667, 13.333333333333334]},{name: "d6", coord: [6.666666666666667, 11.11111111111111]},{name: "e6", coord: [6.666666666666667, 8.88888888888889]},{name: "f6", coord: [6.666666666666667, 6.666666666666667]},{name: "g6", coord: [6.666666666666667, 4.444444444444445]},{name: "h6", coord: [6.666666666666667, 2.2222222222222223]},{name: "a7", coord: [4.444444444444445, 17.77777777777778]},{name: "b7", coord: [4.444444444444445, 15.555555555555557]},{name: "c7", coord: [4.444444444444445, 13.333333333333334]},{name: "d7", coord: [4.444444444444445, 11.11111111111111]},{name: "e7", coord: [4.444444444444445, 8.88888888888889]},{name: "f7", coord: [4.444444444444445, 6.666666666666667]},{name: "g7", coord: [4.444444444444445, 4.444444444444445]},{name: "h7", coord: [4.444444444444445, 2.2222222222222223]},{name: "a8", coord: [2.2222222222222223, 17.77777777777778]},{name: "b8", coord: [2.2222222222222223, 15.555555555555557]},{name: "c8", coord: [2.2222222222222223, 13.333333333333334]},{name: "d8", coord: [2.2222222222222223, 11.11111111111111]},{name: "e8", coord: [2.2222222222222223, 8.88888888888889]},{name: "f8", coord: [2.2222222222222223, 6.666666666666667]},{name: "g8", coord: [2.2222222222222223, 4.444444444444445]},{name: "h8", coord: [2.2222222222222223, 2.2222222222222223]}];
// Pieces Holder 
let pieces, takenPieces; // Black pieces first then white pieces
// Square that the selected piece can move to
let validMoveHolder, squareMesh;
// Board square holder, all the 64 squares of the board
let boardSquareHolder;
//Show previous moves always, or temp
let previousMovesDisplayAlways = true, previousMovesDisplayTemp = false;
// GUI VARS
let gui, allPieceQuiz = false, quizSelection = false, demoSelection = false;
// GAME VARS
let dialogueDelay = 3000, visualDisplayDelay = 3000, mainAvatarMove = true;
// CONTROLLER VARS
let gameController, desktopVersion = true;

function addEnvironment() {
    /**
     * Add the environment to severus if not already previously defined
     */

    if (env) return;

    let environmentMesh = view.getMesh("axelHub", "Parent_axelHub");

    env = view.add({
        name: "environment",
        pos: [10, 0, 10],
        rot: [0, -90, 0],
        meshScale: [envScale],
        meshPos: [0, envheightMesh, 0],
        mesh: environmentMesh,
    });

    view.setEnvironement({
        shadow: false,
        shadowDebug: false,
        range: 20,
        far: 30,
        near: 5,
        distance: 50,
        ambient: 0xffffff,
        intensity: 0,
        sky: "beach.hdr",
        background: "Skybox_3.jpg",
        skyShow: false,
        ground: false,
    });

    // Removing grid lines
    env.traverse(function (node) {
        if (node.name == "grid") node.visible = false;
    });

    // Env collider
    view.add({ type:"plane", friction: 1, restitution:0.0, pos:[10, -1, 10]});

    // Init the camera
    switchCamera("Board");

    aiCoLearner = new Drone ({pos:[2.2222222222222223, droneHeightInAir, 2.2222222222222223]});
    mainAvatar = new Drone ({pos:[17.77777777777778, droneHeightInAir, 17.77777777777778], meshRot: [0,270, 0]});
    boardInit();
    gameLevel(0);
}

function boardInit (){
    /**
     * Init the board squares and the notation numbers.
     */

    // Setting up the squares
    squareMesh = view.getMesh("square", "Plane");
    let n = 0, tile, colour; 
    boardSquareHolder = [];
    for (let i = 1; i < 9; i++){
        for (let j = 1; j < 9; j++){

            if (i % 2 == 0 && j % 2 != 1 || i % 2 != 0 && j % 2 == 1) colour = "#000000"; else colour = "#FFFFFF";
 
            tile = {body: view.add({ name:"tile_" + n++, pos:[(step * i), envheightMesh -0.35 , (step * j)], rot:[0,90,0], size: [1, 0.6, 1], mesh: squareMesh, meshScale: [1], meshPos:[0, envheightMesh + 0.35, 0]}), colour: colour, positionSquare: getSquareNotationFromCoords([(step * i), (step * j)]), lastMoveDisplay: false};
            tile.body.traverse((node) => {
                if (node.material){
                    if (i % 2 == 0 && j % 2 != 1 || i % 2 != 0 && j % 2 == 1)
                        node.material = node.material.clone();
                    node.material.color = new THREE.Color(tile.colour);
                }
            }); 
            boardSquareHolder.push(tile);
        } 
    }

    // Setting up the moves play squares
    validMoveHolder = [], n = 0, tile = null;
    for (let i = 1; i < 9; i++){
        for (let j = 1; j < 9; j++){
            tile = {body: view.add({ name:"validMove_" + n++, pos:[(step * i), envheightMesh-0.36, (step * j)], rot:[0,90,0], size: [1, 0.6, 1], mesh: squareMesh, meshScale: [0.5], meshPos:[0, envheightMesh+0.35, 0]}), positionSquare: getSquareNotationFromCoords([(step * i), (step * j)])};

            tile.body.traverse((node) => {
                if (node.material){
                    node.material = node.material.clone();
                    node.material.color = new THREE.Color("#808080");
                }
            }); 

            validMoveHolder.push(tile);
        }
    }

    let a = view.getMesh("a", "a"), b = view.getMesh("b", "b"), c = view.getMesh("c", "c"), d = view.getMesh("d", "d"), e = view.getMesh("e", "e"), f = view.getMesh("f", "f"), g = view.getMesh("g", "g"), h = view.getMesh("h", "h");
    let n1 = view.getMesh("1", "1"), n2 = view.getMesh("2", "2"), n3 = view.getMesh("3", "3"), n4 = view.getMesh("4", "4"), n5 = view.getMesh("5", "5"), n6 = view.getMesh("6", "6"), n7 = view.getMesh("7", "7"), n8 = view.getMesh("8", "8");
    let boardNotationLetter = [h, g, f, e, d, c, b, a];
    let boardNotationNumber = [n8, n7, n6, n5, n4, n3, n2, n1];

    // Setting up square letters
    n = 0; 
    for (let i = 1; i < 9; i++){
        view.add({ name:"number_" + n++, pos:[(step * i), envheightMesh, (step * 0)], rot:[270,0,90], size: [step, 0.6, step], mesh: boardNotationNumber[i - 1], meshScale: [envScale / 20], meshPos:[-0.5, 0, 0]}); //Right
        view.add({ name:"number_" + n++, pos:[(step * i), envheightMesh, (step * 9)], rot:[270,0,90], size: [step, 0.6, step], mesh: boardNotationNumber[i - 1], meshScale: [envScale / 20], meshPos:[0, -0.25, 0]}); //Left
    }

    // Setting up square numbers
    n = 0; 
    for (let i = 1; i < 9; i++){
        view.add({ name:"letter_" + n++, pos:[(step * 0), envheightMesh, (step * i)], rot:[270,0,90], size: [step, 0.6, step], mesh: boardNotationLetter[i - 1], meshScale: [envScale / 20], meshPos:[-0.25, -0.75, 0]});
        view.add({ name:"letter_" + n++, pos:[(step * 9), envheightMesh, (step * i)], rot:[270,0,90], size: [step, 0.6, step], mesh: boardNotationLetter[i - 1], meshScale: [envScale / 20], meshPos:[-0.25, 0, 0]});
    }
}

function piecesInitRegular (){
    /**
     * Init the pieces of an ordinary chess game.
     */

    lastPiecePlayed = null, enPassantValid = null;
    pieces = [];
    for (let i = 1; i <= 8; i++){
        for (let j = 1; j <= 8; j++){
            if (i == 2 || i == 7){
                pieces.push(new Pawn({pos: [step * i, 0, step * j]}));
            } else if (i == 1 || i == 8){
                switch (j){
                    case 1:
                    case 8:
                        pieces.push(new Rook({pos: [step * i, 0, step * j]}));
                        break;
                    case 2:
                    case 7:
                        pieces.push(new Knight({pos: [step * i, 0, step * j]}));
                        break;
                    case 3:
                    case 6:
                        pieces.push(new Bishop({pos: [step * i, 0, step * j]}));
                        break;
                    case 4:
                        pieces.push(new King({pos: [step * i, 0, step * j]}));
                        break;
                    case 5:
                        pieces.push(new Queen({pos: [step * i, 0, step * j]}));
                        break;
                    default:
                        console.log("Error in demo(), invalid piece placement");
                        break;
                }
            }
        }
    }

    // Split into white and black temporarily and then push to pieces
    let whitePieces = [], blackPieces = [];
    pieces.forEach((piece) => {
        if (piece.colour == "#000000")
            blackPieces.push(piece);
        else
            whitePieces.push(piece);
    });
    pieces = {"white": whitePieces, "black": blackPieces};
    takenPieces = {"white": [], "black": []};

    // Init all of the pieces valid moves after the board is set up.
    getPieacesValidMoves();
}
let boardSquareExample = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
    [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
    [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
    [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
    [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
    [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
    [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
    [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];

function piecesInitManual (boardSquareInit){
    /**
     * Set up the board with the boardSquareInit configuration
     */

    if (boardSquareInit == undefined) boardSquareInit = boardSquareExample;
    removeLastMove();
    lastPiecePlayed = null;
    pieces = {"white": [], "black": []};
    let colourString, colourHex, pieceType, pieceCoords;
    for (let i = 0; i < boardSquareInit.length; i ++){
        for (let j = 0; j < boardSquareInit[i].length; j ++){
            // console.log(boardSquareInit[i][j][1]);
            if (boardSquareInit[i][j][1].length == 0)
                continue;
            
            colourString = boardSquareInit[i][j][1][0];
            colourHex = colourString == "white" ? "#FFFFFF" : "#000000";
            pieceType = boardSquareInit[i][j][1][1];
            pieceCoords = getCoordFromSquareNotation(boardSquareInit[i][j][0]);
            switch (pieceType){
                case "bishop":
                    pieces[colourString].push(new Bishop({pos: pieceCoords, colour: colourHex}));
                    break;
                case "king":
                    pieces[colourString].push(new King({pos: pieceCoords, colour: colourHex}));
                    break;
                case "knight":
                    pieces[colourString].push(new Knight({pos: pieceCoords, colour: colourHex}));
                    break;
                case "pawn":
                    pieces[colourString].push(new Pawn({pos: pieceCoords, colour: colourHex}));
                    break;
                case "queen":
                    pieces[colourString].push(new Queen({pos: pieceCoords, colour: colourHex}));
                    break;
                case "rook":
                    pieces[colourString].push(new Rook({pos: pieceCoords, colour: colourHex}));
                    break;
                default:
                    console.log("piecesInitManual(): Error case found = " + pieceType);
                    break;
            }
        }
    }

    takenPieces = {"white": [], "black": []};
    getPieacesValidMoves();
}

function piecesRemove (){
    /**
     * Remove all of the pieces in the environment and reset the number of pieces
     */

    for (let key in pieces) {
        for (let j = 0; j < pieces[key].length; j ++){
            view.remove (pieces[key][j].body.name);
        }
    }

    pieces = {"white": [], "black": []};
    takenPieces = undefined;
    bishopCount = 0, kingCount = 0, knightCount = 0, pawnCount = 0, queenCount = 0, rookCount = 0;
}

function getSquareNotationFromCoords (coord){
    /**
     * Input a squares coords and outputs the square name
     * 
     * @param {Array} coord - A 2D array of the coord eg. [17.77777777777778, 17.77777777777778]
     */

    for (let i = 0; i < squareCoordAndNotation.length; i++){
        if (squareCoordAndNotation[i].coord[0] == coord[0] && squareCoordAndNotation[i].coord[1] == coord[1])
            return squareCoordAndNotation[i].name;
    }
}

function getCoordFromSquareNotation (squareNotation){
    /**
     * Give a square on the board eg. d8, returns the coords on the board [2.2222222222222223, 11.11111111111111]
     * 
     * @param {String} squareNotation - A string that corresponds to a square on the board eg. a1
     */
    for (let i = 0; i < squareCoordAndNotation.length; i++){
        if (squareCoordAndNotation[i].name == squareNotation)
            return [squareCoordAndNotation[i].coord[0], 0, squareCoordAndNotation[i].coord[1]];
    }
}

function isSquareOccupied(square, colour){
    /**
     * Return true if the square "square" is occupied BY the colour of colour "colour" and return false if the square 
     * "square" is not occupied or occupied by the opposite colour.
     * 
     * @param {Any} square - Array of coords eg. [17.77777777777778, 17.77777777777778] or string type square name eg. "h8"
     * @param {String} colour - The check of the colour of the piece. If undefined, check if the square is occupied in general.
     */

    if (typeof (square) != "string") square = getSquareNotationFromCoords(square); 

    if (colour == "#000000" || colour == "#FFFFFF"){
        colour = colour == "#000000" ? "black" : "white";        
        for (let j = 0; j < pieces[colour].length; j ++){
            if (pieces[colour][j].positionSquare == square)
                return true;
        }
    } else {
        for (let key in pieces) {
            for (let j = 0; j < pieces[key].length; j ++){
                if (pieces[key][j].positionSquare == square)
                    return true;
            }
        }
    }

    return false;
}

function isSquareValidBoardSpace(squareName){
    /**
     * Return true if the square (square notation) is a valid board space, i.e a combination of a - h and 1 - 8 inclusive.
     * 
     * @param {String} squareName - A string that corresponds to a square on the board eg. a1
     */

    if (allSquareNames.includes(squareName))
        return true;
    return false;
}

function splitSquareNotation (squareNotation){
    /**
     * Given a square notation, return an array of the letter and the number elements split. Only works for 2 character long string, works for all valid square notation.
     * 
     * @param {String} squareNotation - A string that corresponds to a square on the board eg. a1.
     */
    let result = squareNotation.split("");

    return [result[0], parseInt(result[1])];
}

function combineSquareNotation (letter, number){
    /**
     * Given a letter and number, combine and return the square notation.
     * 
     * @param {Any} letter - The first part of a squareNotation, the letter element. Range between a - h inclusive, Can also 
     *                          pass in the ascii equvalent of these letters 97 - 104 inclusive.
     * @param {Integer} number - The second part of a squareNotation, the number element. Range between 1 - 8 inclusive.
     */

    if (typeof (number) != "number") number = parseInt(number);
    if (typeof (letter) != "string") letter = String.fromCharCode(letter);

    return letter + number.toString();
}

function showLastMove(){
    /**
     * This is the visual display for the last move that was played, it is indicated by a red square at the start posiotn and 
     * a red square at the end position
     */

    if (lastPiecePlayed == null) return;
    let after = lastPiecePlayed.allMoves[lastPiecePlayed.allMoves.length - 1];
    // If there is no before move, then take original move
    let before = lastPiecePlayed.allMoves[lastPiecePlayed.allMoves.length - 2] == undefined ? lastPiecePlayed.originalPosition : lastPiecePlayed.allMoves[lastPiecePlayed.allMoves.length - 2];

    // Find the board squares with these names 
    for (let i = 0; i < boardSquareHolder.length; i++){
        if (boardSquareHolder[i].positionSquare == after || boardSquareHolder[i].positionSquare == before){
            boardSquareHolder[i].lastMoveDisplay = true;
            boardSquareHolder[i].body.traverse((node) => {
                if (node.material){
                    node.material = node.material.clone();
                    node.material.color = new THREE.Color("#B22222");
                }
            }); 
        }
    }

    previousMovesDisplayTemp = true;
}

function removeLastMove(){
    /**
     * Remove the last move display from the board
     */
    
    previousMovesDisplayTemp = false;

    // Find the board that have colour = 
    for (let i = 0; i < boardSquareHolder.length; i++){
        if (boardSquareHolder[i].lastMoveDisplay == true){
            boardSquareHolder[i].body.traverse((node) => {
                if (node.material){
                    node.material = node.material.clone();
                    node.material.color = new THREE.Color(boardSquareHolder[i].colour);
                }
            });

            boardSquareHolder[i].lastMoveDisplay = false;
        }
    }
}

/**
 * CAMERA HANDELLER
 */
function switchCamera(type, droneObj = undefined) {
    view.follow(""); // Preset to folow drone, remove this

    let rotation;
    if (droneObj) rotation = droneObj.id == 0 ? 90 : 270;
    // Allow for these in each case
    switch (type){
        case "Drone":
            view.getController().enableRotate = false;
            view.getController().enableZoom = false;

            view.follow(droneObj.body.name, {
                distance: 10, // Distance away from the coLearner
                theta: rotation, 
                phi: 0,
                height: 3, // Hieght above the coLearner
                stiffness: 0,
            });
            break;

        case "Board":
            view.getController().enableRotate = true;
            view.getController().enableZoom = true;
            view.moveCam({
                height: 10,
                h: -240, // Spin value
                v: 40,
                d: 48.5,
                target: [10, 0, 10],
                clipper: false,
            });
            break;
        case "Overview":
            view.getController().enableRotate = true;
            view.getController().enableZoom = true;
            view.moveCam({
                height: 10,
                h: 90,
                v: 90,
                d: 45,
                target: [10, 0, 10],
                clipper: false,
            });
            break;
        
        default:
            console.log("switchCamera(): Error invalid type, entered " + type);
            break;
    }
}