import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '';
import { CreateProductDto } from './dto/create-product.dto';
@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
    ) {

    }
    findProducts(){
        return this.userRepository.find();
    }

    createProduct(productDetails: CreateProductParams) {
        const newProduct = this.productRepository.create({
            ...productDetails,
            uploadedOn: new Date(),
        });
        return this.productRepository.save(newProduct);
    }

    updateProducts(id: string, updateProductDetails: UpdateProductParams){
        return this.productRepository.update({ id }, { ...updateProductDetails });
    }

    deleteProduct(id: string){
        return this.productRepository.delete({ id });
    }
}
