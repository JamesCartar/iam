import mongoose, { Types } from "mongoose";

import {
    getPermissionModel,
    IPermission,
    IPermissionLean,
} from "./models/permission.model.js";
import { getRoleModel, IRole, IRoleLean } from "./models/role.model.js";
import { mapMongo } from "../../utils/mapper.js";
import { IIamRepository } from "../../core/iam.repository.js";
import {
    getResourceModel,
    IResource,
    IResourceLean,
} from "./models/resource.model.js";

export class MongoIamRepository implements IIamRepository {
    private ResourceModel: ReturnType<typeof getResourceModel>;
    private PermissionModel: ReturnType<typeof getPermissionModel>;
    private RoleModel: ReturnType<typeof getRoleModel>;

    constructor(private readonly mongooseInstance: typeof mongoose) {
        if (this.mongooseInstance.connection.readyState !== 1) {
            throw new Error("MongoDB connection is not established");
        } else {
            console.log("MongoDB connection is established");
        }

        this.ResourceModel = getResourceModel(this.mongooseInstance.connection);
        this.PermissionModel = getPermissionModel(
            this.mongooseInstance.connection
        );
        this.RoleModel = getRoleModel(this.mongooseInstance.connection);
    }
    // Resource methods
    async createResource(
        name: string,
        description?: string
    ): Promise<IResource> {
        return this.ResourceModel.create({
            name,
            description,
        });
    }

    async getAllResource(): Promise<IResource[] | []> {
        return this.ResourceModel.find();
    }

    async getResourceById(id: string): Promise<IResource | null> {
        return this.ResourceModel.findById(id);
    }

    async getResourceByName(name: string): Promise<IResource | null> {
        return this.ResourceModel.findOne({ name });
    }

    async updateResource(
        resourceId: string,
        update: Partial<IResourceLean>
    ): Promise<IResource | null> {
        return this.ResourceModel.findByIdAndUpdate(resourceId, update, {
            new: true,
        });
    }

    async deleteResource(resourceId: string): Promise<IResource | null> {
        return this.ResourceModel.findByIdAndDelete(resourceId);
    }

    // Permission methods
    async createPermission(data: {
        name: string;
        resource: string;
        action: string;
        description?: string;
    }): Promise<IPermission> {
        return this.PermissionModel.create(data);
    }

    async getAllPermission(): Promise<IPermission[] | []> {
        return this.PermissionModel.find()
            .populate({ path: "resource", select: "name description" })
            .lean();
    }

    async getPermissionById(id: string): Promise<IPermission | null> {
        return this.PermissionModel.findById(id);
    }

    async getPermissionByName(name: string): Promise<IPermission | null> {
        return this.PermissionModel.findOne({ name });
    }

    async updatePermission(
        permissionId: string,
        update: Partial<IPermissionLean>
    ): Promise<IPermission | null> {
        return this.PermissionModel.findByIdAndUpdate(permissionId, update, {
            new: true,
        });
    }

    async deletePermission(permissionId: string): Promise<IPermission | null> {
        return this.PermissionModel.findByIdAndDelete(permissionId);
    }

    // Role methods
    async createRole(data: {
        name: string;
        permissions: string[];
    }): Promise<IRole> {
        return this.RoleModel.create(data);
    }

    async getAllRole(): Promise<IRole[] | []> {
        return this.RoleModel.find().populate({
            path: "permissions",
            select: "name action description",
            populate: { path: "resource", select: "name description" },
        });
    }

    async getRoleById(id: string): Promise<IRole | null> {
        return this.RoleModel.findById(id);
    }

    async getRoleByName(name: string): Promise<IRole | null> {
        return this.RoleModel.findOne({ name });
    }

    async updateRole(
        roleId: string,
        update: Partial<IRoleLean>
    ): Promise<IRole | null> {
        return this.RoleModel.findByIdAndUpdate(roleId, update, {
            new: true,
        });
    }

    async deleteRole(roleId: string): Promise<IRole | null> {
        return this.RoleModel.findByIdAndDelete(roleId);
    }

    async addPermissionToRole(
        roleId: string,
        permissionId: string
    ): Promise<void> {
        const role = await this.RoleModel.findOne({ _id: roleId });

        if (!role) {
            throw new Error(`Role with ID ${roleId} not found`);
        }

        if (
            role &&
            !role.permissions
                .map((p: any) => p.toString())
                .includes(permissionId)
        ) {
            role.permissions.push(
                Types.ObjectId.createFromHexString(permissionId)
            );
            await role.save();
        }
    }

    async removePermissionFromRole(
        roleId: string,
        permissionId: string
    ): Promise<void> {
        const role = await this.RoleModel.findOne({ name: roleId }).exec();

        if (!role) {
            throw new Error(`Role with ID ${roleId} not found`);
        }

        if (role) {
            role.permissions.pull(permissionId);
            await role.save();
        }
    }

    // User-role binding methods
    async assignRoleToUser(userId: string, roleName: string): Promise<void> {
        // Logic to assign role to user in MongoDB (can be stored in a separate mapping collection)
    }

    async revokeRoleFromUser(userId: string, roleName: string): Promise<void> {
        // Logic to revoke role from user in MongoDB (can be stored in a separate mapping collection)
    }

    // Evaluation methods
    async userHasPermission(
        userId: string,
        permissionName: string
    ): Promise<boolean> {
        // Logic to check if the user has the specified permission
        return true; // Placeholder
    }

    async userHasRole(userId: string, roleName: string): Promise<boolean> {
        // Logic to check if the user has the specified role
        return true; // Placeholder
    }

    async getUserPermissions(userId: string): Promise<string[]> {
        // Logic to get the user's permissions
        return []; // Placeholder
    }

    async getUserRoles(userId: string): Promise<string[]> {
        // Logic to get the user's roles
        return []; // Placeholder
    }
}
