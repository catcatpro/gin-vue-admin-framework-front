

declare interface LoginResponse extends BasicResponse{
    data: Record<string, never>
}

declare interface UserInfoResponse extends BasicResponse{
    data: User
}

declare interface RefreshTokenResponse extends BasicResponse{
    data: Record<string, string | null>
}