<template>
  <div class="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
    <h2 class="text-2xl font-bold mb-6 text-center text-slate-800">Reset Password</h2>
    
    <!-- Step 1: Request OTP -->
    <form v-if="!otpSent" @submit.prevent="requestOtp" class="space-y-4">
      <p class="text-sm text-slate-500 text-center mb-4">Enter your registered email address to receive an OTP.</p>
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
        <input v-model="email" type="email" required class="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-1 outline-none" />
      </div>
      <button type="submit" :disabled="loading" class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 transition disabled:opacity-70">
        {{ loading ? 'Sending OTP...' : 'Send OTP' }}
      </button>
    </form>

    <!-- Step 2: Verify OTP and Reset -->
    <form v-else @submit.prevent="resetPassword" class="space-y-4">
      <p class="text-sm text-emerald-600 font-semibold text-center mb-4">OTP sent successfully to your email!</p>
      
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Enter OTP</label>
        <input v-model="otp" type="text" required class="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-1 outline-none" />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">New Password</label>
        <input v-model="newPassword" type="password" required class="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-1 outline-none" />
      </div>

      <button type="submit" :disabled="loading" class="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-500 transition disabled:opacity-70">
        {{ loading ? 'Resetting...' : 'Reset Password' }}
      </button>
    </form>
    
    <p class="mt-6 text-center text-sm text-slate-500">
      Remembered your password? <router-link to="/login" class="text-indigo-600 font-semibold hover:underline">Log in</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '../api/axios';
import { useRouter } from 'vue-router';

const email = ref('');
const otp = ref('');
const newPassword = ref('');
const otpSent = ref(false);
const loading = ref(false);
const router = useRouter();

const requestOtp = async () => {
  loading.value = true;
  try {
    await apiClient.post('/api/v1/users/forgot-password', { email: email.value });
    otpSent.value = true;
  } catch (error) {
    alert('Failed to send OTP. Please check your email.');
  } finally {
    loading.value = false;
  }
};

const resetPassword = async () => {
  loading.value = true;
  try {
    await apiClient.post('/api/v1/users/reset-password', {
      email: email.value,
      otp: otp.value,
      newPassword: newPassword.value
    });
    alert('Password reset successfully! Please login with your new password.');
    router.push('/login');
  } catch (error) {
    alert('Failed to reset password. Invalid OTP.');
  } finally {
    loading.value = false;
  }
};
</script>