import { defineStore } from 'pinia';
import apiClient from '../api/axios';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalPrice: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
  },
  actions: {
    addToCart(product) {
      const existing = this.items.find(i => i.productId === product.id);
      if (existing) {
        if (existing.quantity < product.stockQuantity) {
          existing.quantity++;
        }
      } else {
        this.items.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          stock: product.stockQuantity
        });
      }
    },
    removeFromCart(productId) {
      this.items = this.items.filter(i => i.productId !== productId);
    },
    clearCart() {
      this.items = [];
    },
    async checkout(userId) {
      const payload = {
        userId: String(userId),
        orderLineItemsDtoList: this.items.map(item => ({
          productId: String(item.productId),
          price: item.price,
          quantity: item.quantity
        }))
      };
      const response = await apiClient.post('/api/v1/orders', payload);
      this.clearCart();
      return response.data;
    }
  }
});