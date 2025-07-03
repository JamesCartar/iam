import { IPermission } from "src/adapters/mongo/models/permission.model";
import { IResource } from "src/adapters/mongo/models/resource.model";
import { IRole } from "src/adapters/mongo/models/role.model";

export interface IIamService {
    // Resource methods
    createResource(name: string, description?: string): Promise<IResource>;
    getAllResource(): Promise<IResource[]>;
    getResourceById(id: string): Promise<IResource | null>;
    getResourceByName(name: string): Promise<IResource | null>;
    updateResource(
        resourceId: string,
        update: Partial<IResource>
    ): Promise<IResource | null>;
    deleteResource(resourceId: string): Promise<IResource | null>;

    // Permission methods
    createPermission(data: {
        name: string;
        resource: string;
        action: string;
        description?: string;
    }): Promise<IPermission>;
    getAllPermission(): Promise<IPermission[]>;
    getPermissionById(id: string): Promise<IPermission | null>;
    getPermissionByName(name: string): Promise<IPermission | null>;
    updatePermission(
        permissionId: string,
        update: Partial<IPermission>
    ): Promise<IPermission | null>;
    deletePermission(permissionId: string): Promise<IPermission | null>;

    // Role methods
    createRole(data: { name: string; permissions: string[] }): Promise<IRole>;
    getAllRole(): Promise<IRole[]>;
    getRoleById(id: string): Promise<IRole | null>;
    getRoleByName(name: string): Promise<IRole | null>;
    updateRole(roleId: string, update: Partial<IRole>): Promise<IRole | null>;
    deleteRole(roleId: string): Promise<IRole | null>;
    addPermissionToRole(
        roleName: string,
        permissionName: string
    ): Promise<void>;
    removePermissionFromRole(
        roleName: string,
        permissionName: string
    ): Promise<void>;

    // User-role methods (optional)
    assignRoleToUser(userId: string, roleName: string): Promise<void>;
    revokeRoleFromUser(userId: string, roleName: string): Promise<void>;

    // Access evaluation
    userHasPermission(userId: string, permissionName: string): Promise<boolean>;
    userHasRole(userId: string, roleName: string): Promise<boolean>;
    getUserPermissions(userId: string): Promise<string[]>;
    getUserRoles(userId: string): Promise<string[]>;
}
