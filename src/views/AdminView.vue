<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Admin Dashboard - Add Product</h1>
    
    <div class="bg-white rounded-xl shadow-sm border p-6">
      <form @submit.prevent="addProduct" class="space-y-5">
        
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
          <input v-model="product.name" type="text" required class="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea v-model="product.description" required rows="3" class="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Price (LKR)</label>
            <input v-model="product.price" type="number" step="0.01" required class="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Stock Quantity</label>
            <input v-model="product.stockQuantity" type="number" required class="w-full rounded-lg border p-2.5 outline-none focus:border-indigo-500" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Product Image</label>
          <input @change="handleImageChange" type="file" accept="image/*" class="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 border rounded-lg p-2" />
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 mt-4">
          {{ loading ? 'Adding Product...' : 'Add Product' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '../api/axios';

const product = ref({
  name: '',
  description: '',
  price: '',
  stockQuantity: ''
});
const imageFile = ref(null);
const loading = ref(false);

const handleImageChange = (e) => {
  imageFile.value = e.target.files[0];
};

const addProduct = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('name', product.value.name);
    formData.append('description', product.value.description);
    formData.append('price', product.value.price);
    formData.append('stockQuantity', product.value.stockQuantity);
    
    if (imageFile.value) {
      formData.append('image', imageFile.value);
    }

    await apiClient.post('/api/v1/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    alert('Product added successfully!');
    // ෆෝම් එක හිස් කිරීම
    product.value = { name: '', description: '', price: '', stockQuantity: '' };
    imageFile.value = null;
  } catch (error) {
    alert('Failed to add product. Ensure backend is running.');
  } finally {
    loading.value = false;
  }
};
</script>