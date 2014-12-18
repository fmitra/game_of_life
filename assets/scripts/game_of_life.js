var example_cells = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,1,0,0,0],
  [0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0]
];

function GameOfLife(cell_array) {
    // Starter collection
    this.cell_array = cell_array;
    // Starter collection initialized as new Cells
    this.current_generation = [];
    this.next_generation = [];
}

function Cell(x_position, y_position, state) {
    this.x_position = x_position;
    this.y_position = y_position;
    this.state      = state;
}

GameOfLife.prototype = {

    initializeGame: function() {

        var self = this;
        var cell_array = this.cell_array;

        // Loop row
        for (y = 0; y < cell_array.length; y++) {

            var length_x = cell_array[y].length;

            // Loop column
            for (x = 0; x < cell_array[y].length; x++) {

                // Determine cell state
                var state = (cell_array[y][x] == 1) ? 'alive' : 'dead';

                var new_cell = new Cell(x, y, state);

                self.current_generation.push(Array(new_cell));
                // self.current_generation.push(new_cell);

            }

        }

    },

    determineNewCellState: function() {

        var self = this;   
        var current_generation = this.current_generation;

        console.log('current: ', this.current_generation);

        for (y = 0; y < current_generation.length; y++) {

            // initialize;
            self.next_generation[y] = [];

            for (x = 0; x < current_generation[y].length; x++) {

                var cell = current_generation[y][x];

                // Find row/col values
                var row_above = (y-1 >= 0) ? y-1 : current_generation.length - 1;
                var row_below = (y+1 <= current_generation.length - 1) ? y+1 : 0;
                var column_left = (x-1 >= 0) ? x-1 : current_generation[y].length - 1;
                var column_right = (x+1 <= current_generation[y].length - 1) ? x+1 : 0;

                var neighbors = {
                    top_left: current_generation[row_above][column_left].create(),
                    top_center: current_generation[row_above][x].create(),
                    top_right: current_generation[row_above][column_right].create(),
                    left: current_generation[y][column_left].create(),
                    right: current_generation[y][column_right].create(),
                    bottom_left: current_generation[row_below][column_left].create(),
                    bottom_center: current_generation[row_below][x].create(),
                    bottom_right: current_generation[row_below][column_right].create()
                };

                var alive_count = 0;
                var dead_count = 0;
                var new_state = cell.getState();

                for (neighbor in neighbors) {
                    if(neighbors[neighbor].getState() == 'dead') {
                        dead_count++;
                    } else {
                        alive_count++;
                    }
                }

                if(cell.getState() == 'alive') {
                    if(alive_count < 2 || alive_count > 3) {
                        new_state = 'dead';
                        // cell.setState('dead');
                    } else if (alive_count === 2 || alive_count === 3) {
                        new_state = 'alive';
                        // cell.setState('alive');
                    }
                } else {
                    if (alive_count === 3) {
                        new_state = 'alive';
                        // cell.setState('alive');
                    }
                }

                // Pay attention to the (y,x) coordinates. If we can keep it static
                // then we can just clone the array over and use a setter method on the
                // Cell instance to update the state
                self.next_generation[y][x] = new Cell(y, x, new_state);
                // self.next_generation[y][x] = new Cell(x, y, new_state);

            }

        }

        console.log('next: ', this.next_generation);

    }

}

Cell.prototype = {

    getPositionX: function() {
        return this.x_position;
    },
    getPositionY: function() {
        return this.y_position;
    },
    getState: function() {
        return this.state;
    },
    setState: function(state) {
        this.state = state;
    },
    create: function() {
        return new Cell(this.x_position, this.y_position, this.state);
    }

}

var game = new GameOfLife(example_cells);

game.initializeGame();
game.determineNewCellState();