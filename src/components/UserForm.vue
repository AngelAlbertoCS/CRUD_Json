<template>
    <div>
      <h2>{{ localUsuario.id ? 'Editar Usuario' : 'Crear Usuario' }}</h2>
      <form @submit.prevent="guardarUsuario">
        <div>
          <label>Nombre:</label>
          <input type="text" v-model="localUsuario.nombre" required>
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" v-model="localUsuario.correo" required>
        </div>
        <div>
          <label>Dirección:</label>
          <input type="text" v-model="localUsuario.direccion" required>
        </div>
        <button type="submit">{{ localUsuario.id ? 'Actualizar' : 'Crear' }}</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, ref, watch } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    props: {
      usuario: {
        type: Object as PropType<{ id?: number; nombre: string; correo: string; direccion: string }>,
        default: () => ({
          nombre: '',
          correo: '',
          direccion: ''
        })
      }
    },
    emits: ['usuarioGuardado'],
    setup(props, { emit }) {
      const localUsuario = ref({ ...props.usuario });
  
      watch(() => props.usuario, (nuevoUsuario) => {
        localUsuario.value = { ...nuevoUsuario };
      });
  
      const guardarUsuario = async () => {
        try {
          if (localUsuario.value.id) {
            await axios.put(`/usuarios/${localUsuario.value.id}`, localUsuario.value);
          } else {
            await axios.post('/usuarios', localUsuario.value);
          }
          emit('usuarioGuardado');
        } catch (error) {
          console.error(error);
        }
      };
  
      return {
        localUsuario,
        guardarUsuario
      };
    }
  });
  </script>
  