import userProductModal from './userProductModal.js';
import { apiGetProducts, apiGetProduct, apiAddToCart, apiUpdateCart, apiDeleteAllCarts, apiGetCart, apiRemoveCartItem, apiCreateOrder } from './api.js';

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});


Vue.createApp({
  data() {
    return {
      loadingStatus: {
        loadingItem: '',
      },
      products: [],
      product: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {},
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    getProducts() {
      apiGetProducts().then((response) => {
        this.products = response.data.products;
        console.log(this.products);
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    getProduct(id) {
      this.loadingStatus.loadingItem = id;
      apiGetProduct(id).then((response) => {
        this.loadingStatus.loadingItem = '';
        this.product = response.data.product;
        this.$refs.userProductModal.openModal();
      }).catch((err) => {
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
      apiAddToCart({data:cart}).then((response) => {
        alert(response.data.message);
        this.loadingStatus.loadingItem = '';
        this.getCart();
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    updateCart(data) {
      this.loadingStatus.loadingItem = data.id;
      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };
      apiUpdateCart(data.id, {data:cart}).then((response) => {
        alert(response.data.message);
        this.loadingStatus.loadingItem = '';
        this.getCart();
      }).catch((err) => {
        alert(err.response.data.message);
        this.loadingStatus.loadingItem = '';
      });
    },
    deleteAllCarts() {
      apiDeleteAllCarts().then((response) => {
        alert(response.data.message);
        this.getCart();
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    getCart() {
      apiGetCart().then((response) => {
        this.cart = response.data.data;
        console.log(this.cart);
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    removeCartItem(id) {
      this.loadingStatus.loadingItem = id;
      apiRemoveCartItem(id).then((response) => {
        alert(response.data.message);
        this.loadingStatus.loadingItem = '';
        this.getCart();
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    createOrder() {
      const order = this.form;
      apiCreateOrder({ data: order }).then((response) => {
        alert(response.data.message);
        this.$refs.form.resetForm();
        this.getCart();
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },

  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
})
  .component('userProductModal', userProductModal)
  .mount('#app');