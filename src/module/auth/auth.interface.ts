export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRoles {
  requiredRoles: "admin" | "user";
}

export interface IUserRole {
  userRole: "admin" | "user";
}
