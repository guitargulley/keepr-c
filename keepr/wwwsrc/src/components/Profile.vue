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

                  <button class="btn btn-primary" style="width:80%; margin-bottom:3px" @click="addKeepToVault(vault.id)" data-dismiss="modal">{{vault.name}}</button>
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
                  <label for="category">CATEGORY:</label>
                      <div class="btn-group">
                          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            {{category}} <span class="caret"></span>
                          </button>
                          <ul class="dropdown-menu" >
                            <li  v-for= "c in categories" require ><a @click="changeCategory(c)" :name="c":value="c">{{c}}</a></li>
                          </ul>
                        </div>
                </div>
              <div class="form-group">
                <label>
                  <input type="checkbox" value="true" v-model='newKeep.public'>MAKE PUBLIC</label>
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
                <label>CATEGORY:</label>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-model="newKeep.category">
                          {{category}} <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu"  >
                          <li v-for="c in categories"><a @click="changeCategory(c)" :name="c":value="c">{{c}}</a></li>
                        </ul>
                      </div>
                      <div class="form-group">
                          <label>
                            <input type="checkbox" value="true" v-model='newKeep.public'>MAKE PUBLIC</label>
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
              <div class="col-xs-12 col-sm-6">
                <h4>{{activeKeep.name}}</h4>
                <img :src="activeKeep.imageUrl" alt="">
              </div>
              <div class="col-xs-12 col-sm-6">
                <div class="row" style="margin-top: 7rem">
                  <div class="col-xs-2">
                    <i class="fa fa-eye fa-2x text-warning" aria-hidden="true"></i>
                  </div>
                  <div class="col-xs-10">
                    <h4 class="text-left">Viewed: {{activeKeep.viewed +1}}</h4>
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
            <button class="btn pull-left keep-btn" data-toggle="modal" data-target="#add-to-vault" data-dismiss="modal">
              <i class="fa fa-check" aria-hidden="true"></i>Keep It</button>
            <button type="button" class="btn  pull-right close-btn" data-dismiss="modal">Close</button>
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
          <div class="col-xs-12 col-sm-6" v-for="vault in userVaults">
            <router-link :to="{path: '/vaults/'+ vault.id}">
              <button class="btn btn-lg vault-btn" @click="setActiveVault(vault.id)">{{vault.name}}</button>
            </router-link>
          </div>
        </div>

      </div>
      <div class="col-xs-12">
        <h1 class="keep-text">YOUR KEEPS
          <button class="btn  plus-btn ">
            <i class="fa fa-plus fa-2x " aria-hidden="true" @mouseover="resetVmodel" data-toggle="modal" data-target="#new-keep"></i>
          </button>
        </h1>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 well keep-div" v-for="keep in userKeeps">
            <div class="container">
              <div class="content">
                <div class="content-overlay"></div>
                <img class="content-image image-responsive" :src="keep.imageUrl" alt="">
                <div class="content-details fadeIn-bottom">
                  <button class="btn btn-lg edit-btn" @mouseover="setActiveKeep(keep)" data-toggle="modal" data-target="#edit-keep">
                    <i class="fa fa-pencil" title="Edit Keep" aria-hidden="true"></i>
                  </button>
                  <button class="btn btn-lg delete-btn" @mouseover="setActiveKeep(keep)" data-toggle="modal" data-target="#delete-keep" title="Delete Keep">
                    <i class="fa fa-minus" aria-hidden="true"></i>
                  </button>
                  <button class="btn btn-lg eye-btn">
                    <i class="fa fa-eye" title="View Keep" @mouseover="setActiveKeep(keep)" @click="updateKeepViews(keep)"data-toggle="modal" data-target="#keep-view" aria-hidden="true"></i>
                  </button>
                </div>
                <div>
                  <h2 class="title bottom-buttons">{{keep.name}}</h2>
                  <div>
                      <i class="fa fa-eye eye-btn-2" title="View Keep" aria-hidden="true">: {{keep.viewed}}</i>
                      <i class="fa fa-check check-2" title="Add Keep To A Vault"  aria-hidden="true">:{{keep.keepCount}}</i>
                  </div>
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
          imageUrl: '',
          public: false,
          category: this.category  
        },
        category:""
      }
    },
    mounted() {
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getAll', {
        resource: 'vaults',
        endpoint: `users/${this.$route.params.id}`,
        data: {},
        mutation: 'setVaults'
      })
      this.$store.dispatch('getAll', {
        resource: 'keeps',
        endpoint: `users/${this.$route.params.id}`,
        data: {},
        mutation: 'setUserKeeps'
      })
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
      activeKeep() {
        return this.$store.state.activeKeep
      },
      categories(){
        return this.$store.state.categories
      }
    },
    methods: {
      changeCategory(c){
       this.category = c
       this.newKeep.category = c.toLowerCase()
      },
      resetVmodel() {
        this.newKeep = {
          name: "",
          imageUrl: "",
          public: false,
          category:""
        }
      },
      createKeep() {
        this.newKeep.keepcount = 0
        this.newKeep.viewed = 0
        this.$store.dispatch('create', {
          resource: "keeps",
          endpoint: "",
          data: this.newKeep,
          action: "getAll",
          resource2: "keeps",
          endpoint2: `users/${this.activeUser.id}`,
          mutation2: "setUserKeeps"
        })
        this.newKeep = {
          name: "",
          imageurl: "",
          public: false,
          category: ""
        }
      },
      updateKeepViews(keep) {
        keep.viewed++
        var updatedKeep = {
          name: keep.name,
          imageUrl: keep.imageUrl,
          userId: keep.userId,
          keepCount: keep.keepCount,
          viewed: keep.viewed,
          public: keep.public,
          category: keep.category
        }
        this.$store.dispatch('update', {
          resource: "keeps",
          endpoint: keep.id,
          data: updatedKeep,
          action: "getAll",
          resource2: "keeps",
          endpoint2: "",
          mutation2: "setKeeps"
        })
      },
      createVault() {
        this.newVault.userId = this.activeUser.id
        this.$store.dispatch('create', {
          resource: "vaults",
          endpoint: "",
          data: this.newVault,
          action: "getAll",
          resource2: "vaults",
          endpoint2: `users/${this.activeUser.id}`,
          mutation2: "setVaults"
        })
        this.newVault = {
          name: "",
          description: ""
        }
      },
      addKeepToVault(id) {
        this.activeKeep.keepCount++
        this.activeKeep.viewed++
        this.$store.dispatch('create',
          {
            resource: "vaultKeeps",
            endpoint: "",
            data:
              {
                vaultId: id,
                keepId: this.activeKeep.id,
                userId: this.activeKeep.userId
              },
            router: { path: '/vaults/' + id },
          })
        this.$store.dispatch('update', {
          resource: "keeps",
          endpoint: this.activeKeep.id,
          data: this.activeKeep,
          action: "getAll",
          resource2: "keeps",
          endpoint2: this.activeKeep.id,
          mutation2: "setKeeps"
        })
      },
      setActiveVault(id) {
        this.$store.dispatch('getOne', {
          resource: "vaults",
          endpoint: id,
          data: {},
          mutation: 'setActiveVault'
        })
      },
      setActiveKeep(keep) {
        this.$store.dispatch('getOne', {
          resource: "keeps",
          endpoint: keep.id,
          data: {},
          mutation: 'setActiveKeep'
        })
        this.newKeep = keep
        this.category = keep.category
      },
      editKeep() {
        this.newKeep.id = this.activeKeep.id
        this.newKeep.userId = this.activeKeep.userId
        this.newKeep.keepcount = this.activeKeep.keepcount
        this.newKeep.viewed = this.activeKeep.viewed

        this.$store.dispatch('update', {
          resource: "keeps",
          endpoint: this.newKeep.id,
          data: this.newKeep,
          action: 'getAll'
        })
      },
      deleteKeep() {
        this.$store.dispatch('delete', {
          resource: "keeps",
          endpoint: this.activeKeep.id,
          data: {},
          action: "getAll",
          resource2: "keeps",
          endpoint2: `users/${this.activeUser.id}`,
          mutation2: "setUserKeeps"
        })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .keep-btn {
    background-color: rgba(233, 150, 122, 0.493);
  }

  .close-btn {
    background-color: rgba(140, 140, 153, 0.801)
  }
  .keep-div {
    height: 650px;
  }
  .edit-btn {
    margin-bottom: 8em;
    background-color: rgba(140, 140, 153, 0.801);
    color: rgba(245, 245, 245, 0.445);
  }

  .eye-btn {
    margin-bottom: 8em;
    background-color: rgba(134, 226, 233, 0.521);
  }

  .delete-btn {
    margin-bottom: 8em;
    background-color: rgba(233, 150, 122, 0.493);
  }

  .eye-btn-2 {
    background-color: rgba(134, 226, 233, 0.521);
    width: 15%;
height: 30px;
padding-top: 8px;
border-radius: 5px;
}

.check-2 {
    background-color: rgba(233, 150, 122, 0.493);
    width: 15%;
    height: 30px;
    padding-top: 8px;
    border-radius: 5px;
  }

  .vault-btn {
    background-color: rgba(99, 222, 231, 0.336);
    color: white;
    box-shadow: 1px 1px 5px black;
    text-shadow: 0px 0px 1px black;
    width:100%; 
    margin: 2px
  }

  .plus-btn {
    background-color: rgba(255, 255, 255, 0.623);
    color: rgba(0, 0, 0, 0.534);
    box-shadow: 1px 1px 2px black;
  }

  .profile-name {
    font-family: 'Cinzel', serif;
    font-size: 5em;
    color: rgba(255, 255, 255, 0.664);
    text-shadow: 1px 1px 2px black;
  }

  .keep-text {
    color: rgba(255, 255, 255, 0.904);
    text-shadow: 0px 0px 1px black;
  }

  .vault-text {
    color: rgba(255, 255, 255, 0.904);
    text-shadow: 0px 0px 1px black;
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
    .keep-div {
      height: 400px;
    }
    .title {
      font-size: 1em;
    }
    .bottom-buttons button {
      width: 35px;
    }
    .bottom-buttons i {
      margin-left: -10px;
      font-size: 1em;
    }
    .content-details button {
      margin-bottom: 20px
    }
    .vault-btn{
      width: 100%
    }
    .profile-name{
      font-size: 3em;
    }
  }

  @media screen and (min-width: 900px) {
    .container {
      width: 100%;
    }
  }

  .title {
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
    max-height: 500px;
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