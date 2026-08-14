<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-slate-800 mb-6">Order History (Firestore)</h1>
    
    <div v-if="loading" class="text-center py-12 text-slate-500">Loading orders...</div>
    <div v-else-if="orders.length === 0" class="text-center py-12 text-slate-500">No orders placed yet.</div>

    <div v-else class="space-y-4">
      <div v-for="order in orders" :key="order.orderNumber" class="bg-white border rounded-xl p-5 shadow-sm">
        <div class="flex justify-between items-center border-b pb-3">
          <div>
            <span class="text-xs font-semibold text-slate-400">Order Number</span>
            <p class="font-mono text-sm font-bold text-indigo-600">{{ order.orderNumber }}</p>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold text-slate-400">Total Price</span>
            <p class="font-bold text-slate-800">LKR {{ order.totalPrice }}</p>
          </div>
        </div>
        
        <div class="mt-3">
          <h4 class="text-xs font-semibold text-slate-500 mb-2 uppercase">Items</h4>
          <ul class="text-sm space-y-1">
            <li v-for="(item, idx) in order.orderLineItemsList" :key="idx" class="flex justify-between text-slate-600">
              <span>Product ID: {{ item.productId }} (x{{ item.quantity }})</span>
              <span>LKR {{ item.price * item.quantity }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../api/axios';

const orders = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await apiClient.get('/api/v1/orders');
    orders.value = res.data;
  } catch (err) {
    console.error('Failed to load orders:', err);
  } finally {
    loading.value = false;
  }
});
</script>