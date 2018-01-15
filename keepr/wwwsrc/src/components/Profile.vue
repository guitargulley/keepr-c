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
    <!--NEW VAULT MODAL -->
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
                <input type="text" name="imageurl" maxlength="255" class="form-control" placeholder="imageurl" required v-model='newKeep.imageurl'>
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
            <h2>{{keep.name}}</h2>
            <img :src="keep.imageUrl" alt="">
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
          imgurl: ''
        }

      }
    },
    components: {
      activeUser() {
        return this.$store.state.activeUser
      },

    },
    mounted() {
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getVaults', { resource: 'vaults', user: this.activeUser })
      this.$store.dispatch('getUserKeeps', { resource: 'keeps', user: this.activeUser })
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>