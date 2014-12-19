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
    // Raw data values for processing
    this.cell_array = cell_array;
    // A collection of Life objects
    this.current_generation = [];
    // The pending creation of Life objects
    this.next_generation = [];
}

function Cell(x_position, y_position, state) {
    this.x_position = x_position;
    this.y_position = y_position;
    this.state      = state;
}


Life.prototype = {

    // On intialization, we parse a multi-dimensional array
    // of values and instantiate them as Cell objects, and likewise
    // create a Collection of Cells
    initialize: function() {

        var self = this;

        // Vertical loop
        for (var y = 0; y < this.cell_array.length; y++) {

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

                this.current_generation.push(new_cell);
            }

        }

    },

    determineNewCellState: function() {

        this.updateCells();

        // reset
        this.next_generation = [];

        for (var i = 0; i < this.current_generation.length; i++) {

            // console.log(this.current_generation[i]);

            var cell = this.current_generation[i];

            var row_above = (cell.y_position-1 >= 0) ? cell.y_position-1 : 9-1;
            var row_below = (cell.y_position+1 <= 9-1) ? cell.y_position+1 : 0;
            var column_left = (cell.x_position-1 >= 0) ? cell.x_position-1 : 9-1;
            var column_right = (cell.x_position+1 <= 9-1) ? cell.x_position+1 : 0;

            var neighbors = {

                top_left: _.findWhere(this.current_generation, {'x_position': column_left, 'y_position': row_above}),
                top_center: _.findWhere(this.current_generation, {'x_position': cell.x_position, 'y_position': row_above}),
                top_right: _.findWhere(this.current_generation, {'x_position': column_right, 'y_position': row_above}),
                left: _.findWhere(this.current_generation, {'x_position': column_left, 'y_position': cell.y_position}),
                right: _.findWhere(this.current_generation, {'x_position': column_right, 'y_position': cell.y_position}),
                bottom_left: _.findWhere(this.current_generation, {'x_position': column_left, 'y_position': row_below}),
                bottom_center: _.findWhere(this.current_generation, {'x_position': cell.x_position, 'y_position': row_below}),
                bottom_right: _.findWhere(this.current_generation, {'x_position': column_right, 'y_position': row_below})

            }

            var alive_count = 0;
            var dead_count = 0;

            for (n in neighbors) {
                (neighbors[n].state == 'alive') ? alive_count++ : dead_count++;
            }

            var state = cell.state;
            if (cell.state == 'alive') {
                if(alive_count < 2 || alive_count > 3) {
                    state = 'dead';
                } else if (alive_count == 2 || alive_count == 3) {
                    state = 'alive';
                }
            } else {
                if(alive_count == 3) {
                    state = 'alive';
                }
            }

            var new_cell = new Cell(cell.x_position, cell.y_position, state);
            this.next_generation.push(new_cell);

        }

        console.log('current: ', this.current_generation);
        console.log('next: ', this.next_generation);

        // set new generation of cells
        this.current_generation = this.next_generation;

    },

    updateCells: function() {

        var self = this;

        for(var x = 0; x < this.current_generation.length; x++) {
            self.drawCell(this.current_generation[x]);
        }

    },

    drawCell: function(cell) {

        var canvas = document.getElementById('canvas-block__board').getContext('2d');
        var size = 5;
        canvas.strokeStyle = '#e1e1e1';
        canvas.fillStyle = '#000000';

        var start_x = cell.getPositionX() * size;
        var start_y = cell.getPositionY() * size;

        if (cell.getState() == 'alive') {
            canvas.fillRect(start_x, start_y, size, size);
        } else {
            canvas.clearRect(start_x, start_y, size, size);
        }

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
