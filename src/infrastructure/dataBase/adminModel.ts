import { Schema, model } from "mongoose";
import Admin from "../../domian/admin";

const adminSchema: Schema<Admin> = new Schema({
     email: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     }
})

const AdminModel = model<Admin>('admin', adminSchema)
export default AdminModel