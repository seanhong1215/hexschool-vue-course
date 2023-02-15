<template>
  <h1>產品列表頁面</h1>
  <Loading :active="isLoading"></Loading>
  <UserProductModal
    ref="userProductModal"
    :product="product"
    @add-to-cart="addToCart"
  ></UserProductModal>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td style="width: 200px">
          <div
            style="
              height: 100px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
        </td>
        <td>
          {{ item.title }}
        </td>
        <td>
          <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
          <del class="h6" v-if="item.price"
            >原價 {{ item.origin_price }} 元</del
          >
          <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="getProduct(item.id)"
              :disabled="
                loadingStatus.loadingItem === item.id || !item.is_enabled
              "
            >
              <i
                class="fas fa-spinner fa-pulse"
                v-if="loadingStatus.loadingItem === item.id"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="addToCart(item.id)"
              :disabled="
                loadingStatus.loadingItem === item.id || !item.is_enabled
              "
            >
              <i
                class="fas fa-spinner fa-pulse"
                v-if="loadingStatus.loadingItem === item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import UserProductModal from '@/components/UserProductModal.vue';
import { apiGetProducts, apiGetProduct, apiAddToCart } from '@/utils/api.js';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      loadingStatus: {
        loadingItem: '',
      },
      isLoading: false,
      product: {},
    };
  },
  components: {
    UserProductModal,
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      apiGetProducts()
        .then((response) => {
          this.products = response.data.products;
          console.log(this.products);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    getProduct(id) {
      this.loadingStatus.loadingItem = id;
      apiGetProduct(id)
        .then((response) => {
          this.loadingStatus.loadingItem = '';
          this.product = response.data.product;
          this.$refs.userProductModal.openModal();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    addToCart(id, qty = 1) {
      this.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };

      this.$refs.userProductModal.hideModal();
      apiAddToCart({ data: cart })
        .then((response) => {
          alert(response.data.message);
          this.loadingStatus.loadingItem = '';
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
