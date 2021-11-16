import { check } from "express-validator";

const name = check("name","Name is required").not().isEmpty();
const username = check("username","Username is required").not().isEmpty();
const email = check("email","please provide valid email address").isEmail();
const password = check(
    "password",
    "password is required of minimum Length of 6"
    )
    .not()
    .isLength({
        min : 6
    });

    export const RegistrationValidations = [password,name,username,email];
    export const AuthenteValidations = [username,password];