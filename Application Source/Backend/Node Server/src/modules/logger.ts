/**
 * This module implements a logging interface which
 * defines three degrees of messages: Info | Error | Debug.
 * These messages are saved to local text files and can be set to be displayed to
 * console.info() | console.error() | console.warn()
 * @file     logger.ts
 * @author   Mark Coetzer
 * @version  1.0
 * @since    08-10-2018
 */

import * as fs from 'fs';

export class Logger {
    // Create 3 sets of write streams for the 3 levels of logging we wish to do
    // every time we get an error we'll append to our error streams, any debug message
    // to our debug stream etc...
    private infoStream = fs.createWriteStream('build/logs/info.txt', { flags : 'a+', encoding : 'utf-8' });
    private errorStream = fs.createWriteStream('build/logs/error.txt', { flags : 'a+', encoding : 'utf-8' });
    private debugStream = fs.createWriteStream('build/logs/debug.txt', { flags : 'a+', encoding : 'utf-8' });

    private verbose = false;

    constructor(verbose: boolean) {
        this.verbose = verbose;
    }

    public info(msg: string) {
        const message = new Date().toISOString() + ' : ' + msg + '\n';
        this.infoStream.write(message);

        if (this.verbose) {
            console.info(message);
        }
    }

    public error(msg: string) {
        const message = new Date().toISOString() + ' : ' + msg + '\n';
        this.errorStream.write(message);

        if (this.verbose) {
            console.error(message);
        }
    }

    public debug(msg: string) {
        const message = new Date().toISOString() + ' : ' + msg + '\n';
        this.debugStream.write(message);

        if (this.verbose) {
            console.warn(message);
        }
    }
}
