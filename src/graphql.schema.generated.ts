
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
    body?: string;
}

export class User {
    id: string;
    email: string;
    post: Post[];
}

export class Post {
    id: string;
    title: string;
    body?: string;
    author: User;
}

export class AuthPayload {
    id: string;
    email: string;
}

export class UserToken {
    token: string;
    user: User;
}

export abstract class IQuery {
    abstract post(id: string): Post | Promise<Post>;

    abstract posts(): Post[] | Promise<Post[]>;
}

export abstract class IMutation {
    abstract signup(input?: SignUpInput): UserToken | Promise<UserToken>;

    abstract login(input?: LoginInput): UserToken | Promise<UserToken>;

    abstract createPost(postInput?: PostInput): Post | Promise<Post>;
}
