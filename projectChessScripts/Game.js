async function gameLevel (levelNumber){
    if (levelNumber == 0) {
        tweenPosition(aiCoLearner, aiCoLearner.originPosition);
        tweenPosition(mainAvatar, mainAvatar.originPosition);
        piecesRemove();
        if (desktopVersion) gameController = new Controller();
        return;
    }

    allDemonstrations(levelNumber);
}

/**
 * DEMO CODE
 */
async function allDemonstrations (levelNumber){
    let numLevels = 15;
    if (levelNumber > numLevels) return;
    // Demo variables
    let boardSquareInit, droneDialogue, movePieceFrom, movePieceTo;
    piecesRemove();
    switch (levelNumber){
        // PAWN DEMOS
        case 1:
            // Board pos, drone dialogue
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", ["white", "pawn"]], ["b2", ["white", "pawn"]], ["c2", ["white", "pawn"]], ["d2", ["white", "pawn"]], ["e2", ["white", "pawn"]], ["f2", ["white", "pawn"]], ["g2", ["white", "pawn"]], ["h2", ["white", "pawn"]]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "The pawns begin on the\nsecond row from the back.";
            break;
        case 2:
            // Board pos, drone dialogue, move piece move piece to
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", ["white", "pawn"]]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "On a pawn's first move,\n it can move 1 or 2 spaces.";
            movePieceFrom = "h2";
            movePieceTo = "h4";
            break;
        case 3:
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", ["black", "pawn"]], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", ["white", "pawn"]], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "If the pawn has\nalready moved, it\ncan only move one space.";
            movePieceFrom = "e3";
            movePieceTo = "e4";
            break;
        // ROOK DEMOS
        case 4:
            // Board pos, drone dialogue
            boardSquareInit = [[["a8", ["black", "rook"]], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", ["black", "rook"]]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", ["white", "rook"]], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", ["white", "rook"]]]];
            droneDialogue = "The rooks begin on\nthe corners of the board.";
            break;
        case 5:
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", ["white", "rook"]], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "A rook can move\nvertically and horizontally\non the board.";
            movePieceFrom = "d3";
            movePieceTo = "d7";
            break;
        case 6:
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", ["white", "rook"]], ["d5", []], ["e5", ["white", "pawn"]], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "A rook cannot move\nthrough other pieces.";
            movePieceFrom = "c5";
            movePieceTo = "c7";
            break;
        //BISHOP DEMOS
        case 7:
            // Board pos, drone dialogue
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", ["black", "bishop"]], ["d8", []], ["e8", []], ["f8", ["black", "bishop"]], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", []], ["c1", ["white", "bishop"]], ["d1", []], ["e1", []], ["f1", ["white", "bishop"]], ["g1", []], ["h1", []]]];
            droneDialogue = "The bishops begin\non the back row on\nthe c and f ranks.";
            break;
        case 8:
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", ["white", "bishop"]], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "A bishop can\nmove diagonally\nacross the board.";
            movePieceFrom = "b2";
            movePieceTo = "e5";
            break;
        case 9:
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", ["white", "bishop"]], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", ["white", "pawn"]], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "A bishop cannot move\nthrough other pieces.";
            movePieceFrom = "d5";
            movePieceTo = "e4";
            break;
        //QUEEN DEMOS
        case 10:
            // Board pos, drone dialogue
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", ["black", "queen"]], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", ["white", "queen"]], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "Each colour\nhas one queen that\nbegins on the d file.";
            break;
        case 11:
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", ["white", "pawn"]], ["d5", []], ["e5", ["white", "pawn"]], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", ["white", "queen"]], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", ["white", "pawn"]], ["d3", []], ["e3", ["white", "pawn"]], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "A queen can move\nvertically and horizontally\non the board.";
            movePieceFrom = "d4";
            movePieceTo = "d7";
            break;
        case 12:
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", ["white", "pawn"]], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", ["white", "pawn"]], ["d4", ["white", "queen"]], ["e4", ["white", "pawn"]], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", ["white", "pawn"]], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "A queen can\nmove diagonally\nacross the board.";
            movePieceFrom = "d4";
            movePieceTo = "g7";
            break;
        //KNIGHT DEMOS
        case 13:
            // Board pos, drone dialogue
            boardSquareInit = [[["a8", []], ["b8", ["black", "knight"]], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", ["black", "knight"]], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", ["white", "knight"]], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", ["white", "knight"]], ["h1", []]]];
            droneDialogue = "The knights begin\non the back row on\nthe b and g ranks.";
            break;
        case 14:
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", []], ["d3", ["white", "knight"]], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "A knight moves in an L shape.\n2 squares horizontally or vertically,\nthen 1 space perpindicularly.";
            movePieceFrom = "d3";
            movePieceTo = "e5";
            break;
        case 15:
            boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                [["a4", []], ["b4", []], ["c4", ["black", "pawn"]], ["d4", ["black", "pawn"]], ["e4", ["black", "pawn"]], ["f4", []], ["g4", []], ["h4", []]],
                [["a3", []], ["b3", []], ["c3", ["white", "knight"]], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
            droneDialogue = "A knight is the\nonly piece that can\njump over other pieces.";
            movePieceFrom = "c3";
            movePieceTo = "d5";
            break;
        default:
            console.log("allDemonstrations(): This level does not exist " + levelNumber);
            break;
    }
    piecesInitManual(boardSquareInit);
    if (movePieceTo == undefined) await sampleDemoNoVisual(droneDialogue);
    else await sampleDemonstration(droneDialogue, movePieceFrom, movePieceTo);
}

