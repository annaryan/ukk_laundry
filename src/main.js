var base_url = "http://localhost:8000/api";
//konfigurasi router
var router =[
    {
        path: "/",
        name: "Beranda",
        component: httpVueLoader("./src/components/Beranda.vue") 
    },
    { 
        path: "/outlet", 
        name: "Outlet", 
        component: httpVueLoader("./src/components/Outlet.vue")
    },
    { 
        path: "/member", 
        name: "Member", 
        component: httpVueLoader("./src/components/Member.vue")
    },
    { 
      path: "/paket", 
      name: "Paket", 
      component: httpVueLoader("./src/components/Paket.vue")
    },
    { 
      path: "/user", 
      name: "User", 
      component: httpVueLoader("./src/components/User.vue")
    },
    { 
      path: "/transaksi", 
      name: "Transaksi", 
      component: httpVueLoader("./src/components/Transaksi.vue")
    },
    { 
      path: "/input-transaksi", 
      name: "Input Transaksi", 
      component: httpVueLoader("./src/components/Input_transaksi.vue")
    },

];
var routers = new VueRouter({ routes : router, base: "/"});

//INSTANCE VUE

var  app =  new Vue ({
    el: "#app",
    components: {
        'login': httpVueLoader("./src/components/Login.vue"),
        'app' : httpVueLoader("./src/components/App.vue"),
    },
    data: {
        user : {
          id_user: "",
          id_outlet: "",
          role: "",
          name: "",
          username: "",
        },
        componentName: ""
      },
      router: routers,
      methods: {
        CekToken : function(){
            //cek cookies, apakah sudah punya token?
            if(this.$cookies.isKey('Authorization')){

                //validasi token dulu
          let config = {
            headers : {
              "Authorization" : "Bearer " + this.$cookies.get('Authorization')
            }
          }

          axios.get(base_url + '/user/login/check', config)
          .then( response => {
            //console.log(response);
            if(response.data.success == true){
              //load component apps
              this.componentName = "app";
              
              this.id_user = response.data.data.id;
              this.id_outlet = response.data.data.id_outlet;
              this.role = response.data.data.role;
              this.name = response.data.data.nama;
              this.username = response.data.data.username;

            } else {
              this.componentName = "login";
            }
          })

        } else { //kalau tidak punya, langsung ke login
          this.componentName = "login";
        }

      },
    },
    mounted(){
      this.CekToken();
    }
  });