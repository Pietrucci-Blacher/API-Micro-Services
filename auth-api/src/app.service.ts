import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { Token } from './stubs/auth/v1/auth';
import jwt from 'jsonwebtoken';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

    create(data: Prisma.TokenCreateInput): Promise<Token> {
        return this.prisma.token.create({ data });
    }

    findAll(): Promise<Token[]> {
        return this.prisma.token.findMany();
    }

    delete(id: string): Promise<Token> {
        return this.prisma.token.delete({
            where: { id },
        });
    }

    findById(id: string): Promise<Token> {
        return this.prisma.token.findUnique({
            where: { id },
        });
    }

    findByToken(token: string): Promise<Token> {
        return this.prisma.token.findFirst({
            where: {
                OR: [{ accessToken: token }, { refreshToken: token }],
            },
        });
    }

    update(id: string, data: Prisma.TokenUpdateInput): Promise<Token> {
        return this.prisma.token.update({
            where: { id },
            data,
        });
    }
}