async function sampleDemonstration (droneDialogue, movePieceFrom, movePieceTo){
    /**
     * The sample demo template
     */

    // Dialogue
    AIdroneDialogue(droneDialogue);
    await sleep(dialogueDelay);
    removeAIdroneDialogue();

    // Visual Display
    switchCamera("Overview");
    getPieacesValidMoves();
    tweenPosition(aiCoLearner, aiCoLearner.originPosition);
    findPieceInSquareName(movePieceFrom).validMovesDisplay();
    await sleep(visualDisplayDelay);

    // Move the piece
    findPieceInSquareName(movePieceFrom).removeValidMoveDisplay();
    switchCamera("Board");
    await aiCoLearner.movePieceTo(movePieceFrom, movePieceTo);
    // movePiece(findPieceInSquareName(movePieceFrom), getCoordFromSquareNotation(movePieceTo));
}

async function sampleDemoNoVisual (droneDialogue){
    /**
     * This is the example demo that has no piece movement, or visual of valid piece moves. The piece just moves.
     */

    // Dialogue
    AIdroneDialogue(droneDialogue);
    await sleep(dialogueDelay);
    removeAIdroneDialogue();

    // Visual Display
    switchCamera("Overview");
    await sleep(visualDisplayDelay);
}

function AIdroneDialogue (spriteText){
    /**
     * The ai drone text sprite change and dialogue sound. Camera change position too.
     */

    view.s3d.playSound(droneSpeak, 100, false); // Sound
    switchCamera("Drone", aiCoLearner);
    aiCoLearner.changeSpriteText(spriteText);
}

function removeAIdroneDialogue (){
    /**
     * Remove the ai dialogue and change the camera position to the original 
     */

    switchCamera("Board");
    aiCoLearner.changeSpriteText("");
}

/**
 * INDIVIDUAL QUIZZES
 */

async function individualQuiz (){
    /**
     * Calls the appropriate quiz level for the piece type. The specific level is randomised in that group.
     */

    // let randomNumber = Math.floor(Math.random() * 5);
    await boardInitIndivQuiz (0, 1);
}

