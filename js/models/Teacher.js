//+====================== Teacher ======================+
import { User } from "./User.js";

export class Teacher extends User {
  constructor(fullName, id, email, password) {
    super(fullName, id, email, password, "teacher");
  }
}