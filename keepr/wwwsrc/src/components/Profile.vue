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
                  <button class="btn btn-submit btn-success" @click="editKeep" data-dismiss="modal" type="submit">Save Changes</button>
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
    <h1>{{activeUser.username}}</h1>
    <div class="row">
      <div class="col-xs-6">
        <h1>Your Vaults
          <button class="btn btn-success">
            <i class="fa fa-plus fa-2x" aria-hidden="true" data-toggle="modal" data-target="#new-vault"></i>
          </button>
        </h1>


        <div class="row">
          <div class="col-xs-12" v-for="vault in userVaults">
            <router-link :to="{path: '/vaults/'+ vault.id}">
              <button @click="setActiveVault(vault.id)">{{vault.name}}</button>
            </router-link>
          </div>
        </div>

      </div>
      <div class="col-xs-6">
        <h1>Your Keeps
          <button class="btn btn-success">
            <i class="fa fa-plus fa-2x" aria-hidden="true" data-toggle="modal" data-target="#new-keep"></i>
          </button>
        </h1>
        <div class="row">
          <div class="col-xs-4" v-for="keep in userKeeps">
              <div class="container">
                  <h2 class="title">{{keep.name}}</h2>
                  <div class="content">
                      <div class="content-overlay"></div>
                      <img class="content-image" :src="keep.imageUrl" alt="">
                      <div class="content-details fadeIn-bottom">
                          <button class="btn btn-warning"  @click="setActiveKeep(keep)"data-toggle="modal" data-target="#edit-keep">
                              <i class="fa fa-pencil"   aria-hidden="true"></i>
                          </button>
                          <button class="btn btn-danger" @click="deleteKeep(keep.id)">
                              <i class="fa fa-minus" aria-hidden="true"></i>
                          </button>
                          <button class="btn btn-primary">
                              <i class="fa fa-eye" aria-hidden="true"></i>
                          </button>
                      </div>
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
          imageUrl: ''
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
        this.newKeep.userId = this.activeUser.id
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
      setActiveVault(id) {
        this.$store.dispatch('getActiveVault', {
          resource: "vaults",
          endpoint: id
        })
      },
      setActiveKeep(keep){
        debugger
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
      deleteKeep(id){
        this.$store.dispatch('deleteKeep', {resource:"keeps", endpoint:id, id:this.activeUser.id})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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