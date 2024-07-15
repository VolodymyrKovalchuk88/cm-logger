import {LevelEnum} from './level-enum';
import {Message} from './message';
import {Target} from './target';

export class Logger {
    constructor(private name: string, private level: LevelEnum, private targets: Array<Target>) { }

    private log(withLevel: LevelEnum, template: string, args: any[]): void {
        if (withLevel >= this.level) { // We only act when required.
            const message = new Message(this.name, withLevel, new Date(), template, args);
            this.targets.forEach(target => target.target(message));
        }
    }

    verbose(template: string, ...args: any[]): void {
        this.log(LevelEnum.verbose, template, args);
    }

    info(template: string, ...args: any[]): void {
        this.log(LevelEnum.info, template, args);
    }

    warning(template: string, ...args: any[]): void {
        this.log(LevelEnum.warning, template, args);
    }

    error(template: string, ...args: any[]): void {
        this.log(LevelEnum.error, template, args);
    }
}
