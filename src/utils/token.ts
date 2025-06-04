const { APP_TOKEN_KEY } = import.meta.env
import { storage } from "./storage"
export class token {
    static set(value: string) {

        storage.set(APP_TOKEN_KEY, value)
    }

    static get(): string | null {
        return storage.get(APP_TOKEN_KEY)
    }

    static has(): boolean {
        return storage.get(APP_TOKEN_KEY) ? true : false
    }
    static remove(){
        storage.del(APP_TOKEN_KEY)
    }
}