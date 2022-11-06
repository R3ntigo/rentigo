import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
    @Get()
    findOne(): string {
        return 'Get One Items'; 
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto): string {
        return `Name: ${createProductDto.name}`;
    }


}
