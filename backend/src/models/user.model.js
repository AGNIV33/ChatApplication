import monoose from "mongoose";

const userSchema = new monoose.Schema(
      {
         email: {
            type: String,
            required: true,
            unique: true,
         },
         fullName: {
            type: String,
            required: true,    
         },
         password: {
            type: String,
            required: true,
            minlength: 6,
         },
         profilePic: {
            type: String,
            default: "",
         },
      },
      { timestamps: true }
);

const User = monoose.model("User", userSchema);

export default User;  
