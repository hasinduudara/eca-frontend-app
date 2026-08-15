<template>
  <div class="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
    <h2 class="text-2xl font-bold mb-6 text-center text-slate-800">Create Account</h2>
    
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
        <input v-model="name" type="text" required class="w-full rounded-lg border-slate-300 border p-2 focus:border-indigo-500 focus:ring-1 outline-none" />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
        <input v-model="email" type="email" required class="w-full rounded-lg border-slate-300 border p-2 focus:border-indigo-500 focus:ring-1 outline-none" />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input v-model="password" type="password" required class="w-full rounded-lg border-slate-300 border p-2 focus:border-indigo-500 focus:ring-1 outline-none" />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Profile Image (Optional)</label>
        <input @change="handleFileChange" type="file" accept="image/*" class="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
      </div>

      <button type="submit" :disabled="loading" class="w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-700 transition disabled:opacity-70 mt-4">
        {{ loading ? 'Creating Account...' : 'Register' }}
      </button>
    </form>
    
    <p class="mt-6 text-center text-sm text-slate-500">
      Already have an account? <router-link to="/login" class="text-indigo-600 font-semibold hover:underline">Log in</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '../api/axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const name = ref('');
const email = ref('');
const password = ref('');
const profileImage = ref(null);
const loading = ref(false);
const router = useRouter();

const handleFileChange = (e) => {
  profileImage.value = e.target.files[0];
};

const handleRegister = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    if (profileImage.value) {
      formData.append('profileImage', profileImage.value);
    }

    await apiClient.post('/api/v1/users/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    Swal.fire({
      icon: 'success',
      title: 'Registered!',
      text: 'Registration successful! Please login.',
      timer: 2500,
      showConfirmButton: false
    });
    
    router.push('/login');
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Registration failed. Please try again.',
    });
  } finally {
    loading.value = false;
  }
};
</script>