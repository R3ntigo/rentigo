import { Controller, Get, Post, Body, Req, Res, Param, Delete, Put} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Request, Response} from 'express';

@Controller('product')
export class ProductController {
    @Get()
    findOne(@Param('id') id): string {
        return `Product ID: ${id}`; 
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto): string {
        return `Name: ${createProductDto.name}`;
    }

    @Delete()
    deleteOne(@Param('id') id): string {
        return `Delete ${id}`;
    }

    @Put()
    updateOne(@Body() updateProductDto: CreateProductDto, @Param('id') id): string {
        return `Update ${id} - Name: ${updateProductDto}`;
    }


}
