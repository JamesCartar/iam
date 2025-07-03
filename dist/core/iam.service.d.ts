import mongoose from "mongoose";
import { IIamService } from "./interfaces.js";
import { IResource, IResourceLean } from "src/adapters/mongo/models/resource.model.js";
import { IPermission, IPermissionLean } from "src/adapters/mongo/models/permission.model.js";
import { IRole, IRoleLean } from "src/adapters/mongo/models/role.model.js";
export declare class IamService implements IIamService {
    private mongoRepository;
    constructor(mongooseInstance: typeof mongoose);
    createResource(name: string, description?: string): Promise<IResource>;
    getAllResource(): Promise<IResource[]>;
    getResourceById(id: string): Promise<IResource | null>;
    getResourceByName(name: string): Promise<IResource | null>;
    updateResource(resourceId: string, update: Partial<IResourceLean>): Promise<IResource | null>;
    deleteResource(resourceId: string): Promise<IResource | null>;
    createPermission(data: {
        name: string;
        resource: string;
        action: string;
        description?: string;
    }): Promise<IPermission>;
    getAllPermission(): Promise<IPermission[] | []>;
    getPermissionById(id: string): Promise<IPermission | null>;
    getPermissionByName(name: string): Promise<IPermission | null>;
    updatePermission(permissionId: string, update: Partial<IPermissionLean>): Promise<IPermission | null>;
    deletePermission(permissionId: string): Promise<IPermission | null>;
    createRole(data: {
        name: string;
        permissions: string[];
    }): Promise<IRole>;
    getAllRole(): Promise<IRole[] | []>;
    getRoleById(id: string): Promise<IRole | null>;
    getRoleByName(name: string): Promise<IRole | null>;
    updateRole(roleId: string, update: Partial<IRoleLean>): Promise<IRole | null>;
    deleteRole(roleId: string): Promise<IRole | null>;
    addPermissionToRole(roleName: string, permissionName: string): Promise<void>;
    removePermissionFromRole(roleName: string, permissionName: string): Promise<void>;
    assignRoleToUser(userId: string, roleName: string): Promise<void>;
    revokeRoleFromUser(userId: string, roleName: string): Promise<void>;
    userHasPermission(userId: string, permissionName: string): Promise<boolean>;
    userHasRole(userId: string, roleName: string): Promise<boolean>;
    getUserPermissions(userId: string): Promise<string[]>;
    getUserRoles(userId: string): Promise<string[]>;
}
