//Biffin Charles Minesweeper implementation
class Minesweeper {
    static get SIZE() {
        return 15;
    }

    static get BOMB() {
        return "B";
    }

    static get EMPTY() {
        return "E";
    }

    // PLACE YOUR PROPERTIES BELOW
    bombs = 0;
    cells;
    rows;
    columns;
    // PLACE YOUR PROPERTIES ABOVE

    constructor(rows = Minesweeper.SIZE, columns = Minesweeper.SIZE, probability_chance = 0.1) {
        // PLACE YOUR PROPERTIES BELOW

        this.cells = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.cells[i] = new Array(columns);
        }
        this.rows = rows;
        this.columns = columns;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j] = create_button();
                this.cells[i][j].board = this;
                this.cells[i][j].isOpen = false;
                this.cells[i][j].hasFlag = false;
                this.cells[i][j].disabled = false;
                this.cells[i][j].setAttribute("y",j)
                this.cells[i][j].setAttribute("x",i)
                this.cells[i][j].onclick = this._open;
                this.cells[i][j].oncontextmenu = this._flag;
                if(Math.random() < probability_chance){
                    this.bombs++;
                    this.cells[i][j].value = "B";
                } else {
                    this.cells[i][j].value = 0;
                }
            }
            create_line_break();
        }
        this.flood_fill();
        this.init_board();
        this.lock();
        // PLACE YOUR PROPERTIES ABOVE
    }

    init_board() {
        // PLACE YOUR IMPLEMENTATION BELOW
        let _this = this;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j].isOpen = false;
                this.cells[i][j].hasFlag = false;
                this.cells[i][j].innerHTML = '<img src="assets/empty.png" width="40px" height="40px"/>';
            }
        }

        // Display "Game Over" text
        document.getElementById("game_over").style.display = "none";
        // PLACE YOUR IMPLEMENTATION ABOVE
    }

    flood_fill() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.cells[i][j].value !== "B") {
                    let bomb_count = 0;
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            if (i + x >= 0 && j + y >= 0 && i + x < this.rows && j + y < this.columns) {
                                if (this.cells[i + x][j + y].value === "B") {
                                    bomb_count++;
                                }
                            }
                        }
                    }
                    this.cells[i][j].value = bomb_count;
                }
            }
        }
    }

    lock() {
        // PLACE YOUR IMPLEMENTATION BELOW
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j].disabled = true;
            }
        }
        // PLACE YOUR IMPLEMENTATION ABOVE
    }

    unlock() {
        // PLACE YOUR IMPLEMENTATION BELOW
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j].disabled = false;
            }
        }
        // PLLE YOUR IMPLEMENTATION ABOVE
    }

    _flag() {
        // PLACE YOUR IMPLEMENTATION BELOW
        let target = this;

        if(!target.isOpen) {
            if (target.hasFlag) {
                target.innerHTML = '<img src="./assets/empty.png" width="40px" height="40px"/>';
                target.hasFlag = false;
            } else {
                target.innerHTML = '<img src="./assets/flag.png" width="40px" height="40px"/>';
                target.hasFlag = true;
            }
        }
        return false;
        // PLACE YOUR IMPLEMENTATION ABOVE
    }

    _open() {
        // PLACE YOUR IMPLEMENTATION BELOW
        let target = this;
        if(target.hasFlag){
            return;
        }

        target.disabled = true;

        let filename = "";
        if (target.value == "B"){
            filename = "bomb"
        }else{
            filename = target.value;
        }

        target.innerHTML = '<img src="./assets/' + filename + '.png" width="40px" height="40px"/>';

        if (target.value === "B") {
            target.board.lock();
            document.getElementById("game_over").style.color = "red";
            document.getElementById("game_over").innerHTML = "Game Over!";
            document.getElementById("game_over").style.display = "block";

        }else{
            target.board.explore(parseInt(target.getAttribute("x")), parseInt(target.getAttribute("y")));
            target.board.is_winning_choice();
        }
        // PLACE YOUR IMPLEMENTATION ABOVE
    }

    //Create a method explore(x, y) to recursively open all cells
    //around the one at the coordinate (x, y).
    //The method should not open the cell that has bomb or flagged.
    //The recursion happens only when the cell value is "0"
    explore(x, y) {

        if(x < 0 || y < 0 || x > this.rows-1 || y > this.rows -1){
            return;
        }
        var current = this.cells[x][y];
        if(current == null){
            debugger;
        }
        if (!current.isOpen && current.value != "B" && current.hasFlag == false)
        {
            current.isOpen = true; // simply open for 1 to 8 and that's it
            current.innerHTML = '<img src="./assets/' + current.value + '.png" width="40px" height="40px"/>';
            if (current.value == "0")
            {
                this.explore(x - 1, y - 1);
                    this.explore(x - 1, y);
                    this.explore(x - 1, y + 1);
                    this.explore(x, y - 1);
                    this.explore(x, y + 1);
                    this.explore(x + 1, y - 1);
                    this.explore(x + 1, y);
                    this.explore(x + 1, y + 1);
            }
        }
    }

    is_winning_choice() {
        // PLACE YOUR IMPLEMENTATION BELOW
        let bomb_count = 0;
        let opened_cnt = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.cells[i][j].value === "B") {
                    bomb_count++;
                } else if (this.cells[i][j].isOpen) {
                    opened_cnt++;
                }
            }
        }
        if (bomb_count === this.bombs && opened_cnt === (this.rows*this.columns-bomb_count)) {
            document.getElementById("game_over").style.color = "red";
            document.getElementById("game_over").innerHTML = "You Win!";
            document.getElementById("game_over").style.display = "block";
            this.lock();
        }
        // PLACE YOUR IMPLEMENTATION ABOVE
    }
}