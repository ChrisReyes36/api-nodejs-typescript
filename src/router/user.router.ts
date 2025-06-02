import { BaseRouter } from "./router";
import { UserController } from "../controllers/user.controller";

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  public routes(): void {
    this.router.get("/v1/users", (req, res) =>
      this.controller.getUsers(req, res)
    );
  }
}
