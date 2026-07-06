//+====================== Teacher ======================+
import { User } from "./User.js";

export class Teacher extends User {
  constructor(id, fullName, email, password) {
    super(id, fullName, email, password, "teacher");
  }
}