import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
} from 'typeorm';

@Entity()
export default class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column({ type: 'integer' })
    balance: number;

    @Column({ type: 'timestamp', nullable: true })
    created_at?: Date;
}
