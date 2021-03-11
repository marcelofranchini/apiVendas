import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
interface IRequest {
    id: string;
}

class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Not found', 404);
        }

        return product;
    }
}

export default ShowProductService;
