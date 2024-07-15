import {Message} from './message';

export interface Formatter {
    format(message: Message): void;
}
