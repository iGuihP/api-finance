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

  @Column
  recurrence: boolean;

  @Column
  financeStart: Date;

  @Column
  financeEnd: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
  
export default Finance;
  