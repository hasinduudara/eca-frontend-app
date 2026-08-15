<template>
  <header class="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      
      <router-link to="/" class="text-xl font-bold tracking-wider text-indigo-400">ECA SHOP</router-link>
      
      <nav class="flex items-center space-x-6">
        
        <!-- සාමාන්‍ය පරිශීලකයින් සඳහා පමණක් පෙනෙන ලින්ක් (Admin නොවන විට) -->
        <template v-if="authStore.user?.role !== 'ROLE_ADMIN'">
          <router-link to="/products" class="hover:text-indigo-300">Products</router-link>
          <router-link to="/orders" class="hover:text-indigo-300">My Orders</router-link>
          <router-link to="/cart" class="relative hover:text-indigo-300">
            Cart
            <span v-if="cartStore.totalCount > 0" class="absolute -top-2 -right-3 bg-red-500 text-xs px-1.5 py-0.5 rounded-full font-bold">
              {{ cartStore.totalCount }}
            </span>
          </router-link>
        </template>

        <!-- Admin සඳහා පමණක් පෙනෙන ලින්ක් -->
        <template v-if="authStore.user?.role === 'ROLE_ADMIN'">
          <router-link to="/admin" class="hover:text-indigo-300">Manage Products</router-link>
          <router-link to="/orders" class="hover:text-indigo-300">All Orders</router-link>
        </template>

        <!-- Profile සහ Logout (දෙපාර්ශවයටම පොදුයි) -->
        <div v-if="authStore.accessToken" class="flex items-center space-x-4 border-l border-slate-700 pl-4 ml-2">
          <router-link to="/profile" class="text-sm font-semibold text-slate-300 hover:text-white cursor-pointer">
            {{ authStore.user?.name || 'Profile' }}
          </router-link>
          <button @click="handleLogout" class="text-xs bg-slate-800 hover:bg-red-600 transition px-3 py-1.5 rounded">
            Logout
          </button>
        </div>
        
        <router-link v-else to="/login" class="bg-indigo-600 hover:bg-indigo-500 text-xs px-4 py-2 rounded font-semibold ml-2">
          Login
        </router-link>
      </nav>
      
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

// Logout වූ පසු Welcome Page එකට යොමු කිරීම
const handleLogout = () => {
  authStore.logout();
  router.push('/'); 
};
</script>