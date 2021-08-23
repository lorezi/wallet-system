import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ tableName: "user" })
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id: number;

  @Column(DataType.STRING)
  public fullName: string;

  @Column(DataType.STRING)
  public username: string;

  @Column(DataType.STRING)
  public phoneNo: string;

  @Column(DataType.STRING)
  public email: string;

  @Column(DataType.STRING)
  public accountNo: string;

  @Column(DataType.STRING)
  public otp: string;

  @Column(DataType.STRING)
  public status: string;

  @CreatedAt
  public creationDate: string;
}
