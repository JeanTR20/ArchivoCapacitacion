import { Column, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Delete } from '@nestjs/common';
import { generate } from "rxjs";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column({unique: true, nullable: false})
    email: string;
    
    @Column({nullable: false})
    password: string;

    @Column({default: 'user'})
    role: string;

    @DeleteDateColumn()
    deleteAt: Date;
}
