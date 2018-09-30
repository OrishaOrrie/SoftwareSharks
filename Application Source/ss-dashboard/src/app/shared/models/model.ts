export class Model {
    /**
     * Represents the name of the model.
     */
    private _name: string;

    /**
     * Get accessor for _name member variable.
     * @returns The value of the _name member variable as a string.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Set modifier for the _name member variable.
     * @param value  The updated value (of type string) to set _name as.
     */
    public set name(value: string) {
        this._name = value;
    }

    /**
     * Represents the list of categories contained within the model.
     */
    private _categories: string[];

    /**
     * Get accessor for _categories member variable.
     * @returns The value of the _categories member variable as a string[].
     */
    public get categories(): string[] {
        return this._categories;
    }

    /**
     * Set modifier for the _categories member variable.
     * @param value  The updated value (of type string[]) to set _categories as.
     */
    public set categories(value: string[]) {
        this._categories = value;
    }

    /**
     * Adds a Category or list of Categories to _categories list.
     * @param category  The category or list of categories to add. Can be either type: string | string[]
     */
    public addCategory(category: string | string[]): void {
        if (typeof category === 'string') {
            this._categories.push(category);
        } else {
            this._categories = this._categories.concat(category);
        }
    }

    /**
     * Removes a Category from _categories list.
     * @param category  The category to remove.
     */
    public removeCategory(category: string) {
        const index = this._categories.indexOf(category);
        this._categories.splice(index, 1);
    }

    /**
     * Represents the uri of the saved model on firebase.
     */
    private _uri: string;

    /**
     * Get accessor for _uri member variable.
     * @returns The value of the _uri member variable as a string.
     */
    public get uri(): string {
        return this._uri;
    }

    /**
     * Set modifier for the _uri member variable.
     * @param value  The updated value (of type string) to set _uri as.
     */
    public set uri(value: string) {
        this._uri = value;
    }

    /**
     * Represents the trained status of the model.
     */
    private _trained: boolean;

    /**
     * Get accessor for _trained member variable.
     * @returns The value of the _trained member variable as a string.
     */
    public get trained(): boolean {
        return this._trained;
    }

    /**
     * Set modifier for the _trained member variable.
     * @param value  The updated value (of type boolean) to set _trained as.
     */
    public set boolean(value: boolean) {
        this._trained = value;
    }
}
