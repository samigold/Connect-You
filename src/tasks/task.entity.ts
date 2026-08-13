import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity"

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column({default: false })
    isCompleted: boolean

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(()=> User, (user) => user.tasks)
    user: User
}