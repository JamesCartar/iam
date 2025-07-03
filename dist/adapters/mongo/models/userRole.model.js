import { Schema, model, Types } from "mongoose";
export const userRoleSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "user", required: true },
    roleId: { type: Types.ObjectId, ref: "role", required: true },
}, {
    timestamps: true,
});
export const UserRole = model("userRole", userRoleSchema);
