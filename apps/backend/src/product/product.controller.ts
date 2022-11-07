import { Controller, Get, Post, Body, Req, Res, Param, Delete, Put} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Request, Response} from 'express';
import { ProductService } from './product.service';
// const manager = repository.manager;
// const metadata = repository.metadata;
// const queryRunner = repository.queryRunner;
// const target = repository.target;

@Controller('product')
export class ProductController {
    
    constructor(private productService: ProductService) {

    }

    @Get()
    findOne(@Param('id') id): string {
        return `Product ID: ${id}`; 
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        const { ...productDetails } = createProductDto;
        this.productService.createProduct(productDetails);

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
