export default class User {
    constructor(email, password, googleId) {
        this.email = email;
        this.password = password;
        this.googleId = googleId || "";
        this.name = "";
        this.surname = "";
        this.accountPhotoUrl = "";
        this.backgroundPhotoUrl = "";
        this.createdAt = "now()";
        this.enabled = true;
    }

    getUser() {
        return {
            email: this.email,
            password: this.password,
            google_id: this.googleId,
            name: this.name,
            surname: this.surname,
            account_photo_url: this.accountPhotoUrl,
            background_photo_url: this.backgroundPhotoUrl,
            created_at: this.createdAt,
            enabled: this.enabled,
        };
    }
}
