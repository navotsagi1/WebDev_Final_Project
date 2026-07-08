//+====================== Users ======================+
export class User {
  constructor(fullName, id, email, password, role) {
    this.fullName = fullName;
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}