async function boardInitIndivQuiz (pieceType, levelNumber){
    /**
     * Holds all of the quiz setups. Setups up the pieces and responsible for task verification afterwards. 
     */

    let boardSquareInit, pieceToMoveSquare, taskVerif, failDialogue;
    piecesRemove();
    // Piece type: 0 - 4 (Order of quiz):
    switch (pieceType){
        // PAWN
        case 0:
            droneDialogue = "Move the white pawn\nto a valid positon";
            switch (levelNumber){
                case 0:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", ["white", "pawn"]]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "h2";
                    failDialogue = "On a pawn's first move,\n it can move 1 or 2 spaces.";
                    break;
                case 1:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", ["black", "pawn"]], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", ["white", "pawn"]], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "a2";
                    failDialogue = "The pawn can only\nmove one space here";
                    break;
                case 2:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", ["black", "pawn"]], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", ["white", "pawn"]], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "c2";
                    failDialogue = "On a pawn's first move,\n it can move 1 or 2 spaces.";
                    break;
                default:
                    console.log("boardInitIndivQuiz(): Invalid levelNumber entered, input " + levelNumber);
                    break; 
            }
            break;
        // ROOK
        case 1:
            droneDialogue = "Move the white rook\nto a valid positon";
            switch (levelNumber){
                case 0:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", ["white", "rook"]], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "b3";
                    failDialogue = "A rook can move\nvertically and horizontally\non the board";
                    break;
                case 1:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", ["white", "pawn"]], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", ["white", "rook"]], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "b3";
                    failDialogue = "A rook can move\nvertically and horizontally\non the board and\ncannot move through pieces";
                    break;
                case 2:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", ["white", "pawn"]], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", ["white", "rook"]], ["e4", ["white", "pawn"]], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", ["white", "pawn"]], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "d4";
                    failDialogue = "A rook cannot move through pieces";
                    break;
                default:
                    console.log("boardInitIndivQuiz(): Invalid levelNumber entered, input " + levelNumber);
                    break; 
            }
            break;
        // BISHOP
        case 2:
            droneDialogue = "Move the white bishop\nto a valid positon";
            switch (levelNumber){
                case 0:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", ["white", "bishop"]], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "d3";
                    failDialogue = "A bishop can only\nmove diagonally\nacross the board.";
                    break;
                case 1:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", ["white", "bishop"]], ["d6", ["white", "pawn"]], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "c6";
                    failDialogue = "A bishop can only\nmove diagonally\nacross the board.";
                    break;
                case 2:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", ["white", "pawn"]], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", ["white", "bishop"]], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", ["white", "pawn"]], ["c5", []], ["d5", ["white", "pawn"]], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "c6";
                    failDialogue = "A bishop cannot\nmove through other pieces.";
                    break;
                default:
                    console.log("boardInitIndivQuiz(): Invalid levelNumber entered, input " + levelNumber);
                    break; 
            }
            break;
        // QUEEN
        case 3:
            droneDialogue = "Move the white queen\nto a valid positon";
            switch (levelNumber){
                case 0:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", ["white", "queen"]], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "d3";
                    failDialogue = "A queen can move\nvertically and horizontally\non the board.";
                    break;
                case 1:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", ["white", "queen"]], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "c4";
                    failDialogue = "A queen can move\nvertically and horizontally\non the board.";
                    break;
                case 2:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", ["white", "pawn"]], ["d5", ["white", "pawn"]], ["e5", ["white", "pawn"]], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", ["white", "pawn"]], ["d4", ["white", "queen"]], ["e4", ["white", "pawn"]], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", ["white", "pawn"]], ["e3", ["white", "pawn"]], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "d4";
                    failDialogue = "A queen cannot\nmove through other pieces.";
                    break;
                default:
                    console.log("boardInitIndivQuiz(): Invalid levelNumber entered, input " + levelNumber);
                    break; 
            }
            break;
        //KNIGHT
        case 4:
            droneDialogue = "Move the white knight\nto a valid positon";
            switch (levelNumber){
                case 0:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", ["white", "knight"]], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "d4";
                    failDialogue = "A knight moves\nin an L shape";
                    break;
                case 1:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", ["white", "knight"]], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", []], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "c5";
                    failDialogue = "A knight moves\nin an L shape";
                    break;
                case 2:
                    boardSquareInit = [[["a8", []], ["b8", []], ["c8", []], ["d8", []], ["e8", []], ["f8", []], ["g8", []], ["h8", []]],
                        [["a7", []], ["b7", []], ["c7", []], ["d7", []], ["e7", []], ["f7", []], ["g7", []], ["h7", []]],
                        [["a6", []], ["b6", []], ["c6", []], ["d6", []], ["e6", []], ["f6", []], ["g6", []], ["h6", []]],
                        [["a5", []], ["b5", []], ["c5", []], ["d5", []], ["e5", []], ["f5", []], ["g5", []], ["h5", []]],
                        [["a4", []], ["b4", []], ["c4", []], ["d4", []], ["e4", []], ["f4", []], ["g4", ["white", "knight"]], ["h4", []]],
                        [["a3", []], ["b3", []], ["c3", []], ["d3", []], ["e3", []], ["f3", []], ["g3", []], ["h3", []]],
                        [["a2", []], ["b2", []], ["c2", []], ["d2", []], ["e2", []], ["f2", []], ["g2", []], ["h2", []]],
                        [["a1", []], ["b1", []], ["c1", []], ["d1", []], ["e1", []], ["f1", []], ["g1", []], ["h1", []]]];
                    pieceToMoveSquare = "g4";
                    failDialogue = "A knight moves\nin an L shape";
                    break;
                default:
                    console.log("boardInitIndivQuiz(): Invalid levelNumber entered, input " + levelNumber);
                    break; 
            }
            break;
        default:
            console.log("boardInitIndivQuiz(): Invalid pieceType entered, input " + pieceType);
            break; 
    }

    // Dialogue
    AIdroneDialogue(droneDialogue);
    await sleep(dialogueDelay);
    removeAIdroneDialogue();

    // Board init
    switchCamera("Board");
    piecesInitManual(boardSquareInit);
    getPieacesValidMoves();
    pieceToMove = findPieceInSquareName(pieceToMoveSquare);
    taskVerif = pieceToMove.validMoves;

    // Every 5 seconds check if the piece has moved
    // mainAvatarMove = true;
    while (pieceToMove.positionSquare == pieceToMoveSquare){
        await sleep(2500);
    }
    // mainAvatarMove = false;

    // Task verification
    removeLastMove();
    if (taskVerification(pieceToMove, taskVerif)) await taskComplete();
    else await taskFailed(boardSquareInit, pieceToMoveSquare, taskVerif, failDialogue);

    tweenPosition(mainAvatar, mainAvatar.originPosition);
    tweenPosition(aiCoLearner, aiCoLearner.originPosition);

    // Board init
    removeLastMove();
    switchCamera("Board");
    piecesRemove();
    // piecesInitRegular();
}

