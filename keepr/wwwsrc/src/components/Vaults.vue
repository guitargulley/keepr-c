<template>
    <div class="vault">
        <!-- DELETE VAULT MODAL -->
        <div id="delete-vault" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">{{activeVault.name}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xs-12">
                                <h4>Are you sure you want to delete "{{activeVault.name}}"?</h4>
                                <h6>Once Deleted you will not be able to retrieve this vault again.</h6>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger pull-left" @click="deleteVault" data-dismiss="modal">DELETE IT</button>
                        <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="keep-view" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title">keep Deetz</h4>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-xs-6">
                          <h4>{{activeKeep.name}}</h4>
                          <img :src="activeKeep.imageUrl" alt="">
                        </div>
                        <div class="col-xs-6">
                          <div class="row" style="margin-top: 7rem">
                            <div class="col-xs-2">
                              <i class="fa fa-eye fa-2x text-warning" aria-hidden="true"></i>
                            </div>
                            <div class="col-xs-10">
                              <h4 class="text-left">Viewed: {{activeKeep.viewed}}</h4>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-xs-2">
                              <i class="fa fa-check fa-2x text-success" aria-hidden="true"></i>
                            </div>
                            <div class="col-xs-10">
                              <h4 class="text-left">Keeps: {{activeKeep.keepCount}}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn close-btn pull-right" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
        <div id="share" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">ShareIt</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xs-12 col-md-6">
                                <h4>Sharing this Keep will charge your credit card $1.99</h4>
                                <h5>To continue click
                                    <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#just-jokin">here</a> to add your credit card.</h5>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn close-btn" data-dismiss="modal" data-toggle="modal" data-target="#just-jokin">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="just-jokin" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">ShareIt</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xs-12 col-md-6">
                                <h4>Just messin with you. the share feature is currently under construction. Check back later!</h4>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- END OF MODAL -->
        <div id="edit-vault" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Vault</h4>
                    </div>
                    <div class="modal-body">
                        <form id="login" class="form">
                            <div class="form-group">
                                <label for="name">Name of Vault:</label>
                                <textarea type="text" maxlength="255" name="name" class="form-control" placeholder="Name of Vault" required v-model='vault.name'>{{vault.name}}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="description">Vault Description:</label>
                                <textarea type="text" name="description" maxlength="255" class="form-control" placeholder="description" required v-model='vault.description'>{{vault.description}}</textarea>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-success" @click="editVault" data-dismiss="modal" type="submit">Save Changes</button>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-submit btn-danger" @click="deleteKeep(activeKeep.id)" data-dismiss="modal" type="submit">Delete Keep</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end of modal -->
        <div class="row">
            <div class="col-xs-12 text-center">
                <button class="btn delete-vault-btn" data-toggle="modal" data-target="#delete-vault">DELETE VAULT</button>
                <button class="btn edit-vault-btn" @mouseover="getActiveVault" data-toggle="modal" data-target="#edit-vault">EDIT VAULT</button>
            </div>
            <div class="col-xs-12 text-center">
                <h1 class="vault-name">{{activeVault.name}}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6  col-lg-3 well" @mouseover="setActiveKeep(keep)" v-for="keep in vaultKeeps">
                <div class="container">
                    <div class="content">
                        <div class="content-overlay"></div>
                        <img class="content-image" :src="keep.imageUrl" alt="">
                        <div class="content-details fadeIn-bottom">
                            <button class="btn eye-btn">
                                <i class="fa fa-eye fa-2x" title="View Keep" data-toggle="modal" data-target="#keep-view"aria-hidden="true"></i>
                            </button>
                            <button class="btn delete-btn" title="Remove from Vault" @click="removeKeep(keep.id)">
                                <i class="fa fa-minus fa-2x" aria-hidden="true"></i>
                            </button>
                            <button class="btn share-btn" data-toggle="modal" data-target="#share">
                                <i class="fa fa-share-alt fa-2x" title="Share Keep" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <h2 class="title">{{keep.name}}</h2>
                    <button class="btn eye-btn-2">
                        <i class="fa fa-eye " title="View Keep" data-toggle="modal" data-target="#keep-view"aria-hidden="true"></i>
                    </button>
                    <button class="btn delete-btn-2" title="Remove from Vault" @click="removeKeep(keep.id)">
                        <i class="fa fa-minus " aria-hidden="true"></i>
                    </button>
                    <button class="btn share-btn-2" data-toggle="modal" data-target="#share">
                        <i class="fa fa-share-alt " title="Share Keep" aria-hidden="true"></i>
                    </button>
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
                vault: {
                    name: "",
                    description: ""
                }
            }
        },
        computed: {
            activeUser() {
                return this.$store.state.activeUser
            },
            activeVault() {
                return this.$store.state.activeVault
            },
            vaultKeeps() {
                return this.$store.state.vaultKeeps
            },
            activeKeep(){
                return this.$store.state.activeKeep
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
            setActiveKeep(keep){
                this.$store.dispatch('getKeep', { resource: "keeps", id: keep.id })
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
                    resource: "vaults",
                    endpoint: this.activeVault.id,
                    activeUser: this.activeUser.id
                })
            },
            editVault() {
                var editedVault = {
                    name: this.vault.name,
                    description: this.vault.description,
                    userId: this.activeUser.id
                }
                this.$store.dispatch('editVault', {
                    resource: "vaults",
                    endpoint: this.activeVault.id,
                    activeuser: this.activeUser.id,
                    vault: editedVault

                })
            },
            getActiveVault() {
                this.$store.dispatch('getActiveVault', {
                    resource: "vaults",
                    endpoint: this.$route.params.id
                })
                this.vault = {
                    name: this.activeVault.name,
                    description: this.activeVault.description
                }
            }
        }
    }
</script>

<style>
    #keep-view .modal-content {
    background-color: rgb(49, 73, 68);
    color: white;
  }

  #share .modal-content {
    background-color: rgb(49, 73, 68);
    color: white;
  }

  .close-btn {
    background-color: rgba(140, 140, 153, 0.801)
  }
    .share-btn {
        margin-bottom: 10em;
        background-color: rgba(140, 140, 153, 0.801);
        color: rgba(245, 245, 245, 0.445);
    }

    .eye-btn {
        margin-bottom: 10em;
        background-color: rgba(134, 226, 233, 0.521);
    }

    .delete-btn {
        margin-bottom: 10em;
        background-color: rgba(233, 150, 122, 0.493);
    }
    .share-btn-2 {
        background-color: rgba(140, 140, 153, 0.801);
        color: rgba(245, 245, 245, 0.445);
    }

    .eye-btn-2 {
        background-color: rgba(134, 226, 233, 0.521);
    }

    .delete-btn-2 { 
        background-color: rgba(233, 150, 122, 0.493);
    }

    .edit-vault-btn {
        background-color: rgba(134, 226, 233, 0.521);
        color: rgba(245, 245, 245, 0.445);
        text-shadow: 0px 0px 1px white;
    }

    .delete-vault-btn {
        background-color: rgba(233, 150, 122, 0.493);
        color: rgba(245, 245, 245, 0.445);
        text-shadow: 0px 0px 1px white;
    }

    .vault-name {
        font-family: 'Cinzel', serif;
        font-size: 5em;
        color: rgba(255, 255, 255, 0.664);
        text-shadow: 1px 1px 2px black;
    }

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

    .title {
        color: rgba(255, 255, 255, 0.788);
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
        height: 100%;
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