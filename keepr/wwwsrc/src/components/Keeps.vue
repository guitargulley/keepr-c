<template>
    <div class="autos text-center">
        <router-link :to="{name: 'Home'}">Return to Home</router-link>
        <button data-toggle="modal" data-target="#autoPost">Post</button>
        <h1>"Keep" it real..</h1>
        <div class="cars row">
            <div v-for="keep in keeps" class="col-sm-4">
                <img :src="keep.image" alt="a car">
                <p>{{keep.title}}</p>
            </div>
        </div>
        <div id="keepIt" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Post New Auto</h4>
                    </div>
                    <div class="modal-body">
                        <form id="keep-it" class="form">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Keeps',
        data() {
            return {
                
            }
        },
        computed: {
            keeps() {
                return this.$store.state.keeps
            }
        },
        mounted() {
            this.$store.dispatch('getKeeps', {
                resource: "keeps",
            })
        },
        methods: {
            getKeeps() {
                this.$store.dispatch('getKeeps', {
                    resource: "keeps",
                })
            },
            addKeep() {
                this.$store.dispatch('addKeep', {
                    data: this.newKeep,
                    resource: "keep"
                })
            },
            addToMyKeeps(){
                this.$store.dispatch('updateMyKeeps',{
                    data: this.keep,
                    resource: 'keeps/'+ this.keep.id
                })
            }
        }
    }
</script>

<style>
</style>