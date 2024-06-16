/**
 * User: jchionh
 * Date: 6/16/24
 * Time: 03:30 AM
 */

// namespace
wa.data = wa.data || {};

/**
 * Sliding window holds X items (init to 0)
 * and computes average
 * @constructor
 */
wa.data.SlidingWindow = function(size = 20, initValue = 0.0) {
    this.data = Array(size).fill(initValue);
    this.index = 0;
    this.size = size;
}

/**
 * insert number
 * @override
 * @param {number} value
 */
wa.data.SlidingWindow.prototype.insertNumber = function(value) {
    this.data[this.index] = value;
    this.index++;
    if (this.index >= this.size)
    {
        this.index = 0;
    }
};

/**
 * compute average
 * @override
 * @param {number} value
 */
wa.data.SlidingWindow.prototype.average = function() {
    var sum = 0.0;
    for (var i = 0; i < this.size; i++)
    {
        sum += this.data[i];
    }
    return sum / this.size;
    //return this.data.reduce((acc, value) => acc + value) / this.data.length;
};
