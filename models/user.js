export default class User {
    constructor(email, password, googleId) {
        this.email = email;
        this.password = password;
        this.googleId = googleId || "";
        this.name = "";
        this.surname = "";
        this.accountPhotoUrl = "";
        this.backgroundPhotoUrl = "";
        this.createdAt = new Date().toLocaleDateString("en-GB");
        this.recipes = [];
        this.events = [];
        this.preparations = [];
        this.schedules = [];
    }

    registerMe() {
        return {
            email: this.email,
            password: this.password,
            googleId: this.googleId,
            name: this.name,
            surname: this.surname,
            accountPhotoUrl: this.accountPhotoUrl,
            backgroundPhotoUrl: this.backgroundPhotoUrl,
            createdAt: this.createdAt,
            recipes: this.recipes,
            events: this.events,
            preparations: this.preparations,
            schedules: this.schedules,
        };
    }
}
