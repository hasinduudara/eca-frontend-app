<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-slate-800 mb-6">Shopping Cart</h1>
    
    <div v-if="cartStore.items.length === 0" class="text-center py-12 bg-white rounded-xl border">
      <p class="text-slate-500">Your cart is empty.</p>
      <router-link to="/" class="mt-4 inline-block text-indigo-600 font-semibold">Browse Products</router-link>
    </div>

    <div v-else class="bg-white rounded-xl border p-6 space-y-4 shadow-sm">
      <div v-for="item in cartStore.items" :key="item.productId" class="flex items-center justify-between border-b pb-4">
        <div>
          <h3 class="font-semibold text-slate-800">{{ item.name }}</h3>
          <p class="text-sm text-slate-500">Price: LKR {{ item.price }} | Qty: {{ item.quantity }}</p>
        </div>
        <div class="flex items-center space-x-4">
          <span class="font-bold text-slate-800">LKR {{ item.price * item.quantity }}</span>
          <button @click="cartStore.removeFromCart(item.productId)" class="text-red-500 hover:text-red-700 text-sm font-semibold">Remove</button>
        </div>
      </div>

      <div class="pt-4 flex justify-between items-center text-lg font-bold">
        <span>Total:</span>
        <span>LKR {{ cartStore.totalPrice }}</span>
      </div>

      <button 
        @click="handleCheckout"
        :disabled="processing"
        class="w-full bg-emerald-600 disabled:bg-slate-300 text-white py-3 rounded-xl font-bold hover:bg-emerald-500 transition">
        {{ processing ? 'Placing Order...' : 'Place Order' }}
      </button>

      <p v-if="orderMessage" class="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg">
        {{ orderMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';

const cartStore = useCartStore();
const authStore = useAuthStore();
const processing = ref(false);
const orderMessage = ref('');

const handleCheckout = async () => {
  processing.value = true;
  orderMessage.value = '';
  try {
    const userId = authStore.user?.id || 1;
    const res = await cartStore.checkout(userId);
    orderMessage.value = res;
  } catch (err) {
    alert('Failed to place order: ' + (err.response?.data?.message || err.message));
  } finally {
    processing.value = false;
  }
};
</script>