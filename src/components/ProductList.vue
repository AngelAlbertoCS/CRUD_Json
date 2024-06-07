<template>

    <div class="product-list-container">
      <h1>Lista de Productos</h1>
      <div class="buttons">
        <button @click="recuperarProductos">Cargar Productos</button>
        <button @click="productoForm">Crear Producto</button>
      </div>
      <ul class="product-list">
        <li v-for="producto in productos" :key="producto.id" class="product-item">
          {{ producto.id }} -{{ producto.nombre }} - {{ producto.descripcion }} - ${{ producto.precio }}
          <div class="product-actions">
          <button @click="editarProducto(producto)">Editar</button>
          <button @click="borrarProducto(producto.id)">Eliminar</button>
        </div>
        </li>
      </ul>
      <div class="form-container" v-if="crearProducto || productoSelect">
        <ProductForm v-if="crearProducto" :producto="nuevoProducto" @productoGuardado="recuperarYocultar" />
      <ProductForm v-if="productoSelect" :producto="productoSelect" @productoGuardado="recuperarProductos" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import ProductForm from './ProductForm.vue';
  
  export default defineComponent({
    components: {
      ProductForm
    },
    setup() {
      const productos = ref([]);
      const productoSelect = ref(null);
      const crearProducto = ref(false);
      const nuevoProducto = ref({ nombre: '', descripcion: '', precio: 0 });
  
      const recuperarProductos = async () => {
        try {
          const response = await axios.get('/productos');
          productos.value = response.data;
        } catch (error) {
          console.error(error);
        }
      };
  
      const recuperarYocultar = async () => {
        await recuperarProductos();
        crearProducto.value = false;
      };
  
      const editarProducto = (producto: any) => {
        productoSelect.value = { ...producto };
        crearProducto.value = false;
      };
  
      const borrarProducto = async (productId: number) => {
        try {
          await axios.delete(`/productos/${productId}`);
          recuperarProductos();
        } catch (error) {
          console.error(error);
        }
      };
  
      const productoForm = () => {
        productoSelect.value = null; // Clear selected product
        crearProducto.value = true;
      };
  
      return {
        productos,
        productoSelect,
        crearProducto,
        nuevoProducto,
        recuperarProductos,
        recuperarYocultar,
        editarProducto,
        borrarProducto,
        productoForm
      };
    }
  });
  </script>
  
  <style scoped>
  .product-list-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .product-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .product-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
  }
  
  .product-actions {
    display: flex;
    gap: 10px;
  }
  
  .form-container {
    margin-top: 20px;
  }
  </style>
  