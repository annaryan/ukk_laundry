<template>
    <div>
         <div id="layoutAuthentication">
            <div id="layoutAuthentication_content" class="bg-dark" >
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login MY Laundry</h3></div>
                                    <div class="card-body">
                                        {{ message }}
                                        <form v-on:submit.prevent="Login">
                                            <div class="form-floating mb-3">
                                                <input v-model="username" class="form-control" id="username" type="text" placeholder="Username" />
                                                <label for="username">Username</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input v-model="password" class="form-control" id="password" type="password" placeholder="Password" />
                                                <label for="password">Password</label>
                                            </div>
                                            <!-- <div class="form-check mb-3">
                                                <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                <label class="form-check-label" for="inputRememberPassword">Remember Password</label>
                                            </div> -->
                                            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <!-- <a class="small" href="password.html">Forgot Password?</a> -->
                                                <input type="submit" class="btn btn-primary" value="Login">
                                                <!-- <a class="btn btn-primary" href="index.html">Login</a> -->
                                            </div>
                                        </form>
                                    </div>
                                    <!-- <div class="card-footer text-center py-3">
                                        <div class="small"><a href="register.html">Need an account? Sign up!</a></div>
                                    </div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4 d-flex align-items-center">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; me</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
module.exports =  {
    data: function(){
        return {
            username: "",
            password: "",
            message: "",
        }
    },
    methods: {
        Login: function(){
            this.message = "Mohon tunggu..."; //alert notif
            //mapping data
            let form = {
                "username": this.username,
                "password": this.password
            }
            axios.post(base_url + '/user/login', form)
            .then(response => {
                if(response.data.success == true){
                    this.message = response.data.message; //alert
                    
                    //cek apakah token sudah ada di cookies???
                    if(this.$cookies.isKey('Authorization')){
                        this.$cookies.remove('Authorization');
                    }
                    //menyimpan token ke cookies
                    this.$cookies.set('Authorization', response.data.data.token);
                    location.reload();
                } else {
                    this.message = response.data.message;
                }
            })
        },
    }
}
</script>

