import {Message} from './message';
import {Target} from './target';
import {Formatter} from './formatter';

export class FileTarget implements Target {
    constructor(private formatter: Formatter, private fileName: string) { }

    target(message: Message): void {
        // FileTarget formats and targets to file.
        // We may want to implement/extend our FileTarget with rolling feature. Rolling feauture could on a daily basis archive/rotate old file and proceed with a new blank file. 
        console.log(`${this.formatter.format(message)} : [FileTarget ${this.fileName}]`);
    }
}
