import { Schema, Types, } from "mongoose";
export const roleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    permissions: [
        { type: Types.ObjectId, ref: "permission", required: true },
    ],
}, {
    timestamps: true,
});
export function getRoleModel(conn) {
    return conn.model("Role", roleSchema);
}
