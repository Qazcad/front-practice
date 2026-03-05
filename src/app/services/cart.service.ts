import { Injectable } from '@angular/core';
import {Product, ProductService} from "./product.service";
import {LoggerService} from "./logger.service";

// Этот сервис мы НЕ будем регистрировать в 'root'
@Injectable() // <-- Просто @Injectable(), без providedIn
export class CartService {
  private cart = new Map<number, { product: Product; quantity: number }>();

  // Оба сервиса приходят через DI
  constructor(
    private productService: ProductService,
    private logger: LoggerService
  ) {
    this.logger.log('CartService создан (НОВЫЙ ЭКЗЕМПЛЯР!)');
  }

  addToCart(productId: number, quantity: number = 1): void {
    if (quantity <= 0) {
      this.logger.error(`Нельзя добавить ${quantity} товаров`);
      return;
    }

    const product = this.productService.getProduct(productId);
    if (!product) {
      this.logger.error(`Товар с id ${productId} не найден`);
      return;
    }

    const existingItem = this.cart.get(productId);
    if (existingItem) {
      existingItem.quantity += quantity;
      this.logger.log(`Товар "${product.name}" теперь в количестве ${existingItem.quantity} шт.`);
    } else {
      this.cart.set(productId, { product, quantity });
      this.logger.log(`Товар "${product.name}" добавлен (${quantity} шт.)`);
    }
  }

  removeFromCart(productId: number): void {
    const item = this.cart.get(productId);
    if (item) {
      this.cart.delete(productId);
      this.logger.log(`Товар "${item.product.name}" удален из корзины`);
    } else {
      this.logger.error(`Товар с id ${productId} не найден в корзине`);
    }
  }

  getCart() {
    return Array.from(this.cart.values());
  }

  getTotal(): number {
    let total = 0;
    for (const item of this.cart.values()) {
      total += item.product.price * item.quantity;
    }
    return total;
  }

  clearCart(): void {
    this.cart.clear();
    this.logger.log('Корзина очищена');
  }
}
