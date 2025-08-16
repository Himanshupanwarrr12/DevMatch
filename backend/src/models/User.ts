import {Schema,model,Document} from "mongoose"

interface User extends Document{
    firstName:string;
    lastName : string;
    emailId:string;
    password: string;
    age:number;
    skilss:string[];
    about:string;
    photoUrl:string;
    createdAt:Date;
    updatedAt : Date;
}

const userSchema: Schema<User> = new Schema({

})
