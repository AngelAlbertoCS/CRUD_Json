<template>
  <input type="button" @click="mostrarUsuarios" value="Usuarios" />
  <input type="button" @click="mostrarProductos" value="Productos" />
  <input type="button" @click="mostrarOrdenes" value="Ordenes" />
  <div :class="productClass">
    <ProductList />
  </div>
  <div :class="userClass">
    <UserList />
  </div>
  <div :class="orderClass">
    <OrderList />
  </div>
</template>

<script>
import { ref } from 'vue'
import ProductList from './components/ProductList.vue'
import UserList from './components/UserList.vue'
import OrderList from './components/OrderList.vue'

export default {
  components: {
    ProductList,
    UserList,
    OrderList
  },
  setup() {
    const productClass = ref('ocultar')
    const userClass = ref('mostrar')
    const orderClass = ref('ocultar')

    function mostrarUsuarios() {
      productClass.value = 'ocultar'
      orderClass.value = 'ocultar'
      userClass.value = 'mostrar'
    }

    function mostrarOrdenes() {
      productClass.value = 'ocultar'
      userClass.value = 'ocultar'
      orderClass.value = 'mostrar'
    }

    function mostrarProductos() {
      productClass.value = 'mostrar'
      userClass.value = 'ocultar'
      orderClass.value = 'ocultar'
    }

    return {
      productClass,
      userClass,
      orderClass,
      mostrarUsuarios,
      mostrarOrdenes,
      mostrarProductos
    }
  }
}
</script>

<style>
.ocultar {
  display: none;
}
.mostrar {
  display: block;
}
</style>
