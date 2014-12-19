// cell [x, y]
// live [[cell][cell][cell]]

// 9x9 grid
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

function Life(cell_array) {
    this.cell_array = cell_array;
    this.current_generaton = [];
    this.next_generation = [];
}

function Cell(x_position, y_position, state) {
    this.x_position = x_position;
    this.y_position = y_position;
    this.state      = state;
}


Life.prototype = {

    initialize: function() {

        var self = this;

        // Vertical loop
        for (var y = 0; y < this.cell_array.length; y++) {

            // console.log('vertical');

            // Horizontal loop
            for (var x = 0; x < this.cell_array[y].length; x++) {

                /*--------------------------------------------

                  Note the switched positions x,y cooridnates
                  in state and new_cell. We are determining the 
                  exact position first according to the loop [y][x]
                  and then constructing a new cell with the coordinates
                  in order [x, y]
                    
                  Given a grid of 9 arrays with 9 values, it will
                  produce 81 (9x9) cells

                --------------------------------------------*/

                var state = (this.cell_array[y][x] == 1) ? 'alive' : 'dead';
                var new_cell = new Cell(x, y, state);

                this.current_generaton.push(new_cell);
                // console.log('horizontal');
            }

        }

    },

    determineNewCellState: function() {

        var self = this;
        var state;
        var raw;
        var cell;

        console.log(this.current_generaton);

        for (var y = 0; y < this.cell_array.length; y++) {

            for (var x = 0; x < this.cell_array[y].length; x++) {

                /*--------------------------------------------

                  We're working with the raw array values as it's easy to 
                  reference them on a coordinate based grid. We can reference
                  them against the Cell objects with Underscore's utility
                  methods

                --------------------------------------------*/
                cell = _.findWhere(self.current_generaton, {'x_position': x, 'y_position': y});
                raw  = this.cell_array[y][x];

                var row_above    = (y-1 >= 0) ? y-1 : this.cell_array.length - 1;
                var row_below    = (y+1 <= this.cell_array.length - 1) ? y+1 : 0;
                var column_left  = (x-1 >= 0) ? x-1 : this.cell_array[y].length - 1;
                var column_right = (x+1 <= this.cell_array[y].length - 1) ? x+1 : 0;

                var neighbors = {
                    top_left: this.cell_array[row_above][column_left],
                    top_center: this.cell_array[row_above][x],
                    top_right: this.cell_array[row_above][column_right],
                    left: this.cell_array[y][column_left],
                    right: this.cell_array[y][column_right],
                    bottom_left: this.cell_array[row_below][column_left],
                    bottom_center: this.cell_array[row_below][x],
                    bottom_right: this.cell_array[row_below][column_right]
                }

                var alive_count = 0;
                var dead_count  = 0;

                for (n in neighbors) {

                    (neighbors[n] == 1) ? alive_count++ : dead_count++;

                }

                state = cell.state;

                // Reset the raw cell value, it should always reflect the latest generation
                // as we use this for processing
                if (raw === 1) {
                    if(alive_count < 2 || alive_count > 3) {
                        state = 'dead';
                        raw = 0;
                    } else if (alive_count === 2 || alive_count ===3) {
                        state = 'alive';
                        raw = 1;
                    }
                } else {
                    if(alive_count == 3) {
                        state = 'alive';
                        raw = 1;
                    }
                }

                var new_cell = new Cell(x, y, state);
                self.next_generation.push(new_cell);

            }

        }

        console.log(this.next_generation);

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

}

var life = new Life(example_cells);

life.initialize();
life.determineNewCellState();
