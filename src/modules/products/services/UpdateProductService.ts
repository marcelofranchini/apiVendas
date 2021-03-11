import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Not found', 404);
        }

        const productExists = await productsRepository.findByName(name);
        if (productExists) {
            throw new AppError('Já existe um produco com este nome', 400);
        }
        product.name = name;
        product.price = price;
        product.quantity = quantity;
        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
