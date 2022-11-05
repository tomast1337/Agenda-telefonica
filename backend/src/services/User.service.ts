import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async findByUUID(uuid: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { uuid },
        });
    }

    async findByLogin(login: string) {
        return await this.userRepository.findOne({
            where: { login },
        });
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async delete(uuid: string): Promise<User> {
        const user = await this.findByUUID(uuid);
        return await this.userRepository.remove(user);
    }
}
