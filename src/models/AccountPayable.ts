import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    AutoIncrement,
  } from "sequelize-typescript";
  
@Table
class AccountPayable extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  userId: number;

  @Column
  value: number

  @Column
  description: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
  
export default AccountPayable;
  