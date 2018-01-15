<template>
    <div class="">
        
    </div>
</template>

<script>
    export default {
        name: 'Keep',
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