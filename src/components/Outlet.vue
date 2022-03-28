<template>
    <div>
        <main>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Data Outlet</h1>
                <div class="card mb-4">
                    <div class="card-body">
                        <a class="btn btn-success" v-b-modal.modal_outlet @click="Add()">Tambah Outlet</a>
                        <table class="table">
                            <tr>
                                <td>#</td>
                                <td>NAMA OUTLET</td>
                                <td>AKSI</td>  
                            </tr>
                            <tr v-for="(out, index) in outlet" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ out.nama_outlet }}</td>
                                <td>
                                    <a v-b-modal.modal_outlet href="#" class="btn btn-success text-white " @click="Edit(out)">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-edit"></i>
                                        </span>
                                        Ubah
                                    </a>
                                    <a href="#" class="btn btn-danger" @click="Delete(out.id_outlet)"><span class="icon text-white-50">
                                           <i class="fas fa-trash"></i>
                                        </span></a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </main>
        <div>
        <b-modal 
            id="modal_outlet" 
            ref="modal" 
            title="Form outle" 
            size="md" 
            @ok="Save">
            <form>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="nama_outlet" placeholder="masukkan nama outlet" v-modal="nama_outlet" id="inputnama_outlet" class="form-control" type="text"/>
                    <label for="inputnama_outlet">nama outlet</label>
                </div>
            </form>
        </b-modal>
        </div>
    </div>
</template>
<script>
module.exports =  {
    data: function(){
        return {
            id_outlet: "",
            nama_outlet: "",
            outlet: [] ,
            action:""
        }
    },
    methods: {
        getData: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

          axios.get(base_url + '/outlet', config)
          .then( response => {
              console.log(response);
            if(response.data.success == true){
                this.outlet = response.data.data.outlet;
            }
          })

        },
        Add: function(){
            this.action = "insert";
            this.id_outlet = "";
            this.nama_outlet = "";
        },
        Edit: function(item){
            this.action = "update";
            this.id_outlet = item.id_outlet;
            this.nama_outlet = item.nama_outlet;
        },
        Save: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

            let form = {
                "nama_outlet": this.nama_outlet,
            }

            //logika method post/get (insert /update)
            if(this.action == "insert"){
                axios.post(base_url + '/outlet', form, config)
                .then( response => {
                    alert(response.data.message);
                })
            } else { //update
                axios.put(base_url + '/outlet/' + this.id_outlet, form, config)
                .then( response => {
                    alert(response.data.message);
                })
            }
            
            this.getData();
            
        },
        Delete: function(id){
           if(confirm("Apakah anda yakin menghapus data outlet ini?")){

                let config = {
                    headers : {
                    "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                    }
                }

                axios.delete(base_url + '/outlet/' + id, config)
                .then( response => {
                    alert(response.data.message);
                })

                this.getData();
           }

            // Swal.fire({
            //     title: 'Error!',
            //     text: 'Do you want to continue',
            //     icon: 'error',
            //     confirmButtonText: 'Cool'
            // })
        }

    },
    mounted() {
        this.getData();
    },
}
</script>