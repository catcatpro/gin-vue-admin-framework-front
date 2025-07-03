
declare interface BasicResponse{
    status: string
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

