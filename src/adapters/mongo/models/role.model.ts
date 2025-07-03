import {
    Schema,
    model,
    Types,
    HydratedDocument,
    InferSchemaType,
    Connection,
    Model,
} from "mongoose";

export const roleSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        permissions: [
            { type: Types.ObjectId, ref: "permission", required: true },
        ],
    },
    {
        timestamps: true,
    }
);

export type IRole = HydratedDocument<InferSchemaType<typeof roleSchema>>;
export type IRoleLean = InferSchemaType<typeof roleSchema>;

export function getRoleModel(conn: Connection): Model<IRole> {
    return conn.model<IRole>("Role", roleSchema);
}
