import mongoose from "mongoose";
import { MongoIamRepository } from "../adapters/mongo/iam.mongo.service.js";
import { IIamService } from "./interfaces.js";
import {
    IResource,
    IResourceLean,
} from "src/adapters/mongo/models/resource.model.js";
import {
    IPermission,
    IPermissionLean,
} from "src/adapters/mongo/models/permission.model.js";
import { IRole, IRoleLean } from "src/adapters/mongo/models/role.model.js";

export class IamService implements IIamService {
    private mongoRepository: MongoIamRepository;
    constructor(mongooseInstance: typeof mongoose) {
        this.mongoRepository = new MongoIamRepository(mongooseInstance);
    }
    // Resource methods
    async createResource(
        name: string,
        description?: string
    ): Promise<IResource> {
        return this.mongoRepository.createResource(name, description);
    }

    async getAllResource(): Promise<IResource[]> {
        return this.mongoRepository.getAllResource();
    }

    async getResourceById(id: string): Promise<IResource | null> {
        return this.mongoRepository.getResourceById(id);
    }

    async getResourceByName(name: string): Promise<IResource | null> {
        return this.mongoRepository.getResourceByName(name);
    }

    async updateResource(
        resourceId: string,
        update: Partial<IResourceLean>
    ): Promise<IResource | null> {
        return this.mongoRepository.updateResource(resourceId, update);
    }

    async deleteResource(resourceId: string): Promise<IResource | null> {
        return this.mongoRepository.deleteResource(resourceId);
    }

    // Permission methods
    async createPermission(data: {
        name: string;
        resource: string;
        action: string;
        description?: string;
    }): Promise<IPermission> {
        return this.mongoRepository.createPermission(data);
    }

    async getAllPermission(): Promise<IPermission[] | []> {
        return this.mongoRepository.getAllPermission();
    }

    async getPermissionById(id: string): Promise<IPermission | null> {
        return this.mongoRepository.getPermissionById(id);
    }

    async getPermissionByName(name: string): Promise<IPermission | null> {
        return this.mongoRepository.getPermissionByName(name);
    }

    async updatePermission(
        permissionId: string,
        update: Partial<IPermissionLean>
    ): Promise<IPermission | null> {
        return this.mongoRepository.updatePermission(permissionId, update);
    }

    async deletePermission(permissionId: string): Promise<IPermission | null> {
        return this.mongoRepository.deletePermission(permissionId);
    }

    // Role methods
    async createRole(data: {
        name: string;
        permissions: string[];
    }): Promise<IRole> {
        return this.mongoRepository.createRole(data);
    }

    async getAllRole(): Promise<IRole[] | []> {
        return this.mongoRepository.getAllRole();
    }

    async getRoleById(id: string): Promise<IRole | null> {
        return this.mongoRepository.getRoleById(id);
    }

    async getRoleByName(name: string): Promise<IRole | null> {
        return this.mongoRepository.getRoleByName(name);
    }

    async updateRole(
        roleId: string,
        update: Partial<IRoleLean>
    ): Promise<IRole | null> {
        return this.mongoRepository.updateRole(roleId, update);
    }

    async deleteRole(roleId: string): Promise<IRole | null> {
        return this.mongoRepository.deleteRole(roleId);
    }

    async addPermissionToRole(
        roleName: string,
        permissionName: string
    ): Promise<void> {
        throw new Error("Not implemented");
    }

    async removePermissionFromRole(
        roleName: string,
        permissionName: string
    ): Promise<void> {
        throw new Error("Not implemented");
    }

    // User-role binding methods
    async assignRoleToUser(userId: string, roleName: string): Promise<void> {
        throw new Error("Not implemented");
    }

    async revokeRoleFromUser(userId: string, roleName: string): Promise<void> {
        throw new Error("Not implemented");
    }

    // Evaluation methods
    async userHasPermission(
        userId: string,
        permissionName: string
    ): Promise<boolean> {
        throw new Error("Not implemented");
    }

    async userHasRole(userId: string, roleName: string): Promise<boolean> {
        throw new Error("Not implemented");
    }

    async getUserPermissions(userId: string): Promise<string[]> {
        throw new Error("Not implemented");
    }

    async getUserRoles(userId: string): Promise<string[]> {
        throw new Error("Not implemented");
    }
}
