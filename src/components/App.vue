<template>
<div>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <a class="navbar-brand ps-3" href="index.html">Laundry</a>
        <!-- Sidebar Toggle-->
        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
        <!-- Navbar Search-->
        <!-- <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div class="input-group">
                <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
            </div>
        </form> -->
        <!-- Navbar-->
        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a @click="Logout" class="dropdown-item" href="#!">Logout</a></li>
                </ul>
            </li>
        </ul>
    </nav>

    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <router-link class="nav-link" to="/">
                            <div class="sb-nav-link-icon">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            Home
                        </router-link>
                        <router-link class="nav-link collapsed" to="/member" v-if="role !== 'owner'">
                            <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
                            Member
                        </router-link>
                        <router-link class="nav-link collapsed" to="/paket" v-if="role === 'admin'">
                            <div class="sb-nav-link-icon"><i class="fa fa-bars"></i></div>
                            Paket
                        </router-link>
                         <router-link class="nav-link collapsed" to="/outlet" v-if="role === 'admin'">
                            <div class="sb-nav-link-icon"><i class="fas fa-store"></i></div>
                            outlet
                        </router-link>
                         <router-link class="nav-link collapsed" to="/user" v-if="role === 'admin'">
                            <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
                            user
                        </router-link>
                        <router-link class="nav-link collapsed" to="/transaksi">
                            <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
                            transaksi
                        </router-link>
                        
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">Logged in as:</div>
                    {{ username }}
                </div>
            </nav>
        </div>

        <div id="layoutSidenav_content">

            <!-- MAIN -->
            <router-view></router-view>

            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; Annaryan</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</div>
</template>
<script>
module.exports = {
    data: function(){
        return {
            username: "",
            role: "",
        }
    },
    methods: {
        getInfo: function(){
          let config = {
            headers : {
              "Authorization" : "Bearer " + this.$cookies.get('Authorization')
            }
          }
          axios.get(base_url + '/user/login/check', config)
          .then( response => {
            if(response.data.success == true){
              this.username = response.data.data.username;
              this.role = response.data.data.role;
            }
          })
        },
        Logout: function(){
            this.$cookies.remove("Authorization");
            this.componentName = "login";
            window.location = front_url;
        }
    },
    mounted() {
        this.getInfo();
    },
}
</script>