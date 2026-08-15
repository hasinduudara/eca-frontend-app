<template>
  <header class="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      
      <!-- Brand Logo - Welcome පිටුවට යොමු කරයි -->
      <router-link to="/" class="text-xl font-bold tracking-wider text-indigo-400">ECA SHOP</router-link>
      
      <nav class="flex items-center space-x-6">
        <!-- Products සහ Orders ලින්ක් -->
        <router-link to="/products" class="hover:text-indigo-300">Products</router-link>
        <router-link to="/orders" class="hover:text-indigo-300">Orders</router-link>
        
        <!-- Admin ලින්ක් එක - දර්ශනය වන්නේ Role එක 'ROLE_ADMIN' නම් පමණි -->
        <router-link v-if="authStore.user?.role === 'ROLE_ADMIN'" to="/admin" class="hover:text-indigo-300">Admin</router-link>

        <router-link to="/cart" class="relative hover:text-indigo-300">
          Cart
          <span v-if="cartStore.totalCount > 0"
            class="absolute -top-2 -right-3 bg-red-500 text-xs px-1.5 py-0.5 rounded-full font-bold">
            {{ cartStore.totalCount }}
          </span>
        </router-link>

        <div v-if="authStore.accessToken" class="flex items-center space-x-3 border-l border-slate-700 pl-4">
          <router-link to="/profile" class="text-sm font-semibold text-slate-300 hover:text-white cursor-pointer">
            {{ authStore.user?.name || 'Profile' }}
          </router-link>
          <button @click="authStore.logout()"
            class="text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded">Logout</button>
        </div>
        
        <router-link v-else to="/login"
          class="bg-indigo-600 hover:bg-indigo-500 text-xs px-3 py-1.5 rounded font-semibold">Login</router-link>
      </nav>
      
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useCartStore } from '../stores/cart';

const authStore = useAuthStore();
const cartStore = useCartStore();
</script>