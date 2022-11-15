import { Signin } from "./types/signin";
import { Signup } from "./types/signup";

export interface IUserService {
    Signup(data: Signup): Promise<any>;

    Signin(data: Signin): Promise<{ message: string, status: boolean, token: string, data: object }>;

    IsSignin(): boolean;

    UpdateProfile(): Promise<any>;
}