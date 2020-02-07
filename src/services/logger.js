class Logger {
    constructor() {
        this.loggers = [];
    }
    
    addConsole() {
        this.loggers.push(console);
        return this;
    }

    addLogger(logger) {
        if (!logger) {
            throw new Error('The argument logger is expected');
        }
        if (typeof logger.log === 'function' && typeof logger.error === 'function') {
            this.loggers.push(logger);       
        }
    }

    log(msg) {
        if (msg && msg.length) {
            for (let idx = 0; idx < this.loggers.length; idx++) {
                const logger = this.loggers[idx];
                logger.log(msg);
            }
        }
    }

    error(msg) {
        if (msg && msg.length) {
            for (let idx = 0; idx < this.loggers.length; idx++) {
                const logger = this.loggers[idx];
                logger.error(msg);
            }
        }
    }
}

module.exports = Logger;
