<template>
    <form v-on:submit.prevent class="form-horizontal">
        <input type="hidden" v-bind:value="item.id" id="iditem" name="iditem">
        <div class="form-group">
            <label for="inputUser" class="col-sm-4 control-label">Codigo</label>
            <div class="col-sm-8">
                <input type="text" v-bind:value="item.codigo" class="form-control" id="inputCodigo" placeholder="Codigo del producto">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-4 control-label">Descripcion</label>
            <div class="col-sm-8">
                <input type="text" v-bind:value="item.descripcion" class="form-control" id="inputDescripcion" placeholder="Descripcion">
            </div>
        </div>
        <div class="form-group">
            <label for="inputPrecio" value="" class="col-sm-4 control-label">Precio</label>
            <div class="col-sm-8">
                <input type="text" v-bind:value="item.precio" class="form-control" id="inputPrecio" placeholder="Precio">
            </div>
        </div>                      
    </form>
</template>
<script>
 export default {
    name: 'FormItem',
    props: ['item']
 }
 </script>