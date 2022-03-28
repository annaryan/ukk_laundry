<template>
    <div>
        <main>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Data Member</h1>
                <div class="card mb-4">
                    <div class="card-body">
                        <a class="btn btn-success" v-b-modal.modal_member @click="Add()">Tambah Member</a>
                        <table class="table">
                            <thead>
                                <tr>
                                <td>#</td>
                                <td>NAMA</td>
                                <td>JENIS KELAMIN</td>
                                <td>TELEPON</td>
                                <td>ALAMAT</td>
                                <td>AKSI</td>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                <td>#</td>
                                <td>Nama</td>
                                <td>JENIS KELAMIN</td>
                                <td>TELEPON</td>
                                <td>ALAMAT</td>
                                <td>AKSI</td>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr v-for="(mem, index) in member" :key="index">
                                    <td>{{ index + 1  }}</td>
                                    <td>{{ mem.nama }}</td>
                                    <!-- <td>{{ mem.jenis_kelamin }}</td> -->
                                    <!-- <td>{{ mem.jenis_kelamin }}</td> -->
                                <td>
                                    <span
                                    v-if="mem.jenis_kelamin === 'l'"
                                    >Laki-Laki</span>
                                    <span
                                    v-if="mem.jenis_kelamin === 'p'"
                                    >Perempuan</span>
                                    <td>{{ mem.telp }}</td>
                                    <td>{{ mem.alamat }}</td>
                                    <td>
                                        <a v-b-modal.modal_member href="#" class="btn btn-info" @click="Edit(mem)">Ubah</a>
                                        <a href="#" class="btn btn-danger" @click="Delete(mem.id_member)">Hapus</a>
                                    </td>
                                </tr>
                            </tbody>    
                        </table>
                    </div>
                </div>
            </div>
        </main>
        <div>
        <b-modal 
            id="modal_member" 
            ref="modal" 
            title="Form Member" 
            size="md" 
            @ok="Save">
            <form>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="nama" placeholder="Enter your first name" v-modal="nama" id="inputNama" class="form-control" type="text"/>
                    <label for="inputNama">Nama</label>
                </div>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="telp" placeholder="Enter your first name" v-modal="telp" id="inputTlp" class="form-control" type="text"/>
                    <label for="inputTlp">Telepon</label>
                </div>
                <div class="form-floating mb-3 mb-md-0">
                    <select v-model="jenis_kelamin" class="form-control">
                        <option value="l">Laki-Laki</option>
                        <option value="p">Perempuan</option>
                    </select>

                    <label for="inputjenis_kelamin">Jenis Kelamin</label>
                </div>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="alamat" placeholder="Enter your first name" v-modal="alamat" id="inputAlamat" class="form-control" type="text"/>
                    <label for="inputAlamat">Alamat</label>
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
            id_member: "",
            nama: "",
            jenis_kelamin:"",
            telp:"",
            alamat:"",
            member: [],
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

          axios.get(base_url + '/member', config)
          .then( response => {
              console.log(response);
            if(response.data.success == true){
                this.member = response.data.data.member;
            }
          })

        },
        Add: function(){
            this.action = "insert";
            this.id_member = "";
            this.nama = "";
            this.jenis_kelamin = "";
            this.telp = "";
            this.alamat = "";
        },
        Edit: function(item){
            this.action = "update";
            this.id_member = item.id_member;
            this.nama = item.nama;
            this.jenis_kelamin = item.jenis_kelamin;
            this.telp = item.telp;
            this.alamat = item.alamat;
        },
        Save: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

            let form = {
                "nama": this.nama,
                "alamat": this.alamat,
                "jenis_kelamin": this.jenis_kelamin,
                "telp": this.telp,
            }

            //logika method post/get (insert /update)
            if(this.action == "insert"){
                axios.post(base_url + '/member', form, config)
                .then( response => {
                    alert(response.data.message);
                })
            } else { //update
                axios.put(base_url + '/member/' + this.id_member, form, config)
                .then( response => {
                    alert(response.data.message);
                })
            }
            
            this.getData();
            
        },
        Delete: function(id){
           if(confirm("Apakah anda yakin menghapus data member ini?")){

                let config = {
                    headers : {
                    "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                    }
                }

                axios.delete(base_url + '/member/' + id, config)
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