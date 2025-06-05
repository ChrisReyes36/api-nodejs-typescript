import express, { Application, json, urlencoded, Router } from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./user/user.router";
import { ConfigServer } from "./config/config";
import { PurchaseRouter } from "./purchase/purchase.router";
import { ProductRouter } from "./product/product.router";
import { CustomerRouter } from "./customer/customer.router";
import { CategoryRouter } from "./category/category.router";
import { PurchaseProductRouter } from "./purchase/purchase-product.router";

class ServerBootstrap extends ConfigServer {
  private app: Application = express();
  private port: number = this.getNumberEnv("PORT");

  constructor() {
    super();
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.dbConnect()
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((error: Error) => {
        console.error("Database connection failed:", error);
      });

    this.app.use("/api", this.routers());

    this.listen();
  }

  routers(): Array<Router> {
    return [
      new UserRouter().router,
      new PurchaseRouter().router,
      new ProductRouter().router,
      new CustomerRouter().router,
      new CategoryRouter().router,
      new PurchaseProductRouter().router,
    ];
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

new ServerBootstrap();
