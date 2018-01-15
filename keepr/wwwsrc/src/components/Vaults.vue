<template>
        <div class="vault">
            <div class="row">
                <div class="col-xs-12">
                    <h1>{{activeVault.name}}</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-3" v-for="keep in vaultKeeps">
                        <h2>{{keep.name}}</h2>
                        <img :src="keep.imageUrl" alt="">
                        <button class="btn btn-danger"><i class="fa fa-minus" aria-hidden="true"></i></button>
                </div>
            </div>
            
        </div>
    </template>
    
    <script>
        export default {
            name: 'vaults',
            data() {
                return {
                    
                }
            },
            computed: {
                activeVault(){
                    return this.$store.state.activeVault
                },
                vaultKeeps() {
                    return this.$store.state.vaultKeeps
                }
            },
            mounted() {
                this.$store.dispatch('getActiveVault', {
                    resource: "vaults",
                    endpoint: this.$route.params.id
                }),
                this.$store.dispatch('getVaultKeeps', {
                    resource: "vaultkeeps",
                    endpoint: this.activeVault.id
                })

            },
            methods: {
                getVaultKeeps() {
                    this.$store.dispatch('getVaultKeeps', {
                        resource: "vaultkeeps",
                    })
                },
                removeKeep() {
                    this.$store.dispatch('removeKeep', {
                        resource: "vaultkeeps"
                    })
                },
                deleteVault(){
                    this.$store.dispatch('deleteVault', {
                        resource: "vault",
                        endpoint: this.activeVault.id
                    })
                }
            }
        }
    </script>
    
    <style>
    </style>