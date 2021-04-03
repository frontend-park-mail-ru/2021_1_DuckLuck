/**
 * @description Simple Bus class which provider "Mediator" pattern through all application.
 */
class Bus {
    /**
     * @description Simple constructor
     */
    constructor() {
        this.listeners = {};
    }

    /**
     *
     * @param {string} event Some event
     * @param {function} callback A function which will call when event is emitted.
     */
    on = (event, callback) => {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
    }

    /**
     *
     * @param {string} event Some event
     * @param {function} callback A function which will removed from callable when event is emitted.
     */
    off = (event, callback) => {
        this.listeners[event] = this.listeners[event]
            .filter(function(listener) {
                return listener !== callback;
            });
    }

    /**
     *
     * @param {string} event Some event
     * @param {Object} data Data which will be passed through function.
     */
    emit = (event, data) => {
        this.listeners[event].forEach(function(listener) {
            listener(data);
        });
    }
}

export default new Bus;
