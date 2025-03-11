import { IsEmail, IsNotEmpty, Matches, Validate } from "class-validator";

export class createUser {
    
    @IsNotEmpty({message : "userName is required!"})
    userName : string

    @IsEmail({},{message : "Invalid email format!"})
    @IsNotEmpty({message : "Email should not be empty!"})
    email : string

    @IsNotEmpty({message : "Password is required!"})
    password : string 
}