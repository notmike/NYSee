// ****************************************************************************
//                          SEGMENT FUNCTION
// ****************************************************************************
function Segment(direction, numOfSteps) {
    this.direction = direction;
    this.numOfSteps = numOfSteps;
}

function translatedDirection(direction) {
    if (direction == 'F') {
        return 'forward';
    } else if (direction == 'L') {
        return 'left';
    } else if (direction == 'R') {
        return 'right';
    } else if (direction == 'B') {
        return 'back';
    } else if (direction == 'U') {
        return 'upstairs';
    } else if (direction == 'D') {
        return 'down stairs';
    } else if (direction == 'X') {
        return 'stop';
    } else {
        return 'ERROR, unknown direction';
    }
};

Segment.prototype.navigateSegment = function () {
    if (this.direction == 'X') {
        console.log('Stop, you have reached your destination');
    }
    else {
        console.log(' Go ' + translatedDirection(this.direction) + ' for ' + this.numOfSteps + ' steps.');
    }
};

// ****************************************************************************
//                          PATH FUNCTION
// ****************************************************************************
function Path() {
    this.numOfSegments = 0;
    this.segmentsArr = [];
}

Path.prototype.addSegment = function (direction, numOfSteps) {
    var segment = new Segment(direction, numOfSteps);
    this.segmentsArr.push( segment );
    this.numOfSegments++;
};

Path.prototype.navigatePath = function () {
    for (i=0; i < this.numOfSegments; i++ ) {
        this.segmentsArr[i].navigateSegment()
    }
};

// ****************************************************************************
//                    PATH Creation & Navigation TESTING
// ****************************************************************************
Path1 = new Path();
Path2 = new Path();

Path1.addSegment('F', 20);
Path1.addSegment('L', 50);
Path1.addSegment('F', 10);
Path1.addSegment('R', 30);
Path1.addSegment('U', 25);
Path1.addSegment('F', 20);
Path1.addSegment('L', 5);
Path1.addSegment('X', 0);

Path2.addSegment('F', 25);
Path2.addSegment('L', 55);
Path2.addSegment('F', 15);
Path2.addSegment('R', 35);
Path2.addSegment('U', 25);
Path2.addSegment('F', 25);
Path2.addSegment('L', 5);
Path2.addSegment('X', 0);

Path1.navigatePath();
Path2.navigatePath();
