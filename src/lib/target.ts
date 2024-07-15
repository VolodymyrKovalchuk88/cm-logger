import {Message} from './message';

export interface Target {
    target(message: Message): void;
}
