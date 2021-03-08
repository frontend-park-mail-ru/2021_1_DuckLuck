
/**
 * @return {string} Hello + name
 * @param {Object} arg1 first-argument
 * @param {Object} arg2 second-argument
 * @param {Object} options Options
 */
const IfEq = function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
};

export default IfEq;
