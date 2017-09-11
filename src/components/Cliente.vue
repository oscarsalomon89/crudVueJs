<template>
    <tr>
        <th scope="row">{{user.id}}</th>
        <td>{{user.name}}</td>
        <td>{{ user.email }}</td>
        <td>
        <span class="label label-default">{{ $store.state.count }}</span>
        </td>
        <td>
        <button @click="deleteUser(user.id)" class="btn btn-danger btn-xs">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
        <button @click="editarUsuario(user)" class="btn btn-success btn-xs">
            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
        </button>
        </td>
    </tr>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

 export default {
    name: 'Cliente',
    props: ['user'],
    computed: mapGetters({
        userSelected: 'userSelected'
      }),
    data() {
        return {
            titulo: 'Editar Usuario',
            showForm: true
        }
    },
    methods: {
        deleteUser(user){
            var data = { id: user };
            let vm = this;

            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                preConfirm: function () {
                    return new Promise(function (resolve, reject) {
                        vm.$store.dispatch('deleteClient',data)
                            .then(function(res){
                                    resolve(); 
                                    vm.$store.dispatch('getAllClients')          
                                }, function(response){
                                if (response.status ==422){
                                    
                                }
                            })
                    })
                },
                allowOutsideClick: false
                }).then(function (email) {
                swal({
                    type: 'success',
                    title: 'Exito!',
                    html: 'Cliente eliminado'
                })
                })            
        },
        editarUsuario(user){            
            this.showForm = true;
            this.$store.dispatch('selectClient',user);
            this.$store.dispatch('failMensaje', '');
            document.getElementById('myModalLabel').innerHTML = 'Editar Usuario';
            document.getElementById('inputPassword').value = '';

            $('#myModal').modal('show');
        },
        cancelEdit (e) {
            e.target.value = this.todo.text
            this.editing = false
        }
    }
 }
</script>