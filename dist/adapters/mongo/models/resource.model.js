import { Schema, } from "mongoose";
export const resourceSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: null },
}, { timestamps: true });
export function getResourceModel(conn) {
    return conn.model("Resource", resourceSchema);
}
