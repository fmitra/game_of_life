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

        // Vertical loop
        for (var y = 0; y < this.cell_array.length; y++) {

            // console.log('vertical');
            // Horizontal loop
            for (x = 0; x < this.cell_array[y].length; x++) {
                // console.log('horizontal');
            }

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