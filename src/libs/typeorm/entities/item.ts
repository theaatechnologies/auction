import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
} from 'typeorm';


export enum StateType {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
}

@Entity()
export default class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({
        type: "enum",
        enum: StateType,
        nullable: false,
    })
    state: StateType;

    @Column({ type: 'integer' })
    price: number;

    @Column({ type: 'timestamp', nullable: true })
    start: Date;

    @Column({ type: 'timestamp', nullable: true })
    end: Date;

    @Column({ type: 'timestamp', nullable: true })
    created_at?: Date;
}
