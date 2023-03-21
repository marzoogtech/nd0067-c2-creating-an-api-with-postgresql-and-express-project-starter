import { Request } from "express";

export interface UserRequest extends Request {
    userId: string,
    firstName: string,
    lastName: string
}