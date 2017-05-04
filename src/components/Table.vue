<template>
    <table class="table table-bordered">
        <tr> 
            <th>#</th> 
            <th>User</th> 
            <th>Body</th> 
            <th>Time</th> 
            <th></th> 
        </tr>
        <tr v-for="item in listMessages"> 
            <th scope="row">{{item.id}}</th> 
            <td>{{item.user}}</td> 
            <td>{{ item.body }}</td> 
            <td>
            {{item.time | formatDate}}
            <span class="label label-default">{{item.time | parseDate}}</span>
            </td> 
            <td>
            <button v-on:click="removeMessage(item._id)" class="btn btn-danger btn-xs">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
            <button v-on:click="editMessage(item._id)" class="btn btn-success btn-xs">
                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
            </button>
            </td>
        </tr>
    </table>
</template>
<script>
    import moment from "moment";

    export default {
        props: ['listMessages'],
        filters: {
            formatDate: function (value) {
                if (!value) return ''
                value = value.toString()
                return moment(value).format('MM/DD/YYYY hh:mm')
            },
            parseDate: function (value) {
                if (!value) return ''
                value = value.toString()
                return moment(value).fromNow()
            }
        },
        methods: {        
            removeMessage (id) {
                this.$http.post('/api/removemessage',[id])
                .then(function(res){
                        this.$parent.getMessages();
                    })
            },
            editMessage (id) {
                this.$parent.editMessage(id);                
            }
        }
    }
</script>