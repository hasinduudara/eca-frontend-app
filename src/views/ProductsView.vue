<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-slate-800 mb-6">Available Products</h1>
    
    <div v-if="loading" class="text-center py-12 text-slate-500">Loading products...</div>
    <div v-else-if="products.length === 0" class="text-center py-12 text-slate-500">No products found.</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
        <div class="h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
          <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" class="w-full h-full object-cover" />
          <span v-else class="text-slate-400 text-sm">No Image</span>
        </div>
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h2 class="font-semibold text-lg text-slate-800">{{ product.name }}</h2>
            <p class="text-slate-500 text-sm mt-1">{{ product.description }}</p>
          </div>
          <div class="mt-4 pt-4 border-t flex items-center justify-between">
            <div>
              <span class="text-xs text-slate-400 block">Stock: {{ product.stockQuantity }}</span>
              <span class="text-lg font-bold text-slate-900">LKR {{ product.price }}</span>
            </div>
            <button 
              @click="cartStore.addToCart(product)"
              :disabled="product.stockQuantity <= 0"
              class="bg-indigo-600 disabled:bg-slate-300 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-indigo-500">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../api/axios';
import { useCartStore } from '../stores/cart';

const products = ref([]);
const loading = ref(true);
const cartStore = useCartStore();

onMounted(async () => {
  try {
    const res = await apiClient.get('/api/v1/products');
    products.value = res.data;
  } catch (err) {
    console.error('Failed to fetch products:', err);
  } finally {
    loading.value = false;
  }
});
</script>