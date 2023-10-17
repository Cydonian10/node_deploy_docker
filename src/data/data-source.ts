import { DataSource, DataSourceOptions } from "typeorm";

export class DataBase {
  private static dataSource: DataSource;

  static async connect(options: DataSourceOptions) {
    try {
      this.dataSource = new DataSource(options);
      await this.dataSource.initialize();
      console.log(["✅ Exitos"]);
    } catch (error) {
      console.log("[💥 Error boom]");
      throw error;
    }
  }

  static async disconnect() {
    this.dataSource.destroy();
  }
}
