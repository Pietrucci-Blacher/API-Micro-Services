import { Injectable } from '@nestjs/common';
import { Weather } from './stubs/weather/v1/weather';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}
    create(data: Prisma.WeatherCreateInput): Promise<Weather> {
        return this.prisma.weather.create({ data });
    }
    findAll(): Promise<Weather[]> {
        return this.prisma.weather.findMany();
    }
    delete(id: string): Promise<Weather> {
        return this.prisma.weather.delete({
            where: { id },
        });
    }
    findbyLocation(location: string) {
        return this.prisma.weather.findFirst({
            where: { location },
        });
    }
}
