<template>
  <div>
    <h1>單一產品頁面</h1>
    {{ product.title }}
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import { apiGetProduct } from '@/utils/api.js';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
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
