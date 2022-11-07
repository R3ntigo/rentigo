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
    async getUsers() {
        const products = await this.productService.findProducts();
        return products;
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        const { ...productDetails } = createProductDto;
        this.productService.createProduct(productDetails);

    }

    @Delete()
    async deleteOne(@Param('id') id): string {
        await this.productService.deleteProduct(id);
    }

    @Put()
    async updateProduct(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        await this.productService.updateProducts(id, updateProductDto)
    }


}
