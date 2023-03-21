const app = {
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            axios.post(`${url}admin/signin`, this.user)
                .then(res => {
                    const { token, expired } = res.data;
                    document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
                    alert('登入成功');
                    setTimeout(() => {
                        window.location = './products.html'
                    }, 0);
                    
                })
                .catch(err => {
                    alert('帳號或密碼錯誤');
                })
        }
    },
}

Vue.createApp(app).mount('#app');