import {LevelEnum} from './level-enum';
import {Message} from './message';
import {Target} from './target';
import {Formatter} from './formatter';

export class ConsoleTarget implements Target {
    constructor(private formatter: Formatter) { }

    target(message: Message): void {
        // ConsoleTarget not only formats but also colors the output with console.info, console.warn, console.error.
        const format = `${this.formatter.format(message)} : [ConsoleTarget]`;
        switch (message.level) {
            case LevelEnum.verbose:
            case LevelEnum.info:
                console.info(format);
                break;
            case LevelEnum.warning:
                console.warn(format);
                break;
            case LevelEnum.error:
                console.error(format);
                break;
        }
    }
}
