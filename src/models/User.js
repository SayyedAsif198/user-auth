import { pick } from "lodash";
import {randomBytes} from "crypto"
import { compare, hash } from "bcryptjs";
import {Schema,model} from "mongoose";
import {sign} from 'jsonwebtoken'
const UserSchema = new Schema ({
    name :{
        type : String,
        required : true
    },
    username :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    verified :{
        type : String,
        required : false
    },
    verificationCode :{
        type : String,
        required : false
    },
    resetPasswordToken :{
        type : String,
        required : false
    },
    resetPasswordExpiresIn :{
        type : Date,
        required : false
    },
}, {timestamps : true}
);

UserSchema.pre("save", async function (name){
    let user = this;
    if (!user.isModified ("password")) return next();
    user.password = await hash(user.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function (password){
    return await compare (password, this.password);
};

UserSchema.methods.generateJWT = async function (){
    let payload = {
        username : this.username,
        email : this.email,
        name : this.name,
        id : this.id
    };
    return await sign(payload, secret,{ expiresIn : "1 day"});
};

UserSchema.methods.generatePasswordReset = function (){
    this.resetPasswordExpiresIn = Date.now() + 3600000;
    this.resetPasswordToken = randomBytes(20).toString("hex");
};

UserSchema.methods.getUserInfo = function (){
    return pick (this,["_id","username","email","name"]);
};

const user = model("user",UserSchema);
export default user