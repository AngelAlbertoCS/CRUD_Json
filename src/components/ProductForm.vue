<template>
    <div>
      <h2>{{ localProducto.id ? 'Editar Producto' : 'Crear Producto' }}</h2>
      <form @submit.prevent="guardarProducto">
        <div>
          <label>Nombre:</label>
          <input type="text" v-model="localProducto.nombre" required>
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" v-model="localProducto.descripcion" required>
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" v-model.number="localProducto.precio" required>
        </div>
        <button type="submit">{{ localProducto.id ? 'Actualizar' : 'Crear' }}</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, ref, watch } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    props: {
      producto: {
        type: Object as PropType<{ id?: number; nombre: string; descripcion: string; precio: number }>,
        default: () => ({
          nombre: '',
          descripcion: '',
          precio: 0
        })
      }
    },
    emits: ['productoGuardado'],
    setup(props, { emit }) {
      const localProducto = ref({ ...props.producto });
  
      watch(() => props.producto, (nuevoProducto) => {
        localProducto.value = { ...nuevoProducto };
      });
  
      const guardarProducto = async () => {
        try {
          if (localProducto.value.id) {
            await axios.put(`/productos/${localProducto.value.id}`, localProducto.value);
          } else {
            await axios.post('/productos', localProducto.value);
          }
          emit('productoGuardado');
        } catch (error) {
          console.error(error);
        }
      };
  
      return {
        localProducto,
        guardarProducto
      };
    }
  });
  </script>
  