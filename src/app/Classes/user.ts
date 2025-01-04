export class User {
    private id?: number;
    private email: string;
    private password: string;
    private username?: string;
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
    getId(): number | undefined {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }
    getEmail(): string {
        return this.email;
    }
    setEmail(email: string) {
        this.email = email;
    }
    getPassword(): string {
        return this.password;
    }
    setPassword(password: string) {
        this.password = password;
    }
    getUsername(): string | undefined {
        return this.username;
    }
    setUsername(username: string) {
        this.username = username;
    }

}
