import { BaseRouter } from "../shared/router/router";
import { PurchaseProductController } from "./controllers/purchase-product.controller";

export class PurchaseProductRouter extends BaseRouter<PurchaseProductController> {
  constructor() {
    super(PurchaseProductController);
  }

  routes(): void {
    this.router.get("/v1/purchase-products", (req, res) =>
      this.controller.getPurchaseProducts(req, res)
    );
    this.router.get("/v1/purchase-products/:id", (req, res) =>
      this.controller.getPurchaseProductById(req, res)
    );
    this.router.post("/v1/purchase-products", (req, res) =>
      this.controller.createPurchaseProduct(req, res)
    );
    this.router.put("/v1/purchase-products/:id", (req, res) =>
      this.controller.updatePurchaseProduct(req, res)
    );
    this.router.delete("/v1/purchase-products/:id", (req, res) =>
      this.controller.deletePurchaseProduct(req, res)
    );
  }
}
