declare enum HttpStatus{
    Error ='error',
    Success = 'ok'
}
declare interface BasicResponse{
    status: HttpStatus
    msg: string
    data: Record<never, never>
}

declare interface GetCaptchaResponse extends BasicResponse{
    data: Captcha
}

declare interface Captcha{
    id: string
    captcha: string
}

