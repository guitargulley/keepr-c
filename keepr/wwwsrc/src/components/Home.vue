<template>
  <div class="home container-fluid text-center">
    <!--Add To Vault MODAL -->
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
              <div class="col-xs-6">
                <h4>Select Vault to add to</h4>
                <div class="row" v-for="vault in userVaults">

                  <button class="btn btn-primary" @click="addKeepToVault(vault.id)">{{vault.name}}</button>
                </div>
              </div>
              <div class="col-xs-6">
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
    <!-- end of modal -->

    <h1>WELCOME TO KeepR!</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <form id="search-keeps" class="form-inline" @submit.prevent="getKeeps">
            <div class="search-form-group">
              <input type="text" name="text" class="form-control" placeholder="Find a Keep">
              <button class="btn btn-submit btn-success search-btn" type="submit">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-3" v-for="keep in keeps">
          <!-- <event :keep="Keep"></event> -->
          <h2>{{keep.name}}</h2>
          <img :src="keep.imageUrl" alt="">
          <br>
          <div v-if="activeUser">
          <button>
            <i class="fa fa-eye fa-2x" aria-hidden="true"></i>
          </button>
            <button>
              <i class="fa fa-check fa-2x" @click="setActiveKeep(keep.id)" data-toggle="modal" data-target="#add-to-vault" aria-hidden="true"></i>
            </button>
            <button>
              <i class="fa fa-share-alt fa-2x" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {

      }
    },
    components: {

    },
    mounted() {
      this.$store.dispatch('getKeeps', { resource: "keeps" })
      this.$store.dispatch('getVaults', { resource: 'vaults', user: this.activeUser })
    },
    computed: {
      activeUser() {
        return this.$store.state.activeUser
      },
      keeps() {
        return this.$store.state.keeps
      },
      userVaults() {
        return this.$store.state.userVaults
      },
      activeKeep(){
        return this.$store.state.activeKeep
      }
    },
    methods: {
      getKeeps() {
        this.$store.dispatch('getKeeps', {
          resource: "keeps",
        })
      },
      setActiveKeep(id){
        debugger
        this.$store.dispatch('getKeep', {resource: "keeps", id: id})
      },
      addKeepToVault(id) {
        this.activeKeep.keepcount++
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
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>