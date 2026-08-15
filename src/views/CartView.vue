<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-slate-800 mb-6">Shopping Cart</h1>
    
    <div v-if="cartStore.items.length === 0" class="text-center py-12 bg-white rounded-xl border">
      <p class="text-slate-500">Your cart is empty.</p>
      <!-- Updated link to point to products page -->
      <router-link to="/products" class="mt-4 inline-block text-indigo-600 font-semibold">Browse Products</router-link>
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();
const processing = ref(false);

const handleCheckout = async () => {
  processing.value = true;
  try {
    const userId = authStore.user?.id || 1;
    
    // Process the checkout via the store
    await cartStore.checkout(userId);
    
    // Show success alert using SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      text: 'Your order has been placed successfully.',
      timer: 2500,
      showConfirmButton: false
    });

    // Redirect user to the orders history page
    router.push('/orders');
    
  } catch (err) {
    // Show error alert using SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Checkout Failed',
      text: err.response?.data?.message || err.message || 'Failed to place order. Please try again.',
    });
  } finally {
    processing.value = false;
  }
};
</script>