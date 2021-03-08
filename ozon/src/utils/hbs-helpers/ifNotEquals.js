export default function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.inverse(this) : options.fn(this);
}