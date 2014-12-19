// namespace
var Life = {};

// init with an array of options
// options = [
//  'x' = 320,
//  'y' = 320,
//  'cells' = 8,
// ]
function Life(options) {var example_cells = [
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
                // cell_array[y][x] = new Cell(x, y, state);
                // console.log('test 1 cell_array: ', cell_array[y][x]);
                // console.log('test 2 new_cell: ', new_cell);


                // console.log(self.current_generation);
                // console.log(new_cell);
                self.current_generation.push(Array(new_cell));
                // self.current_generation.push(new_cell);

            }

        }

    },

    determineNewCellState: function() {

        this.updateCells();

        var self = this;   
        var current_generation = this.current_generation;
        var cache = [];
        // var test;

        console.log('current: ', this.current_generation);

        for (y = 0; y < current_generation.length; y++) {

            // initialize;
            // cache[y] = [];
            // self.next_generation[y] = [];

            for (x = 0; x < current_generation[y].length; x++) {

                var cell = current_generation[y][x];

                // Find row/col values
                var row_above = (y-1 >= 0) ? y-1 : current_generation.length - 1;
                var row_below = (y+1 <= current_generation.length - 1) ? y+1 : 0;
                var column_left = (x-1 >= 0) ? x-1 : current_generation[y].length - 1;
                var column_right = (x+1 <= current_generation[y].length - 1) ? x+1 : 0;

                // This is incredibly fucking stupid
                var neighbors = {
                    top_left: current_generation[row_above][column_left],
                    top_center: current_generation[row_above][x],
                    top_right: current_generation[row_above][column_right],
                    left: current_generation[y][column_left],
                    right: current_generation[y][column_right],
                    bottom_left: current_generation[row_below][column_left],
                    bottom_center: current_generation[row_below][x],
                    bottom_right: current_generation[row_below][column_right]
                };

                var alive_count = 0;
                var dead_count = 0;
                var new_state = cell.getState();

                // console.log(neighbors);

                for (neighbor in neighbors) {
                    // console.log(neighbors[neighbor]);
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
                // test = new Cell(x, y, new_state);
                
                // cache[y][x] = new Cell(x, y, new_state);
                var test = new Cell(x, y, new_state);
                self.next_generation.push(Array(test));
                // cache.push(test);

                // cache[y][x] = new Cell(y, x, new_state);
                // self.next_generation[y][x] = new Cell(y, x, new_state);
                // self.next_generation = cache;
                // self.next_generation.push(Array(cache[y][x]));
                // for(var i = 0; i < self.next_generation.length; i++) {
                //     console.log(self.next_generation[i][0].state);
                // }
                // self.next_generation[y][x] = new Cell(x, y, new_state);

                // return cache;
            }

            // self.next_generation = test;

            // self.next_generation = test;
            // self.next_generation = cache;


        }

        // for(var i = 0; i < this.next_generation.length; i++) {
        //     console.log(this.next_generation[i][0].state);
        // }

        this.current_generation = this.next_generation;
        console.log('next: ', this.next_generation);
        // console.log('test: ', this.current_generation);

        // this.updateCells();
    },

    // drawOnCanvas: function() {

    //     var canvas = document.getElementById('canvas-block__board').getContext('2d');
    //     canvas.strokeStyle = '#e1e1e1';
    //     canvas.fillStyle = 'cadetblue';
    //     canvas.clearRec(0, 0, 512, 512);

    //     var cells_x = this.current_generation.length;
    //     var cells_y = this.current_generation[0].length;

    //     for (var i = 0; i < cells_x.length; i++) {
    //         canvas.moveTo(i*10, 0);
    //         canvas.lineTo(i*10, 10);
    //     }

    //     for var(j = 0; j < cells_y.length; j++) {
    //         canvas.moveTo(0, j*10);
    //         canvas.lineTo(10, j*10);
    //     }

    //     canvas.stroke();

    // },

    updateCells: function() {

        var self = this;
        // var current_generation = this.next_generation;
        var current_generation = this.current_generation;

        for(y = 0; y < current_generation.length; y++) {
            for(x = 0; x < current_generation[y].length; x++) {
                self.drawCell(current_generation[y][x]);
            }
        }

    },

    drawCell: function(cell) {

        var canvas = document.getElementById('canvas-block__board').getContext('2d');
        var size = 5;
        canvas.strokeStyle = '#e1e1e1';
        canvas.fillStyle = '#000000';
        // canvas.height = 500;
        // canvas.width = 500;

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

var game = new GameOfLife(example_cells);

game.initializeGame();
game.determineNewCellState();






    this.x         = options['x'];
    this.y         = options['y'];
    this.cell_size = options['cell_size'];

    // defaults
    this.cell_size = 8;
    this.width     = this.x / this.cell_size;
    this.height    = this.y / this.cell_size;
    this.dead      = 0;
    this.alive     = 1;
    this.counter   = 0;

    this.grid = function() {
        return this.matrix(this.height, this.width, 0);
    };

    this.matrix = function(m, n, initial) {

        // this is stolen... review and update this...

        // store the successive array in mat
        var a, i, j, mat = [];

        // first lets loop m
        for(i = 0; i < m; i += 1) {
            // cache
            a = [];

            // the inner loop over n
            for (j = 0; j < n; j += 1) {
                a[j] = 0;
            }
            mat[i] = a;
        }

        return mat;
    };

}

Life.prototype = {

    updateState: function() {

    },

    calculateNeighbors: function(y, x) {

    },

    copyGrid: function(source, destination) {

    },

    

}