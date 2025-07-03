import {
    Schema,
    Types,
    Connection,
    Model,
    HydratedDocument,
    InferSchemaType,
} from "mongoose";

export const resourceSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, default: null },
    },
    { timestamps: true }
);

export type IResource = HydratedDocument<
    InferSchemaType<typeof resourceSchema>
>;
export type IResourceLean = InferSchemaType<typeof resourceSchema>;

export function getResourceModel(conn: Connection): Model<IResource> {
    return conn.model<IResource>("Resource", resourceSchema);
}
