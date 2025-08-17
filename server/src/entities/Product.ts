import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

  @Column("decimal")
  price!: number;

  @Column()
  stock!: number;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ nullable: true })
  category!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
