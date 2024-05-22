const { TOKEN_KEY } = import.meta.env
export class token {
    static set(value: string) {

        localStorage.setItem(TOKEN_KEY, value)
    }

    static get(): string | null {
        return localStorage.getItem(TOKEN_KEY)
    }

    static has(): boolean {
        return localStorage.getItem(TOKEN_KEY) ? true : false
    }
}