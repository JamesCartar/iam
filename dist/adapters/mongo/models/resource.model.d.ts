import { Schema, Types, Connection, Model, HydratedDocument, InferSchemaType } from "mongoose";
export declare const resourceSchema: Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
}>, {}> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type IResource = HydratedDocument<InferSchemaType<typeof resourceSchema>>;
export type IResourceLean = InferSchemaType<typeof resourceSchema>;
export declare function getResourceModel(conn: Connection): Model<IResource>;
