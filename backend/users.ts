export class User {
    constructor(public login: string,
        public name: string,
        private password: string) { }

    matches(another: User): boolean {
        return another !== undefined &&
            another.login === this.login &&
            another.password === this.password
    }
}

export const users: { [key: string]: User } = {
    'fernandoprado': new User('fernandoprado', 'Fernando Prado', 'fernando123'),
    'mtunucci': new User('mtunucci', 'Matheus Tunucci', 'tunucci123')
}
