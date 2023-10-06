import { Column, DeleteDateColumn, Entity, ManyToOne } from "typeorm";
import { Delete } from '@nestjs/common';
import { Breed } from "src/breeds/entities/breed.entity";

@Entity()
export class Cat {
    @Column({primary: true, generated: true})
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    
    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Breed, (breed)=> breed.id, {
        eager: true,
    })
    breed: Breed;

}
