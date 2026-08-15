<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Admin Dashboard - Manage Products</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Add New Product Form (වම් පස) -->
      <div class="lg:col-span-1 bg-white rounded-xl shadow-sm border p-6 h-fit">
        <h2 class="text-lg font-bold text-slate-700 mb-4">Add New Product</h2>
        <form @submit.prevent="addProduct" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
            <input v-model="product.name" type="text" required class="w-full rounded-lg border p-2 outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea v-model="product.description" required rows="2" class="w-full rounded-lg border p-2 outline-none focus:border-indigo-500"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Price</label>
              <input v-model="product.price" type="number" step="0.01" required class="w-full rounded-lg border p-2 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Stock</label>
              <input v-model="product.stockQuantity" type="number" required class="w-full rounded-lg border p-2 outline-none" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Image</label>
            <input @change="handleImageChange" type="file" accept="image/*" class="w-full text-xs border rounded p-1" />
          </div>
          <button type="submit" :disabled="loading" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg transition mt-2">
            {{ loading ? 'Adding...' : 'Add Product' }}
          </button>
        </form>
      </div>

      <!-- Existing Products List (දකුණු පස) -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
        <h2 class="text-lg font-bold text-slate-700 mb-4">Existing Products</h2>
        
        <div v-if="loadingProducts" class="text-center py-8 text-slate-500">Loading products...</div>
        <div v-else-if="productsList.length === 0" class="text-center py-8 text-slate-500">No products available.</div>
        
        <div v-else class="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          <div v-for="p in productsList" :key="p.id" class="flex items-center justify-between border-b pb-3">
            <div class="flex items-center space-x-4">
              <div class="h-12 w-12 bg-slate-100 rounded flex items-center justify-center overflow-hidden border">
                <img v-if="p.imageUrl" :src="p.imageUrl" class="h-full w-full object-cover" />
                <span v-else class="text-xs text-slate-400">No Img</span>
              </div>
              <div>
                <h3 class="font-semibold text-slate-800">{{ p.name }}</h3>
                <p class="text-xs text-slate-500">LKR {{ p.price }} | Stock: {{ p.stockQuantity }}</p>
              </div>
            </div>
            <button @click="deleteProduct(p.id)" class="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-semibold border border-transparent hover:border-red-200 transition">
              Remove
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../api/axios';

// Add Product State
const product = ref({ name: '', description: '', price: '', stockQuantity: '' });
const imageFile = ref(null);
const loading = ref(false);

// List Products State
const productsList = ref([]);
const loadingProducts = ref(true);

const handleImageChange = (e) => { imageFile.value = e.target.files[0]; };

// දත්ත සමුදායෙන් Products ලබා ගැනීම
const fetchProducts = async () => {
  loadingProducts.value = true;
  try {
    const res = await apiClient.get('/api/v1/products');
    productsList.value = res.data;
  } catch (error) {
    console.error("Failed to fetch products");
  } finally {
    loadingProducts.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

// අලුත් Product එකක් එකතු කිරීම
const addProduct = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('name', product.value.name);
    formData.append('description', product.value.description);
    formData.append('price', product.value.price);
    formData.append('stockQuantity', product.value.stockQuantity);
    if (imageFile.value) formData.append('image', imageFile.value);

    await apiClient.post('/api/v1/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    alert('Product added successfully!');
    product.value = { name: '', description: '', price: '', stockQuantity: '' };
    imageFile.value = null;
    
    // ලැයිස්තුව යාවත්කාලීන කිරීම
    fetchProducts();
  } catch (error) {
    alert('Failed to add product.');
  } finally {
    loading.value = false;
  }
};

// Product එකක් මකා දැමීම
const deleteProduct = async (id) => {
  if (!confirm('Are you sure you want to remove this product?')) return;
  
  try {
    await apiClient.delete(`/api/v1/products/${id}`);
    // ලැයිස්තුවෙන් අදාළ අයිතමය ඉවත් කිරීම
    productsList.value = productsList.value.filter(p => p.id !== id);
  } catch (error) {
    alert('Failed to delete product.');
  }
};
</script>