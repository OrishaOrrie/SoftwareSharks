export class UserModel {
    // private user: User;
    private classes: String[] = new Array();

    // constructor(classes: String[]) {
    //     this.classes = classes;
    // }

    public getNumClasses() {
        return this.classes.length;
    }

    public getClasses() {
        return this.classes;
    }

    public addClass(newClass: String) {
        this.classes.push(newClass);
    }

    public addArrayOfClasses(classesArray: String[]) {
        this.classes.concat(classesArray);
    }

    public containsClass(query: String) {
        for (const c in this.classes) {
            if (c === query) {
                return true;
            }
        }
        return false;
    }

    public printClasses() {
        console.log(this.classes);
    }
}
