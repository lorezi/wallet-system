import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ tableName: "transaction" })
export class Transaction extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id: number;

  @Column(DataType.INTEGER)
  public userId: number;

  @Column(DataType.INTEGER)
  public walletId: number;

  @Column(DataType.FLOAT)
  public amount: number;

  @Column(DataType.STRING)
  public transactionType: string;

  @CreatedAt
  public creationDate: string;
}
