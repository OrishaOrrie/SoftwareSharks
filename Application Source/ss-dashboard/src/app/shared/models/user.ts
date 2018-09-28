export class User {
    private _uid: string;
    public get uid(): string {
        return this._uid;
    }
    public set uid(value: string) {
        this._uid = value;
    }

    private _email: string;
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    private _photoURL?: string;
    public get photoURL(): string {
        return this._photoURL;
    }
    public set photoURL(value: string) {
        this._photoURL = value;
    }

    private _displayName?: string;
    public get displayName(): string {
        return this._displayName;
    }
    public set displayName(value: string) {
        this._displayName = value;
    }

    private _favoriteColor?: string;
    public get favoriteColor(): string {
        return this._favoriteColor;
    }
    public set favoriteColor(value: string) {
        this._favoriteColor = value;
    }

    /** TODO: JavaDoc for CTOR
     *
     */
    constructor(uid: string, email: string, photoURL?: string, displayName?: string, favoriteColor?: string) {
        this._uid = uid;
        this._email = email;
        if (photoURL) {this._photoURL = photoURL; }
        if (displayName) {this._displayName = displayName; }
        if (favoriteColor) {this._favoriteColor = favoriteColor; }
    }
}
