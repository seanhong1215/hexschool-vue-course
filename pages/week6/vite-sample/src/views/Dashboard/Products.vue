<template>
  <div>
    後台 產品列表
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td width="120">{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td width="120" class="text-end">
            {{ product.origin_price }}
          </td>
          <td width="120" class="text-end">
            {{ product.price }}
          </td>
          <td>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @emit-pages="getProducts"></pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import { apiAdminProducts } from '@/utils/api.js';

export default {
  name: 'Products',
  props: ['token'],
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getProducts(page = 1) {
      // API
      apiAdminProducts(page)
        .then((response) => {
          this.products = response.data.products;
          this.pagination = response.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
