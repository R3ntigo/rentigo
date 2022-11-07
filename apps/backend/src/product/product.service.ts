import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '';
@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
    ) {
        
    }    
}
