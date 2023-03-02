import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
} from 'typeorm';

@Entity()
@Index(['username', 'email'], { unique: true })
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    @Index()
    username: string;

    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'text', nullable: true })
    password: string;
}
