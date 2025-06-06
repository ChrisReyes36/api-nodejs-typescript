import { BaseRouter } from "../shared/router/router";
import { UserController } from "./controllers/user.controller";

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  public routes(): void {
    this.router.get("/v1/users", (req, res) =>
      this.controller.getUsers(req, res)
    );

    this.router.get("/v1/users/:id", (req, res) =>
      this.controller.getUserById(req, res)
    );

    this.router.post("/v1/users", (req, res) =>
      this.controller.createUser(req, res)
    );

    this.router.put("/v1/users/:id", (req, res) =>
      this.controller.updateUser(req, res)
    );

    this.router.delete("/v1/users/:id", (req, res) =>
      this.controller.deleteUser(req, res)
    );
  }
}
