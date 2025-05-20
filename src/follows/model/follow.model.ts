import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  Index,
} from 'sequelize-typescript';
import { User } from '../../users/model/user.model';

// Interface for full attributes
export interface FollowsAttributes {
  followerId: number;
  followedId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for creation attributes (what's needed during .create or .bulkCreate)
export interface FollowsCreationAttributes extends FollowsAttributes {}

@Table({
  tableName: 'follows',
  timestamps: true, // recommended for activity tracking
   indexes: [
    {
      unique: true,
      fields: ['followerId', 'followedId'],
    },
  ],
})
export class Follows extends Model<FollowsAttributes, FollowsCreationAttributes> implements FollowsAttributes {

  @ForeignKey(() => User)
  @Index // index on followerId
  @Column(DataType.INTEGER.UNSIGNED)
  followerId: number;

  @ForeignKey(() => User)
  @Index // index on followedId
  @Column(DataType.INTEGER.UNSIGNED)
  followedId: number;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
