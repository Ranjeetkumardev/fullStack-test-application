 
import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  expertise: { 
    type: String, 
    default:"Profetion"
  },
  about: { 
    type: String, 
    default:"musician"
  },
  gender: { 
    type: String, 
    default:"others"
  },
  profilePicture:{
    type : String,
    default : "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
  },
  
}, { timestamps: true });
 
const User = mongoose.model('User', userSchema);
export default User;
 