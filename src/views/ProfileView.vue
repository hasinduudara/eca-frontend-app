<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">My Profile</h1>
    
    <div v-if="authStore.user" class="bg-white rounded-xl shadow-sm border p-6">
      <div class="flex items-center space-x-6 mb-8">
        
        <!-- Current Profile Image -->
        <div class="h-24 w-24 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center border shadow-sm">
          <img v-if="authStore.user.profileImageUrl" :src="authStore.user.profileImageUrl" class="h-full w-full object-cover" alt="Profile" />
          <span v-else class="text-slate-400 font-bold text-2xl">{{ authStore.user.name.charAt(0) }}</span>
        </div>
        
        <!-- New Image Preview (Shows only when a new image is selected) -->
        <div v-if="imagePreview" class="flex items-center space-x-4">
          <span class="text-slate-400 text-sm">➡</span>
          <div class="h-24 w-24 bg-indigo-50 rounded-full overflow-hidden flex items-center justify-center border-2 border-indigo-500 shadow-md">
            <img :src="imagePreview" class="h-full w-full object-cover" alt="New Preview" />
          </div>
          <span class="text-xs text-indigo-600 font-semibold bg-indigo-100 px-2 py-1 rounded-full">New</span>
        </div>

        <div v-if="!imagePreview">
          <h2 class="text-xl font-bold text-slate-800">{{ authStore.user.name }}</h2>
          <p class="text-slate-500">{{ authStore.user.email }}</p>
        </div>
      </div>

      <form @submit.prevent="updateProfile" class="space-y-5 border-t pt-6">
        <h3 class="text-lg font-semibold text-slate-700">Update Information</h3>
        
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input v-model="editForm.name" type="text" class="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input v-model="editForm.email" type="email" class="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">New Profile Image</label>
          <input @change="handleImageChange" type="file" accept="image/*" class="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 border rounded-lg p-2" />
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 transition disabled:opacity-70">
          {{ loading ? 'Updating...' : 'Save Changes' }}
        </button>
      </form>
    </div>
    <div v-else class="text-center py-12 text-slate-500">
      Please log in to view your profile.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import apiClient from '../api/axios';
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const loading = ref(false);
const imageFile = ref(null);
const imagePreview = ref(null); // Added state for preview URL

const editForm = ref({
  name: '',
  email: ''
});

onMounted(() => {
  if (authStore.user) {
    editForm.value.name = authStore.user.name;
    editForm.value.email = authStore.user.email;
  }
});

// Handle file selection and generate preview URL
const handleImageChange = (e) => {
  const file = e.target.files[0];
  imageFile.value = file;

  if (file) {
    // Generate a temporary local URL for the selected profile image
    imagePreview.value = URL.createObjectURL(file);
  } else {
    imagePreview.value = null;
  }
};

const updateProfile = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('name', editForm.value.name);
    formData.append('email', editForm.value.email);
    if (imageFile.value) {
      formData.append('profileImage', imageFile.value);
    }

    const res = await apiClient.put(`/api/v1/users/update/${authStore.user.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    // Update store and local storage
    authStore.user = res.data;
    localStorage.setItem('user', JSON.stringify(res.data));
    
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Profile updated successfully!',
      timer: 2000,
      showConfirmButton: false
    });

    // Clear the preview state after successful upload
    imagePreview.value = null;
    imageFile.value = null;

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Failed to update profile.',
    });
  } finally {
    loading.value = false;
  }
};
</script>