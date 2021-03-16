
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class SignUpInput {
    user_email: string;
    user_password: string;
}

export class LoginInput {
    user_email: string;
    user_password: string;
}

export class PostInput {
    post_title: string;
    post_body: string;
    user_id: number;
}

export class RoleInput {
    role_name: string;
    role_description: string;
}

export class AuthUser {
    user_id: string;
    user_email: string;
    post: GeTpost[];
    role?: AuthRole;
}

export class AuthRole {
    role_id: string;
    role_name: string;
    role_description?: string;
    role_state: number;
}

export class AuthPermissions {
    permissions_id: string;
    permissions_name: string;
    permissions_state: number;
}

export class AuthRolpermissions {
    rolpermissions_id: string;
    permissions: AuthPermissions;
    role: AuthRole;
    rolpermissions_state: number;
}

export class GeTpost {
    post_id: string;
    post_title: string;
    post_body?: string;
    user?: AuthUser;
}

export class AuthPayload {
    user_id: string;
    user_email: string;
}

export class UserToken {
    token: string;
    user: AuthUser;
}

export class PostModel {
    post: GeTpost;
}

export abstract class IQuery {
    abstract post(id: string): GeTpost | Promise<GeTpost>;

    abstract posts(): GeTpost[] | Promise<GeTpost[]>;
}

export abstract class IMutation {
    abstract signup(input?: SignUpInput): UserToken | Promise<UserToken>;

    abstract login(input?: LoginInput): UserToken | Promise<UserToken>;

    abstract createPost(input?: PostInput): GeTpost | Promise<GeTpost>;

    abstract createRol(input?: RoleInput): AuthRole | Promise<AuthRole>;
}
