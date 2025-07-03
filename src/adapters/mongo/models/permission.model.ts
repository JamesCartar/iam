import {
    Schema,
    model,
    Types,
    HydratedDocument,
    InferSchemaType,
    Connection,
    Model,
} from "mongoose";

export const permissionSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        resource: { type: Types.ObjectId, ref: "resource", required: true },
        action: {
            type: String,
            enum: ["create", "read", "update", "delete"],
            required: true,
        },
        description: { type: String, default: null },
    },
    { timestamps: true }
);

export type IPermission = HydratedDocument<
    InferSchemaType<typeof permissionSchema>
>;
export type IPermissionLean = InferSchemaType<typeof permissionSchema>;

export function getPermissionModel(conn: Connection): Model<IPermission> {
    return conn.model<IPermission>("Permission", permissionSchema);
}
