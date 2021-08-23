import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ tableName: "wallet" })
export class Wallet extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id: number;

  @Column(DataType.INTEGER)
  public userId: number;

  @Column(DataType.FLOAT)
  public amount: number;

  @CreatedAt
  public creationDate: string;
}
