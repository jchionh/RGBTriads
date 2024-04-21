/**
 * User: jchionh
 * Date: 2/28/13
 * Time: 10:38 PM
 */

// namespace
wa.utils = wa.utils || {};

/**
 *
 * @param {number} x
 * @return {Boolean}
 */
wa.utils.isPowerOfTwo = function(x) {
    return (x & (x - 1)) == 0;
};

/**
 *
 * @param {number} x
 * @return {number}
 */
wa.utils.nextHighestPowerOfTwo = function(x) {
    --x;
    for (var i = 1; i < 32; i <<= 1) {
        x |= x >> i;
    }
    return x + 1;
};

