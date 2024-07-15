import {LevelEnum} from './level-enum';
import {Message} from './message';
import {Formatter} from './formatter';

// We support key words: date, level, name, message and templates e.g. '{date} : {level} : {name} : {message}'.
export class StringFormatter implements Formatter {
    constructor(private template: string) { }

    format(message: Message): string {
        const context = this.getContext(message);
        return this.template.replace(/{(\w+)}/g, (match, key) => context.get(key) ?? match);
    }

    private static levelToString(level: LevelEnum): string {
        switch (level) {
            case LevelEnum.verbose:
                return 'verbose';
            case LevelEnum.info:
                return 'info';
            case LevelEnum.warning:
                return 'warning';
            case LevelEnum.error:
                return 'error';
            default:
                throw new Error('Invalid log level');
        }
    };

    private getContext(message: Message): Map<string, string> {
        return new Map([
            ['name', message.name],
            ['level', StringFormatter.levelToString(message.level)],
            ['date', message.date.toJSON()],
            ['message', message.message()]
        ]);
    }
}
