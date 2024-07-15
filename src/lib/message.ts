import {LevelEnum} from './level-enum';

export class Message {
    private cache?: string;

    constructor(
        public name: string,
        public level: LevelEnum,
        public date: Date,
        public template: string,
        public args: any[]
    ) { }

    message(): string {
        // Cache for optimization.
        if (this.cache) {
            return this.cache;
        }
        let index = 0;
        // Lazy evaluation to optimize.
        this.cache = this.template.replace(/{}/g, () => this.args[index++]);
        return this.cache;
    }
}
