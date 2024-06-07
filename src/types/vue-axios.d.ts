// src/types/vue-axios.d.ts
declare module 'vue-axios' {
    import { Plugin } from 'vue';
    import { AxiosInstance } from 'axios';
    const VueAxios: Plugin;
    export default VueAxios;
    export interface VueAxios {
      axios: AxiosInstance;
      $http: AxiosInstance;
    }
  }
  