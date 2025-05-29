
export class storage{
  static  set(key: string, value: string){
        localStorage.setItem(key, value)
    }

    static get(key:string){
        return localStorage.getItem(key)
    }

     static del(key: string){
        localStorage.removeItem(key)
    }
}