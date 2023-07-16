import { Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import {
    Token,
    AuthServiceRegisterRequest,
    AuthServiceLoginRequest,
    AuthServiceLoginResponse,
    AuthServiceLogoutRequest,
} from './stubs/auth/v1/auth';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user/user.service';
import * as dotenv from 'dotenv';

dotenv.config();

const generateToken = (user, service) => {
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    return { accessToken, refreshToken };
};

const checkEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

@Injectable()
export class AppService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
    ) {}

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

    findByUserId(userId: string): Promise<Token> {
        return this.prisma.token.findFirst({
            where: { userId },
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

    async register(data: AuthServiceRegisterRequest) {
        if (data.password.length < 8)
            throw new Error('Password must be at least 8 characters');

        if (!checkEmail(data.email)) throw new Error('Invalid email');

        await this.userService.add(data);
    }

    async login(
        data: AuthServiceLoginRequest,
    ): Promise<AuthServiceLoginResponse> {
        if (data.password.length < 8)
            throw new Error('Password must be at least 8 characters');

        if (!checkEmail(data.email)) throw new Error('Invalid email');

        const user = await this.userService.get({ email: data.email });
        if (!user) throw new Error('User not found');

        if (user.password !== data.password)
            throw new Error('Invalid password');

        const { accessToken, refreshToken } = generateToken(user, this);

        const token = await this.findByUserId(user.id);

        if (token) await this.delete(token.id);

        await this.create({
            accessToken,
            refreshToken,
            userId: user.id,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async logout(data: AuthServiceLogoutRequest) {
        const tokenData = await this.findByToken(data.token);
        if (!tokenData) throw new Error('Token not found');

        await this.delete(tokenData.id);
    }

    async isAuthenticated(token: string) {
        const tokenData = await this.findByToken(token);
        if (!tokenData) throw new Error('Token not found');

        const user = await this.userService.get({ id: tokenData.userId });
        if (!user) throw new Error('User not found');

        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
