function createGUI() {
    /**
     * GUI creation at the beginnig of the env creation, starts on the game mode = yes and demo selection piece for the practice game mode
     */
    if (!gui) {
        gui = new UIL.Gui({
            w: window.innerWidth * 0.3,
            h: window.innerHeight * 0.05,
            close: true,
            css: "z-index: 9999999999999999999999999; position:absolute; left:0%; top:0%; background-color: rgba(44,44,44,0.8);",
        });
        GUIGameMode();
        GUIDemoSelection();
    }
}

function GUIGameMode(){
    gui.add("selector", {
        name:"Game Mode",
        values:["Demo", "Quiz"],
    }).onChange(
        (v) => {
            if (v == "Demo"){
                GUIDemoSelection();
                if (allPieceQuiz){
                    gui.clearIndividualByText("Individual Piece Practice");
                    allPieceQuiz = false;
                }
                gui.clearIndividualByText("Quiz Selection");
            } else if (v == "Quiz"){
                GUIAllPieceQuiz();
                gui.clearIndividualByText("Quiz Selection");
                GUIQuizSelection();
                if (demoSelection){
                    gui.clearIndividualByText("Demo Selection");
                    demoSelection = false;
                }
            }
        }
    );
}

function GUIAllPieceQuiz(){
    let randomNumber, randomNumber1;
    if (allPieceQuiz == false){
        gui.add("selector", {
            name:"Individual Piece Practice",
            values:["Yes", "No"],
            value: "Yes",
        }).onChange(
            (v) => {
                gui.clearIndividualByText("Quiz Selection");
                if (v == "Yes"){
                    GUIQuizSelection();
                } else if (v == "No"){
                    gui.clearIndividualByText("Quiz Selection");
                    quizSelection == false;

                    randomNumber = Math.floor(Math.random() * 4);
                    randomNumber1 = Math.floor(Math.random() * 2);
                    combinedQuiz(randomNumber,randomNumber1); // TODO: Change to random
                }
            }
        );
        allPieceQuiz = true;
    }
}

function GUIQuizSelection(){
    let randomNumber;
    if (quizSelection == false){
        gui.add("list", {
            name: "Quiz Selection",
            list: ["Pawn", "Rook", "Bishop", "Queen", "Knight"],
            value: "Select Piece Quiz",
        }).onChange(
            async (v) => {
                // TODO
                randomNumber = Math.floor(Math.random() * 2);
                if (v == "Pawn")
                    await boardInitIndivQuiz(0,randomNumber);
                if (v == "Rook")
                    await boardInitIndivQuiz(1,randomNumber);
                if (v == "Bishop")
                    await boardInitIndivQuiz(2,randomNumber);
                if (v == "Queen")
                    await boardInitIndivQuiz(3,randomNumber);
                if (v == "Knight")
                    await boardInitIndivQuiz(4,randomNumber);
            }
        );
        quizSelection == true;
    }
}

function GUIDemoSelection (){
    if (demoSelection == false){
        gui.add("list", {
            name: "Demo Selection",
            list: ["Pawn", "Rook", "Bishop", "Queen", "Knight"],
            value: "Select Piece Demo",
        }).onChange(
            async (v) => {
                await demoSelector(v);
            }
        );
        demoSelection = true;
    }
}

async function demoSelector (v){
    // Remove controller
    if (desktopVersion) {
        view.remove(gameController.body.name);
        gameController = null;
    }
    
    let pieceLevels = {
        "pawn": [1, 2, 3],
        "rook": [4, 5, 6],
        "bishop": [7, 8, 9],
        "queen": [10, 11, 12],
        "knight": [13, 14, 15]
    };

    let piece = v.toLowerCase();
    let levels = pieceLevels[piece];

    await allDemonstrations(levels[0]);
    await allDemonstrations(levels[1]);
    await allDemonstrations(levels[2]);

    gameLevel(0);
}