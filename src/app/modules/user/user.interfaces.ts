export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED = 'BLOCKED',
    DELETED = 'DELETED',
    RESTRICTRED = 'RESTRICTED'
}

export enum UserRole{
    SUPERADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface IUser {
    fullName: string;
    email: string;
    password?: string;
    status?: string;
    role?: string;
    profilePhoto?: string | null | undefined;
}