import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    DataType,
    Model,
    PrimaryKey,
    Default,
    AutoIncrement,
  } from "sequelize-typescript";
  
@Table
class Finance extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  userId: number;

  @Column
  value: number

  @Column
  description: string

  @Column
  type: string

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
  
export default Finance;
  