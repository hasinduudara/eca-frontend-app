<template>
  <div class="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
    <h2 class="text-2xl font-bold mb-6 text-center text-slate-800">Welcome Back</h2>
    
    <form @submit.prevent="handleLogin" class="space-y-5">
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
        <input v-model="email" type="email" required class="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="john@example.com" />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input v-model="password" type="password" required class="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="••••••••" />
      </div>

      <button type="submit" :disabled="loading" class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 transition disabled:opacity-70">
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>
    
    <p class="mt-6 text-center text-sm text-slate-500">
      Don't have an account? 
      <router-link to="/register" class="text-indigo-600 font-semibold hover:underline">Register here</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    router.push('/'); // Login වූ පසු Home (Products) පිටුවට යැවීම
  } catch (error) {
    alert('Login failed. Please check your credentials.');
  } finally {
    loading.value = false;
  }
};
</script>