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
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @UpdatedAt
  deletedAt: Date;
}
  
export default User;
  