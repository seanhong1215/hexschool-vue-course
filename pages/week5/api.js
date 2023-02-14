const baseRequest = axios.create({
    baseURL: "https://vue3-course-api.hexschool.io/v2/api/seanhong"
});

// 全部產品列表
export const apiGetProducts = () => baseRequest.get('/products');
// 單一產品內容
export const apiGetProduct = (id) => baseRequest.get(`/product/${id}`);
// 加入購物車
export const apiAddToCart = (data) => baseRequest.post('/cart', data);
// 更新購物車
export const apiUpdateCart = (id, data) => baseRequest.put(`/cart/${id}`, data);
// 清空購物車
export const apiDeleteAllCarts = () => baseRequest.delete('/carts');
// 購物車清單
export const apiGetCart = () => baseRequest.get('/cart');
// 刪除單一產品
export const apiRemoveCartItem = (id) => baseRequest.delete(`/cart/${id}`);
// 建立訂單
export const apiCreateOrder = (data) => baseRequest.post('/order',data);
