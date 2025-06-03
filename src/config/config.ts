import * as dotenv from "dotenv";
import mysql2 from "mysql2";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export abstract class ConfigServer {
  constructor() {
    const nodeNameEnv: string = this.createPathEnv(this.nodeEnv);
    dotenv.config({ path: nodeNameEnv });
  }

  public getEnvironment(key: string): string | undefined {
    return process.env[key];
  }

  public getNumberEnv(key: string): number {
    return Number(this.getEnvironment(key));
  }

  public get nodeEnv(): string {
    return this.getEnvironment("NODE_ENV")?.trim() || "";
  }

  public createPathEnv(path: string): string {
    const arrEnv: Array<string> = ["env"]; //['hola', 'mundo'] => 'hola.mundo'

    if (path.length > 0) {
      const stringToArray: Array<string> = path.split(".");
      arrEnv.unshift(...stringToArray);
    }

    return "." + arrEnv.join(".");
  }

  public get typeORMConfig(): DataSource {
    return new DataSource({
      type: "mysql",
      driver: mysql2,
      host: this.getEnvironment("DB_HOST"),
      port: this.getNumberEnv("DB_PORT"),
      username: this.getEnvironment("DB_USER"),
      password: this.getEnvironment("DB_PASSWORD"),
      database: this.getEnvironment("DB_DATABASE"),
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    });
  }
}
