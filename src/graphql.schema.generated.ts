
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class SignUpInput {
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class PostInput {
    title: string;
    body: string;
    authorEmail: string;
}

export class RolInput {
    name: string;
    description: string;
    state: number;
}

export class UserRolInput {
    authorEmail: string;
    rolName: string;
    state: number;
}

export class User {
    id: string;
    email: string;
    post: Post[];
}

export class Roles {
    id: string;
    name: string;
    description?: string;
    state: number;
}

export class UserRoles {
    id: string;
    usuario: User;
    perfil: Roles;
    state: number;
}

export class Ruta {
    id: string;
    ruta: string;
    state: number;
}

export class RutasRoles {
    id: string;
    rutas: Ruta;
    perfil: Roles;
    state: number;
}

export class Post {
    id: string;
    title: string;
    body?: string;
    author?: User;
}

export class AuthPayload {
    id: string;
    email: string;
}

export class UserToken {
    token: string;
    user: User;
}

export class PostModel {
    post: Post;
}

export abstract class IQuery {
    abstract post(id: string): Post | Promise<Post>;

    abstract posts(): Post[] | Promise<Post[]>;
}

export abstract class IMutation {
    abstract signup(input?: SignUpInput): UserToken | Promise<UserToken>;

    abstract login(input?: LoginInput): UserToken | Promise<UserToken>;

    abstract createPost(input?: PostInput): Post | Promise<Post>;

    abstract createRol(input?: RolInput): Roles | Promise<Roles>;
}
