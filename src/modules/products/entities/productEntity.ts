import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title: string

    @Column()
    image: string

    @Column({
      type: 'numeric',
    })
    price: number

    @Column()
    description: string

    @Column({
      unique: true,
    })
    url: string

    @UpdateDateColumn()
    updated_at?: Date
}
