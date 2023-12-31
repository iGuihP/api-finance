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
class PaymentTransaction extends Model {
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
  type: 'EXIT' | 'ENTRANCE';

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
  
export default PaymentTransaction;
  