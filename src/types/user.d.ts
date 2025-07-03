declare interface User{
    id: number
    username: string
    password?: string
}

declare interface LoginForm {
  username: string,
  password: string,
  code:string,
  auto_login: null | string
}