function mainDroneDialogue (spriteText){
    /**
     * The main avatar drone text sprite change and dialogue sound. Camera change position too.
     */

    view.s3d.playSound(droneSpeak, 100, false); // Sound
    switchCamera("Drone", mainAvatar);
    mainAvatar.changeSpriteText(spriteText);
}

function removeMainDroneDialogue (){
    /**
     * Remove the main avatar drone and change the camera position to the original too.
     */

    switchCamera("Board");
    mainAvatar.changeSpriteText("");
}

function taskVerification (pieceObj, taskVerif){
    /**
     * Task verification for the quizzes, checks if the piece that is meant to have moved, is in one of the valid end pieces.
     */

    for (let i = 0; i < taskVerif.length; i++){
        if (pieceObj.positionSquare == taskVerif[i])
            return true;
    }
    return false;
}

async function taskComplete(){
    /**
     * Task complete action, victory animation.
     */

    // Dialogue
    AIdroneDialogue("Task Complete");
    aiCoLearner.playVictoryAnimation(1000); // Victory animation
    aiCoLearner.confetti();
    await sleep(dialogueDelay);
    removeAIdroneDialogue();
}

async function taskFailed(boardSquareInit, pieceToMoveSquare, taskVerif, failDialogue){
    /**
     * Task failed action, fail animation. AI Co learner demonstrates a valid move and says the failDialogue.
     */

    // Move main avatar back 
    tweenPosition(mainAvatar, 1000);

    // Dialogue
    AIdroneDialogue("Task Failed");
    aiCoLearner.playBumpAnimation(1000);
    await sleep(dialogueDelay);
    removeAIdroneDialogue();

    // Board init to original puzzle 
    piecesRemove();
    switchCamera("Board");
    piecesInitManual(boardSquareInit);
    getPieacesValidMoves();
    tweenPosition(mainAvatar, mainAvatar.originPosition);

    // AiCoLearner, move piece to valid piece
    await aiCoLearner.movePieceTo(pieceToMoveSquare, taskVerif[0]);

    // Dialogue
    AIdroneDialogue(failDialogue);
    await sleep(dialogueDelay);
    removeAIdroneDialogue();
}


/**
 * COMBINED QUIZZES
 */

async function combinedQuiz (pieceType, levelNumber){
    await boardInitIndivQuiz(pieceType, levelNumber);
}

/**
 * SKULPT MOVES
*/
async function move (movePieceFrom, movePieceTo){
    await mainAvatar.movePieceTo(movePieceFrom, movePieceTo);
    movePieceInSquareNameToSquareName(movePieceFrom, movePieceTo);
}

/**
 * QUIZ PLANNING:
 * 
 * PAWN:
 * 1) Move one square ahead
 * 2) Move 2 squares on the first go (allow move 1 but ai says 2 moves also valid)
 * 3) Take piece on the diagonal
 * * Quiz - mixing the above
 * 
 * ROOK:
 * 1) Moving in any space horizontal 
 * 2) Move any space in the verticl
 * 3) Cannot jump over a piece (Demo valid moves and point out the squares that are prohibited)
 * * Quiz - mixing the above
 * 
 * Bishop
 * 1) Moving in any space on the diagonal 
 * 2) Cannot jump over a piece (Demo valid moves and point out the squares that are prohibited)
 * * Quiz - mixing the above
 * 
 * QUEEN
 * 1) Moves like the rook can go horizonal in either direction
 * 2) Moves like bishop can go diagnoal in any direction
 * 3) Cannot jump over a piece (Box it in and give option of valid move)
 * * Quiz - mixing the above
 * 
 * KNIGHT
 * 1) Moves in an L shape 
 * 2) Can jump over pieces - is the only piece that can jump over pieces
 * * Quiz - mixing the above
 * 
 * KING
 * 1) Can't move into check
 * 2) 
 */

/**
 * DEMOS: ON AND OFF
 * LESSON SELECTION; PIECE DROPDOWN
 * LEARN THE MOVES DEMO 
 */