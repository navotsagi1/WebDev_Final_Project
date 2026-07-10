//+====================== Student ======================+
import { User } from "./User.js";

export class Student extends User {
  constructor(fullName, id, email, password) {
    super(fullName, id, email, password, "student");
  }
}