import {Message} from './message';
import {Target} from './target';
import {Formatter} from './formatter';

export class FileTarget implements Target {
    constructor(private formatter: Formatter, private fileName: string) { }

    target(message: Message): void {
        // FileTarget formats and targets to file.
        console.log(`${this.formatter.format(message)} : [FileTarget ${this.fileName}]`);
    }
}
