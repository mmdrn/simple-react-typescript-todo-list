import { IUserService } from "../interfaces/IUser.interface";
import { Signin } from "../interfaces/types/signin";
import { Signup } from "../interfaces/types/signup";
import { v4 as uuid } from "uuid";

export class UserService implements IUserService {

    IsSignin(): boolean {
        const token = localStorage.getItem("token")
        if (token) return true;
        return false
    }

    async Signup(data: Signup): Promise<{ message: string, status: boolean }> {
        localStorage.removeItem("userInfo");
        const promise = new Promise<{ message: string, status: boolean }>((resolve) => {
            localStorage.setItem("userInfo", JSON.stringify(data))
            resolve({
                message: "Success",
                status: true
            });
        });
        return promise;
    }

    async Signin(data: Signin): Promise<{ message: string, status: boolean, token: string, data: object }> {
        const promise = new Promise<{ message: string, status: boolean, token: string, data: object }>((resolve, reject) => {
            let _userInfo = localStorage.getItem("userInfo")

            if (!_userInfo) {
                reject({
                    message: "It seems you have not any account. please go to signup page.",
                    status: false,
                })
            } else {
                const userInfo = JSON.parse(_userInfo);
                if (userInfo.name.toLowerCase() === data.name.toLowerCase() && userInfo.password === data.password) {
                    resolve({
                        message: "Success",
                        status: true,
                        token: uuid(),
                        data: userInfo
                    });
                }
                reject({
                    message: "The name or password is wrong.",
                    status: false,
                })
            }
        });

        return promise;
    }

    async UpdateProfile(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}