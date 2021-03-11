import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}
class CreateProductService {
    public async execute({
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository); //acesso a tabela products
        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('Já existe um produco com este nome', 400);
        }

        const product = productsRepository.create({ name, price, quantity }); // ele prepara para criar no banco, sem await

        await productsRepository.save(product); // aqui é salvo , await

        return product;
    }
}

export default CreateProductService;
