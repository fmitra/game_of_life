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
    this.cell = [];
}

GameOfLife.prototype = {

    init: function() {

        var self = this;
        var cell_array = this.cell_array;

        // Loop row
        for (y = 0; y < cell_array.length; y++) {

            var length_x = cell_array[y].length;

            // Loop column
            for (x = 0; x < cell_array[y].length; x++) {

                var state = (cell_array[y][x] == 1) ? 'alive' : 'dead';

                var new_cell = new Cell(x, y, state);
                self.cell.push(new_cell);

            }

        }

        console.log(this.cell);
    }


}


function Cell(x_position, y_position, state) {
    this.x_position = x_position;
    this.y_position = y_position;
    this.state      = state;
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
    }

}


var game = new GameOfLife(example_cells);

game.init();