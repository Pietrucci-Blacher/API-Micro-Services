import { Injectable } from '@nestjs/common';
import { User } from './stubs/user/v1/user';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}
    create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }
    findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
    delete(id: string): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
