import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from '../tasks/task.entity';

export enum UserRole {
    CLIENT = 'client',
    PROVIDER = 'provider'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
    role: UserRole;

    @Column({ default: false })
    isVerified: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]
}