<template>
    <div class="usuario-list-container">
      <h1>Lista de Usuarios</h1>
      <div class="buttons">
        <button @click="recibirUsuarios">Cargar Usuarios</button>
        <button @click="usuarioForm">Crear Usuario</button>
      </div>
      <ul class="usuario-list">
        <li v-for="usuario in usuarios" :key="usuario.id" class="usuario-item">
          <span>{{ usuario.id }} -{{ usuario.nombre }} - {{ usuario.correo }}</span>
          <div class="usuario-actions">
            <button @click="editarUsuario(usuario)">Editar</button>
            <button @click="borrarUsuario(usuario.id)">Eliminar</button>
          </div>
        </li>
      </ul>
      <div class="form-container" v-if="crearUsuario || UsuarioSelect">
        <UserForm v-if="crearUsuario" :usuario="nuevoUsuario" @usuarioGuardado="recibirYocultar" />
        <UserForm v-if="UsuarioSelect" :usuario="UsuarioSelect" @usuarioGuardado="recibirUsuarios" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import UserForm from './UserForm.vue';
  
  export default defineComponent({
    components: {
      UserForm
    },
    setup() {
      const usuarios = ref([]);
      const UsuarioSelect = ref(null);
      const crearUsuario = ref(false);
      const nuevoUsuario = ref({ nombre: '', correo: '', direccion: '' });
  
      const recibirUsuarios = async () => {
        try {
          const response = await axios.get('/usuarios');
          usuarios.value = response.data;
        } catch (error) {
          console.error(error);
        }
      };
  
      const recibirYocultar = async () => {
        await recibirUsuarios();
        crearUsuario.value = false;
      };
  
      const editarUsuario = (usuario: any) => {
        UsuarioSelect.value = { ...usuario };
        crearUsuario.value = false;
      };
  
      const borrarUsuario = async (usuarioId: number) => {
        try {
          await axios.delete(`/usuarios/${usuarioId}`);
          recibirUsuarios();
        } catch (error) {
          console.error(error);
        }
      };
  
      const usuarioForm = () => {
        UsuarioSelect.value = null;
        crearUsuario.value = true;
      };
  
      return {
        usuarios,
        UsuarioSelect,
        crearUsuario,
        nuevoUsuario,
        recibirUsuarios,
        recibirYocultar,
        editarUsuario,
        borrarUsuario,
        usuarioForm
      };
    }
  });
  </script>
  
  <style scoped>
  .usuario-list-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .usuario-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .usuario-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
  }
  
  .usuario-actions {
    display: flex;
    gap: 10px;
  }
  
  .form-container {
    margin-top: 20px;
  }
  </style>
  