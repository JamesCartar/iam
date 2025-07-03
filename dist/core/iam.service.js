import { MongoIamRepository } from "../adapters/mongo/iam.mongo.service.js";
export class IamService {
    constructor(mongooseInstance) {
        this.mongoRepository = new MongoIamRepository(mongooseInstance);
    }
    // Resource methods
    async createResource(name, description) {
        return this.mongoRepository.createResource(name, description);
    }
    async getAllResource() {
        return this.mongoRepository.getAllResource();
    }
    async getResourceById(id) {
        return this.mongoRepository.getResourceById(id);
    }
    async getResourceByName(name) {
        return this.mongoRepository.getResourceByName(name);
    }
    async updateResource(resourceId, update) {
        return this.mongoRepository.updateResource(resourceId, update);
    }
    async deleteResource(resourceId) {
        return this.mongoRepository.deleteResource(resourceId);
    }
    // Permission methods
    async createPermission(data) {
        return this.mongoRepository.createPermission(data);
    }
    async getAllPermission() {
        return this.mongoRepository.getAllPermission();
    }
    async getPermissionById(id) {
        return this.mongoRepository.getPermissionById(id);
    }
    async getPermissionByName(name) {
        return this.mongoRepository.getPermissionByName(name);
    }
    async updatePermission(permissionId, update) {
        return this.mongoRepository.updatePermission(permissionId, update);
    }
    async deletePermission(permissionId) {
        return this.mongoRepository.deletePermission(permissionId);
    }
    // Role methods
    async createRole(data) {
        return this.mongoRepository.createRole(data);
    }
    async getAllRole() {
        return this.mongoRepository.getAllRole();
    }
    async getRoleById(id) {
        return this.mongoRepository.getRoleById(id);
    }
    async getRoleByName(name) {
        return this.mongoRepository.getRoleByName(name);
    }
    async updateRole(roleId, update) {
        return this.mongoRepository.updateRole(roleId, update);
    }
    async deleteRole(roleId) {
        return this.mongoRepository.deleteRole(roleId);
    }
    async addPermissionToRole(roleName, permissionName) {
        throw new Error("Not implemented");
    }
    async removePermissionFromRole(roleName, permissionName) {
        throw new Error("Not implemented");
    }
    // User-role binding methods
    async assignRoleToUser(userId, roleName) {
        throw new Error("Not implemented");
    }
    async revokeRoleFromUser(userId, roleName) {
        throw new Error("Not implemented");
    }
    // Evaluation methods
    async userHasPermission(userId, permissionName) {
        throw new Error("Not implemented");
    }
    async userHasRole(userId, roleName) {
        throw new Error("Not implemented");
    }
    async getUserPermissions(userId) {
        throw new Error("Not implemented");
    }
    async getUserRoles(userId) {
        throw new Error("Not implemented");
    }
}
