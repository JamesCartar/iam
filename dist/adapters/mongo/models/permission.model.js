import { Schema, Types, } from "mongoose";
export const permissionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    resource: { type: Types.ObjectId, ref: "resource", required: true },
    action: {
        type: String,
        enum: ["create", "read", "update", "delete"],
        required: true,
    },
    description: { type: String, default: null },
}, { timestamps: true });
export function getPermissionModel(conn) {
    return conn.model("Permission", permissionSchema);
}
