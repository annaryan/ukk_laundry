<template>
    <div>
        <main>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Data Paket</h1>
                <div class="card mb-4">
                    <div class="card-body">
                        <a class="btn btn-success" v-b-modal.modal_paket @click="Add()">Tambah Paket</a>
                        <table class="table">
                            <tr>
                                <td>#</td>
                                <td>JENIS PAKET</td>
                                <td>HARGA</td>
                                <td>AKSI</td>
                                
                            </tr>
                            <tr v-for="(pak, index) in paket" :key="index">
                                <td>{{ index + 1 }}</td>
                                <!-- <td>{{ pak.jenis_paket }}</td> -->
                                <td>
                                    <span
                                    v-if="pak.jenis_paket === 'kiloan'"
                                    >Kiloan</span>
                                    <span
                                    v-if="pak.jenis_paket === 'bed_cover'"
                                    >Bed Cover</span>
                                    <span
                                    v-if="pak.jenis_paket === 'kaos'"
                                    >Kaos</span>
                                <td>{{ pak.harga }}</td>
                                <td>
                                    <a v-b-modal.modal_paket href="#" class="btn btn-info" @click="Edit(pak)">Ubah</a>
                                    <a href="#" class="btn btn-danger" @click="Delete(pak.id_paket)">Hapus</a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </main>
        <div>
        <b-modal 
            id="modal_paket" 
            ref="modal" 
            title="Form paket" 
            size="md" 
            @ok="Save">
            <form>
                <div class="form-floating mb-3 mb-md-0">
                    <select v-model="jenis_paket" class="form-control">
                        <option value="kiloan">kiloan</option>
                        <option value="bed_cover">bed cover</option>
                        <option value="kaos">kaos</option>
                    </select>

                    <label for="inputjenis_paket">Jenis Paket</label>
                </div>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="harga" placeholder="masukkan harga" v-modal="harga" id="inputharga" class="form-control" type="text">
                    <label for="inputharga">harga per 1 kg</label>
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
            id_paket: "",
            jenis_paket: "",
            harga:"",
            paket: [] ,
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

          axios.get(base_url + '/paket', config)
          .then( response => {
              console.log(response);
            if(response.data.success == true){
                this.paket = response.data.data.paket;
            }
          })

        },
        Add: function(){
            this.action = "insert";
            this.id_paket = "";
            this.jenis_paket = "";
            this.harga = "";
        },
        Edit: function(item){
            this.action = "update";
            this.id_paket = item.id_paket;
            this.jenis_paket = item.jenis_paket;
            this.harga = item.harga;
        },
        Save: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

            let form = {
                "jenis_paket": this.jenis_paket,
                "harga": this.harga,
            }

            //logika method post/get (insert /update)
            if(this.action == "insert"){
                axios.post(base_url + '/paket', form, config)
                .then( response => {
                    alert(response.data.message);
                })
            } else { //update
                axios.put(base_url + '/paket/' + this.id_paket, form, config)
                .then( response => {
                    alert(response.data.message);
                })
            }
            
            this.getData();
            
        },
        Delete: function(id){
           if(confirm("Apakah anda yakin menghapus data paket ini?")){

                let config = {
                    headers : {
                    "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                    }
                }

                axios.delete(base_url + '/paket/' + id, config)
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