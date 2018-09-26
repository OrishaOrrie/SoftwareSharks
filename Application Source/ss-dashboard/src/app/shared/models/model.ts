export class Model {
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    private _categories: string[];
    public get categories(): string[] {
        return this._categories;
    }
    public set categories(value: string[]) {
        this._categories = value;
    }

    public addCategory(category: string | string[]) : void {
        if (typeof category == "string") {
            this._categories.push(category);
        }
        else {
            this._categories = this._categories.concat(category);
        }
    }

    public removeCategory(category: string) {
        const index = this._categories.indexOf(category);
        this._categories.splice(index, 1);
    }
}