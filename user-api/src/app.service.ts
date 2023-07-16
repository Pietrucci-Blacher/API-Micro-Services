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

    findById(id: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    findByName(name: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: { name },
        });
    }

    findByEmail(email: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }
}
