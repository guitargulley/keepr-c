<template>
    <div class="vault">
        <div class="row">
            <div class="col-xs-12">
                <h1>{{activeVault.name}}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-3" v-for="keep in vaultKeeps">
                <div class="container">
                    <h2 class="title">{{keep.name}}</h2>
                    <div class="content">
                        <div class="content-overlay"></div>
                        <img class="content-image" :src="keep.imageUrl" alt="">
                        <div class="content-details fadeIn-bottom">
                            <button class="btn btn-warning">
                                <i class="fa fa-eye fa-2x" aria-hidden="true"></i>
                            </button>
                            <button class="btn btn-danger" @click="removeKeep(keep.id)">
                                <i class="fa fa-minus fa-2x" aria-hidden="true"></i>
                            </button>
                            <button class="btn btn-primary">
                                <i class="fa fa-share-alt fa-2x" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
            activeVault() {
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
            removeKeep(id) {
                this.$store.dispatch('removeKeep', {
                    resource: "vaultkeeps",
                    endpoint2: id,
                    endpoint: this.activeVault.id

                })
            },
            deleteVault() {
                this.$store.dispatch('deleteVault', {
                    resource: "vault",
                    endpoint: this.activeVault.id
                })
            }
        }
    }
</script>

<style>
    .container {
        padding: 1em 0;
        float: left;
        width: 100%;
    }

    @media screen and (max-width: 640px) {
        .container {
            display: block;
            width: 100%;
        }
    }

    @media screen and (min-width: 900px) {
        .container {
            width: 100%;
        }
    }

    .container .title {
        color: #1a1a1a;
        text-align: center;
        margin-bottom: 10px;
    }

    .content {
        position: relative;
        width: 90%;
        max-width: 400px;
        margin: auto;
        overflow: hidden;
    }

    .content .content-overlay {
        background: rgba(0, 0, 0, 0.7);
        position: absolute;
        height: 99%;
        width: 100%;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
        -webkit-transition: all 0.4s ease-in-out 0s;
        -moz-transition: all 0.4s ease-in-out 0s;
        transition: all 0.4s ease-in-out 0s;
    }

    .content:hover .content-overlay {
        opacity: 1;
    }

    .content-image {
        width: 100%;
    }

    .content-details {
        position: absolute;
        text-align: center;
        padding-left: 1em;
        padding-right: 1em;
        width: 100%;
        top: 50%;
        left: 50%;
        opacity: 0;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        -webkit-transition: all 0.3s ease-in-out 0s;
        -moz-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
    }

    .content:hover .content-details {
        top: 50%;
        left: 50%;
        opacity: 1;
    }

    .content-details h3 {
        color: #fff;
        font-weight: 500;
        letter-spacing: 0.15em;
        margin-bottom: 0.5em;
        text-transform: uppercase;
    }

    .content-details p {
        color: #fff;
        font-size: 0.8em;
    }

    .fadeIn-bottom {
        top: 80%;
    }
</style>