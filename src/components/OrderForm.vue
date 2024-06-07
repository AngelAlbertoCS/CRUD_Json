<template>
  <div>
    <h2>{{ localOrden.id ? 'Editar Orden' : 'Crear Orden' }}</h2>
    <form @submit.prevent="guardarOrden">
      <div>
        <label>Usuario ID:</label>
        <input type="text" v-model="localOrden.usuario_id" required>
      </div>
      <div v-for="(item, index) in localOrden.productos" :key="index">
        <div>
          <label>Producto ID:</label>
          <input type="number" v-model.number="item.producto_id" required>
        </div>
        <div>
          <label>Cantidad:</label>
          <input type="number" v-model.number="item.cantidad" required>
        </div>
      </div>
      <div>
        <label>Total:</label>
        <input type="number" v-model.number="localOrden.total" required>
      </div>
      <div>
        <label>Fecha:</label>
        <input type="datetime-local" v-model="localOrden.fecha" required>
      </div>
      <button type="button" @click="añadirProducto">Agregar Producto</button>
      <button type="submit">{{ localOrden.id ? 'Actualizar' : 'Crear' }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import axios from 'axios';

interface Producto {
  producto_id: number;
  cantidad: number;
}

interface Orden {
  id?: number;
  usuario_id: string;
  productos: Producto[];
  total: number;
  fecha: string;
}

export default defineComponent({
  props: {
    orden: {
      type: Object as () => Orden,
      default: () => ({
        usuario_id: '',
        productos: [],
        total: 0,
        fecha: ''
      })
    }
  },
  emits: ['ordenGuardada'],
  setup(props, { emit }) {
    const localOrden: Ref<Orden> = ref({ ...props.orden });

    const añadirProducto = () => {
      localOrden.value.productos.push({ producto_id: 0, cantidad: 0 });
    };

    const guardarOrden = async () => {
      try {
        if (localOrden.value.id) {
          await axios.put(`/ordenes/${localOrden.value.id}`, localOrden.value);
        } else {
          await axios.post('/ordenes', localOrden.value);
        }
        emit('ordenGuardada');
      } catch (error) {
        console.error(error);
      }
    };

    return {
      localOrden,
      añadirProducto,
      guardarOrden
    };
  }
});
</script>
