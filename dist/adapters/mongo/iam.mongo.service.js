import { Types } from "mongoose";
import { getPermissionModel, } from "./models/permission.model.js";
import { getRoleModel } from "./models/role.model.js";
import { getResourceModel, } from "./models/resource.model.js";
export class MongoIamRepository {
    constructor(mongooseInstance) {
        this.mongooseInstance = mongooseInstance;
        if (this.mongooseInstance.connection.readyState !== 1) {
            throw new Error("MongoDB connection is not established");
        }
        else {
            console.log("MongoDB connection is established");
        }
        this.ResourceModel = getResourceModel(this.mongooseInstance.connection);
        this.PermissionModel = getPermissionModel(this.mongooseInstance.connection);
        this.RoleModel = getRoleModel(this.mongooseInstance.connection);
    }
    // Resource methods
    async createResource(name, description) {
        return this.ResourceModel.create({
            name,
            description,
        });
    }
    async getAllResource() {
        return this.ResourceModel.find();
    }
    async getResourceById(id) {
        return this.ResourceModel.findById(id);
    }
    async getResourceByName(name) {
        return this.ResourceModel.findOne({ name });
    }
    async updateResource(resourceId, update) {
        return this.ResourceModel.findByIdAndUpdate(resourceId, update, {
            new: true,
        });
    }
    async deleteResource(resourceId) {
        return this.ResourceModel.findByIdAndDelete(resourceId);
    }
    // Permission methods
    async createPermission(data) {
        return this.PermissionModel.create(data);
    }
    async getAllPermission() {
        return this.PermissionModel.find()
            .populate({ path: "resource", select: "name description" })
            .lean();
    }
    async getPermissionById(id) {
        return this.PermissionModel.findById(id);
    }
    async getPermissionByName(name) {
        return this.PermissionModel.findOne({ name });
    }
    async updatePermission(permissionId, update) {
        return this.PermissionModel.findByIdAndUpdate(permissionId, update, {
            new: true,
        });
    }
    async deletePermission(permissionId) {
        return this.PermissionModel.findByIdAndDelete(permissionId);
    }
    // Role methods
    async createRole(data) {
        return this.RoleModel.create(data);
    }
    async getAllRole() {
        return this.RoleModel.find().populate({
            path: "permissions",
            select: "name action description",
            populate: { path: "resource", select: "name description" },
        });
    }
    async getRoleById(id) {
        return this.RoleModel.findById(id);
    }
    async getRoleByName(name) {
        return this.RoleModel.findOne({ name });
    }
    async updateRole(roleId, update) {
        return this.RoleModel.findByIdAndUpdate(roleId, update, {
            new: true,
        });
    }
    async deleteRole(roleId) {
        return this.RoleModel.findByIdAndDelete(roleId);
    }
    async addPermissionToRole(roleName, permissionName) {
        const role = await this.RoleModel.findOne({ name: roleName });
        if (role &&
            !role.permissions
                .map((p) => p.toString())
                .includes(permissionName)) {
            role.permissions.push(Types.ObjectId.createFromHexString(permissionName));
            await role.save();
        }
    }
    async removePermissionFromRole(roleName, permissionName) {
        const role = await this.RoleModel.findOne({ name: roleName }).exec();
        if (role) {
            role.permissions.pull(permissionName);
            await role.save();
        }
    }
    // User-role binding methods
    async assignRoleToUser(userId, roleName) {
        // Logic to assign role to user in MongoDB (can be stored in a separate mapping collection)
    }
    async revokeRoleFromUser(userId, roleName) {
        // Logic to revoke role from user in MongoDB (can be stored in a separate mapping collection)
    }
    // Evaluation methods
    async userHasPermission(userId, permissionName) {
        // Logic to check if the user has the specified permission
        return true; // Placeholder
    }
    async userHasRole(userId, roleName) {
        // Logic to check if the user has the specified role
        return true; // Placeholder
    }
    async getUserPermissions(userId) {
        // Logic to get the user's permissions
        return []; // Placeholder
    }
    async getUserRoles(userId) {
        // Logic to get the user's roles
        return []; // Placeholder
    }
}
