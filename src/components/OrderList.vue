<template>

  <div class="orden-list-container">
    <h1>Lista de Órdenes</h1>
    <div class="buttons">
      <button @click="recuperarOrdenes">Cargar Órdenes</button>
      <button @click="mostrarForm">Crear Orden</button>
    </div>
    <ul class="orden-list">
      <li v-for="orden in ordenes" :key="orden.id" class="orden-item">
        <div>Orden ID: {{ orden.id }}</div>
        <div>Usuario ID: {{ orden.usuario_id }}</div>
        <div>
          Productos:
          <ul>
            <li v-for="(product, index) in orden.productos" :key="index">
              Producto ID: {{ product.producto_id }} - Cantidad: {{ product.cantidad }}
            </li>
          </ul>
        </div>
        <div>Total: ${{ orden.total }}</div>
        <div>Fecha: {{ orden.fecha }}</div>
        <button @click="editarOrden(orden)">Editar</button>
        <button @click="deleteOrden(orden.id)">Eliminar</button>
      </li>
    </ul>
    <OrderForm v-if="mostrarCrear" @ordenGuardada="recuperarYocultar" />
    <OrderForm v-if="ordenSelect" :orden="ordenSelect" @ordenGuardada="recuperarOrdenes" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import OrderForm from './OrderForm.vue';

export default defineComponent({
  components: {
    OrderForm
  },
  setup() {
    const ordenes = ref([]);
    const ordenSelect = ref(null);
    const mostrarCrear = ref(false);

    const recuperarOrdenes = async () => {
      try {
        const response = await axios.get('/ordenes');
        ordenes.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const recuperarYocultar = async () => {
      await recuperarOrdenes();
      mostrarCrear.value = false;
    };

    const editarOrden = (orden: any) => {
      ordenSelect.value = { ...orden };
      mostrarCrear.value = false;
    };

    const deleteOrden = async (ordenId: string) => {
      try {
        await axios.delete(`/ordenes/${ordenId}`);
        recuperarOrdenes();
      } catch (error) {
        console.error(error);
      }
    };

    const mostrarForm = () => {
      ordenSelect.value = null; 
      mostrarCrear.value = true;
    };

    return {
      ordenes,
      ordenSelect,
      mostrarCrear,
      recuperarOrdenes,
      recuperarYocultar,
      editarOrden,
      deleteOrden,
      mostrarForm
    };
  }
});
</script>

<style scoped>
  .orden-list-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .orden-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .orden-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
  }
  
  .orden-actions {
    display: flex;
    gap: 10px;
  }
  
  .form-container {
    margin-top: 20px;
  }
  </style>
  