<template>
  <div>
    <h1>單一產品頁面</h1>
    {{ product.title }}
  </div>
</template>

<script>
import { apiGetProduct } from '@/utils/api.js';

export default {
  name: 'Product',
  data() {
    return {
      product: {},
    };
  },
  mounted() {
    const { id } = this.$route.params;
    apiGetProduct()
      .then(() => {
        this.product = res.data.product;
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  },
};
</script>
