let productModal = {};
let delProductModal = {};

const app = {
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl: []
            },
            isNew: false
        }
    },
    methods: {
        getProducts() {
            axios.get(`${url}api/${path}/admin/products`)
                .then(res => {
                    this.products = res.data.products;
                })
                .catch(err => alert('資料取得失敗'))
        },
        openModal(status, product) {
            if (status === 'create') {
                productModal.show();
                // 新增資料
                this.isNew = true;
                // 帶入初始化資料
                this.tempProduct = {
                    imagesUrl: []
                };
            } else if (status === 'edit') {
                productModal.show();
                // 編輯資料
                this.isNew = false;
                // 帶入已新增產品資料
                this.tempProduct = { ...product };
            } else if (status === 'delete') {
                delProductModal.show();
                this.tempProduct = { ...product };
            }
        },
        updateProduct() {
            let apiUrl = `${url}api/${path}/admin/product`;
            let method = 'post';
            if (!this.isNew) {
                apiUrl = `${url}api/${path}/admin/product/${this.tempProduct.id}`;
                method = 'put';
            }
            axios[method](apiUrl, { data: this.tempProduct })
                .then(() => {
                    this.getProducts();
                    productModal.hide();
                })
                .catch(err => alert('資料未填寫完整，無法建立資料'));
        },
        deleteProduct() {
            axios.delete(`${url}api/${path}/admin/product/${this.tempProduct.id}`)
                .then(res => {
                    this.getProducts();
                    delProductModal.hide();
                })
                .catch(err => {
                    alert('無法刪除資料')
                })
        }
    },
    mounted() {
        // 取出 token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.getProducts();
        // Bootstrap 方法
        // modal 初始化
        productModal = new bootstrap.Modal('#productModal');
        delProductModal = new bootstrap.Modal('#delProductModal')
    },
}

Vue.createApp(app).mount('#app');