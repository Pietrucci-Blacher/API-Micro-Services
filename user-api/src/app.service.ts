import { Injectable } from '@nestjs/common';
import { User } from './stubs/user/v1/user';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { Weather, WeatherServiceGetRequest } from './stubs/weather/v1/weather';
import { GetWeatherRequest } from './stubs/user/v1/user';
import { WeatherService } from './weather/weather.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {
    constructor(
        private prisma: PrismaService,
        private weatherService: WeatherService,
        private authService: AuthService,
    ) {}

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

    async getWeather(data: GetWeatherRequest): Promise<Weather> {
        const authenticated = await this.authService.isAuthenticated({
            accessToken: data.accessToken,
        });
        console.log('authenticated', authenticated);
        if (!authenticated?.userId) throw new Error('Unauthorized');

        const weather = await this.weatherService.get({
            id: data.id,
            location: data.location,
        });
        if (!weather) throw new Error('Location not found');

        return weather;
    }
}
