import { Injectable } from '@angular/core';
import {LoggerService} from "./logger.service";

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Ноутбук', price: 75000 },
    { id: 2, name: 'Мышь', price: 1500 },
    { id: 3, name: 'Клавиатура', price: 3500 },
    { id: 4, name: 'Монитор', price: 25000 }
  ];

  // Обрати внимание! LoggerService ПРИХОДИТ извне (DI)
  constructor(private logger: LoggerService) {
    this.logger.log('ProductService создан');
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProduct(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
