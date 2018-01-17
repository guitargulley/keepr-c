<template>
  <div class="home container-fluid text-center">
    <!--NEW VAULT MODAL -->
    <div id="new-vault" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Create New Vault</h4>
          </div>
          <div class="modal-body">
            <form id="login" class="form">
              <div class="form-group">
                <label for="name">Name of Vault:</label>
                <input type="text" maxlength="255" name="name" class="form-control" placeholder="Name of Vault" required v-model='newVault.name'>
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textarea type="text" name="description" maxlength="255" class="form-control" placeholder="Description" required v-model='newVault.description'></textarea>
              </div>
              <div class="form-group">
                <button class="btn btn-submit btn-success" @click="createVault" data-dismiss="modal" type="submit">Submit</button>
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
    <div id="add-to-vault" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">KeepIt</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-xs-12 col-md-6">
                  <h4>Select Vault to add to</h4>
                  <div class="row" v-for="vault in userVaults">
  
                    <button class="btn btn-primary" style="width:80%; margin-bottom:3px"@click="addKeepToVault(vault.id)" data-dismiss="modal">{{vault.name}}</button>
                  </div>
                </div>
                <div class="col-xs-12 col-md-6 ">
                  <h4>{{activeKeep.name}}</h4>
                  <img :src="activeKeep.imageUrl" alt="">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    <!--NEW KEEP MODAL -->
    <div id="new-keep" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Create New Keep</h4>
          </div>
          <div class="modal-body">
            <form id="login" class="form">
              <div class="form-group">
                <label for="name">Name of Keep:</label>
                <input type="text" maxlength="255" name="name" class="form-control" placeholder="Name of Keep" required v-model='newKeep.name'>
              </div>
              <div class="form-group">
                <label for="imageUrl">Image URL:</label>
                <input type="text" name="imageurl" maxlength="255" class="form-control" placeholder="imageurl" required v-model='newKeep.imageUrl'>
              </div>
              <div class="form-group">
                  <label><input type="checkbox" value="true" required v-model='newKeep.public'>MAKE PUBLIC</label>
                </div>
              <div class="form-group">
                <button class="btn btn-submit btn-success" @click="createKeep" data-dismiss="modal" type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- DELETE KEEP MODAL -->
    <div id="delete-keep" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">{{activeKeep.name}}</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-xs-12">
                    <h4>Are you sure you want to delete "{{activeKeep.name}}"?</h4>
                    <h6>Once Deleted you will not be able to retrieve this keep again.</h6>
                </div>
              </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger pull-left" @click="deleteKeep" data-dismiss="modal">DELETE IT</button>
              <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    <!-- EDIT KEEP MODAL -->
    <div id="edit-keep" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Edit Keep</h4>
            </div>
            <div class="modal-body">
              <form id="login" class="form">
                <div class="form-group">
                  <label for="name">Name of Keep:</label>
                  <textarea type="text" maxlength="255" name="name" class="form-control" placeholder="Name of Keep" required v-model='newKeep.name'>{{newKeep.name}}</textarea>
                </div>
                <div class="form-group">
                  <label for="imageUrl">Image URL:</label>
                  <textarea type="text" name="imageurl" maxlength="255" class="form-control" placeholder="imageurl" required v-model='newKeep.imageUrl'>{{newKeep.imageUrl}}</textarea>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" value="true" required v-model='newKeep.public'>MAKE PUBLIC</label>
                  </div>
                <div class="form-group">
                  <button class="btn btn-submit btn-success" @click="editKeep" data-dismiss="modal" type="submit">Save Changes</button>
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
    <div id="keep-view" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Keep Deetz</h4>
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
                        <h4 class="text-left">Keeps:{{activeKeep.keepCount}}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-success pull-left" data-toggle="modal" data-target="#add-to-vault" data-dismiss="modal"><i class="fa fa-check" aria-hidden="true"></i>Keep It</button>
              <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    <h1 class="profile-name">{{activeUser.username}}'s Dashboard</h1>
    <div class="row">
      <div class="col-xs-12">
        <h1 class="vault-text">YOUR VAULTS
          <button class="btn plus-btn">
            <i class="fa fa-plus fa-2x " aria-hidden="true" data-toggle="modal" data-target="#new-vault"></i>
          </button>
        </h1>


        <div class="row">
          <div class="col-xs-6" v-for="vault in userVaults">
            <router-link :to="{path: '/vaults/'+ vault.id}">
              <button class="btn btn-lg vault-btn"style="width:100%; margin: 2px"@click="setActiveVault(vault.id)">{{vault.name}}</button>
            </router-link>
          </div>
        </div>

      </div>
      <div class="col-xs-12">
        <h1 class="keep-text">YOUR KEEPS
          <button class="btn  plus-btn ">
            <i class="fa fa-plus fa-2x " aria-hidden="true" data-toggle="modal" data-target="#new-keep"></i>
          </button>
        </h1>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-lg-3 well" v-for="keep in userKeeps">
              <div class="container">
                  <div class="content">
                      <div class="content-overlay"></div>
                      <img class="content-image" :src="keep.imageUrl" alt="">
                      <div class="content-details fadeIn-bottom">
                          <button class="btn btn-lg edit-btn"  @mouseover="setActiveKeep(keep)" data-toggle="modal" data-target="#edit-keep">
                              <i class="fa fa-pencil"  title="Edit Keep" aria-hidden="true"></i>
                          </button>
                          <button class="btn btn-lg delete-btn"  @mouseover="setActiveKeep(keep)" data-toggle="modal" data-target="#delete-keep"title="Delete Keep">
                              <i class="fa fa-minus" aria-hidden="true"></i>
                          </button>
                          <button class="btn btn-lg eye-btn">
                              <i class="fa fa-eye" title="View Keep"  @mouseover="setActiveKeep(keep)" data-toggle="modal" data-target="#keep-view"aria-hidden="true"></i>
                          </button>
                      </div>
                  </div>
              </div>
              <div>
                  <h2 class="title">{{keep.name}}</h2>
                  <button class="btn btn-lg edit-btn-2"  @mouseover="setActiveKeep(keep)" data-toggle="modal" data-target="#edit-keep">
                      <i class="fa fa-pencil"  title="Edit Keep" aria-hidden="true"></i>
                  </button>
                <button class="btn btn-lg delete-btn-2"  @mouseover="setActiveKeep(keep)" data-toggle="modal" data-target="#delete-keep"title="Delete Keep">
                    <i class="fa fa-minus" aria-hidden="true"></i>
                </button>
                <button class="btn btn-lg eye-btn-2">
                    <i class="fa fa-eye" title="View Keep" aria-hidden="true" @click="updateKeepViews(keep)" data-toggle="modal" data-target="#keep-view">:{{keep.viewed}}</i>
                  </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    data() {
      return {
        newVault: {
          name: '',
          description: '',
          userId: ''
        },
        newKeep: {
          name: '',
          imageUrl: '',
          public: false,
        }

      }
    },
    mounted() {
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getVaults', { resource: 'vaults', id: this.$route.params.id })
      this.$store.dispatch('getUserKeeps', { resource: 'keeps', id: this.$route.params.id })
    },
    computed: {
      activeUser() {
        return this.$store.state.activeUser
      },
      userVaults() {
        return this.$store.state.userVaults
      },
      userKeeps() {
        return this.$store.state.userKeeps
      },
      activeKeep(){
        return this.$store.state.activeKeep
      }
    },
    methods: {
      createKeep() {
        this.newKeep.keepcount = 0
        this.newKeep.viewed = 0
        // this.newKeep.userId = this.activeUser.id
        this.$store.dispatch('createKeep', {
          user: this.activeUser,
          data: this.newKeep,
          resource: "keeps"
        })
        this.newKeep = {
          name: "",
          imageurl: ""
        }
      },
      createVault() {
        this.newVault.userId = this.activeUser.id
        this.$store.dispatch('createVault', {
          user: this.activeUser,
          data: this.newVault,
          resource: "vaults"
        })
        this.newVault = {
          name: "",
          description: ""
        }
      },
      addKeepToVault(id) {
        this.activeKeep.keepCount++
        this.activeKeep.viewed++
        this.$store.dispatch('addToVault',
          {
            data:
              {
                vaultId: id,
                keepId: this.activeKeep.id,
                userId: this.activeKeep.userId
              },
            keep: this.activeKeep,
            resource: 'vaultkeeps'
          })
          this.$store.dispatch('updateKeep', {resource: "keeps", endpoint: this.activeKeep.id, keep:this.activeKeep})
      },
      setActiveVault(id) {
        this.$store.dispatch('getActiveVault', {
          resource: "vaults",
          endpoint: id
        })
      },
      setActiveKeep(keep){
        this.$store.dispatch('getKeep', { resource: "keeps", id: keep.id })
        this.newKeep = keep
      },
      editKeep(){
        this.newKeep.id = this.activeKeep.id
        this.newKeep.userId = this.activeKeep.userId
        this.newKeep.keepcount = this.activeKeep.keepcount
        this.newKeep.viewed = this.activeKeep.viewed
        this.$store.dispatch('updateKeep', {resource:"keeps", endpoint:this.newKeep.id, keep: this.newKeep})
      },
      deleteKeep(){
        this.$store.dispatch('deleteKeep', {resource:"keeps", endpoint:this.activeKeep.id, id:this.activeUser.id})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
   .edit-btn{
    margin-bottom:10em;
    background-color:rgba(140, 140, 153, 0.801);
    color:rgba(245, 245, 245, 0.445);
  }
  .eye-btn{
    margin-bottom:10em;
    background-color:rgba(134, 226, 233, 0.521);
  }
  .delete-btn{
    margin-bottom:10em;
    background-color:rgba(233, 150, 122, 0.493);
  }
  .edit-btn-2{

    background-color:rgba(140, 140, 153, 0.801);
    color:rgba(245, 245, 245, 0.445);
  }
  .eye-btn-2{

    background-color:rgba(134, 226, 233, 0.521);
  }
  .delete-btn-2{

    background-color:rgba(233, 150, 122, 0.493);
  }
  .vault-btn{
    background-color:rgba(99, 222, 231, 0.336);
    color:white;
    box-shadow:1px 1px 5px black;
    text-shadow: 0px 0px 1px black;
  }
  .plus-btn{
    background-color:rgba(255, 255, 255, 0.623);
    color: rgba(0, 0, 0, 0.534);
    box-shadow:1px 1px 2px black;
  }
  .profile-name{
    font-family:'Cinzel', serif;
    font-size:5em;
    color:rgba(255, 255, 255, 0.664);
    text-shadow:1px 1px 2px black;
  }
  .keep-text{
    color:rgba(255, 255, 255, 0.904);
    text-shadow:0px 0px 1px black;
  }
  .vault-text{
    color:rgba(255, 255, 255, 0.904);
    text-shadow:0px 0px 1px black;
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

    .title{
      color: rgba(255, 255, 255, 0.767);
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