export const ReturnMessage = {
    Success: "Success",
    Fail: "Fail",
} as const;

export type ReturnMessage = (typeof ReturnMessage)[keyof typeof ReturnMessage];

export const LoginMessage = {
    NoUserExisted: "User does not exist",
    IncorrectPassword: "Incorrect Password",
    SuccessLogin: "Success",
    FailLogin: "Fail to Login"
} as const;

export type LoginMessage = (typeof LoginMessage)[keyof typeof LoginMessage];