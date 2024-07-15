import {LevelEnum} from './level-enum';
import {Target} from './target';
import {ConsoleTarget} from './console-target';
import {FileTarget} from './file-target';
import {StringFormatter} from './string-formatter';
import {Logger} from './logger';

const {NODE_ENV = 'production'} = process.env;

// Could read configuration from some data source. Here we prepare configuration programmatically.
class LoggerConfiguration {
    static config: Map<string, { level: LevelEnum; targets: Array<Target>; }> = NODE_ENV === 'test'
        ? new Map([
            ['.*', {
                level: LevelEnum.verbose,
                targets: [
                    new ConsoleTarget(new StringFormatter('{date} : {level} : {name} : {message}'))
                ]
            }]
        ]) 
        : new Map([
            ['com.*', {
                level: LevelEnum.info,
                targets: [
                    new FileTarget(new StringFormatter('{date} : {level} : {name} : {message}'), './log.txt')
                ]
            }],
            ['.*', {
                level: LevelEnum.verbose,
                targets: [
                    new ConsoleTarget(new StringFormatter('{date} : {level} : {name} : {message}')),
                    new FileTarget(new StringFormatter('{date} : {level} : {name} : {message}'), './log.txt')
                ]
            }]
        ]);
}

// Our logger factory with cache for optimisation.
export class LoggerFactory {
    static cache: Map<string, Logger> = new Map();

    static getLogger(name: string): Logger {
        const logger = LoggerFactory.cache.get(name);
        if (logger) {
            return logger;
        }
        const config = LoggerFactory.getConfig(name);
        const newLogger = new Logger(name, config.level, config.targets);
        LoggerFactory.cache.set(name, newLogger);
        return newLogger;
    }

    private static getConfig(name: string): { level: LevelEnum; targets: Array<Target>; } {
        // We use order and regex to find a matching configuration. 
        for (const [pattern, config] of LoggerConfiguration.config) {
            const regex = new RegExp(pattern);
            if (regex.test(name)) {
                return config;
            }
        }
        throw new Error('No configuration found for logger: ' + name);
    }
}
