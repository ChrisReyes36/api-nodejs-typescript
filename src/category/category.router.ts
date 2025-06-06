import { BaseRouter } from "../shared/router/router";
import { CategoryController } from "./controllers/category.controller";

export class CategoryRouter extends BaseRouter<CategoryController> {
  constructor() {
    super(CategoryController);
  }

  routes(): void {
    this.router.get("/v1/categories", (req, res) =>
      this.controller.getCategories(req, res)
    );
    this.router.get("/v1/categories/:id", (req, res) =>
      this.controller.getCategoryById(req, res)
    );
    this.router.post("/v1/categories", (req, res) =>
      this.controller.createCategory(req, res)
    );
    this.router.put("/v1/categories/:id", (req, res) =>
      this.controller.updateCategory(req, res)
    );
    this.router.delete("/v1/categories/:id", (req, res) =>
      this.controller.deleteCategory(req, res)
    );
  }
}
