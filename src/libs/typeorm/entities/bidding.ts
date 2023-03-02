import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity()
export default class Bidding {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    item_id: string;

    @Column({ type: 'integer' })
    bid_price: number;

    @Column({ type: 'timestamp', nullable: true })
    created_at?: Date;
}
