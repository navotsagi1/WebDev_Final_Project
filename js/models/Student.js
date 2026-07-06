//+====================== Student ======================+
import { User } from "./User.js";

export class Student extends User {
  constructor(id, fullName, email, password) {
    super(id, fullName, email, password, "student");
  }
}