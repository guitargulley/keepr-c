<template>
  <div class="home container-fluid text-center">
    <!-- login modal -->
    <div id="fb-root"></div>
    <div id="login" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Sign in to your account</h4>
          </div>
          <div class="modal-body">
            <form id="login" class="form">
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" maxlength="57" name="email" class="form-control" placeholder="Email" required v-model='login.email'>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" maxlength="20" class="form-control" placeholder="password" required v-model='login.password'>
              </div>
              <div class="form-group">
                <button class="btn btn-submit btn-success" @click="submitLogin" data-dismiss="modal" type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
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
    <!-- end of modal -->
    <!-- SHARE MODAL -->
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
                <h5>To continue click <a href="#" data-dismiss="modal"data-toggle="modal" data-target="#just-jokin">here</a> to add your credit card.</h5>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" data-toggle="modal" data-target="#just-jokin">Close</button>
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
    <!-- VIEW KEEP MODAL -->
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
                    <h4 class="text-left">Keeps:{{activeKeep.keepCount}}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success pull-left" data-toggle="modal" data-target="#add-to-vault" data-dismiss="modal">
              <i class="fa fa-check" aria-hidden="true"></i>Keep It</button>
            <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <h1 style="text-shadow:0px 0px 1px black; color:white;font-weight:bold; font-size:4em">WELCOME TO keepR!</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <form id="search-keeps" class="form-inline" @submit.prevent="findKeepsBy">
            <div class="search-form-group"style=" margin-bottom:10px;">
              <input type="text" name="text" style="width:50%;"class="form-control" placeholder="Find a Keep" v-model="search">
              <button class="btn btn-submit search-btn"title="Search" type="submit" >
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6 col-sm-4  col-lg-3 well" v-for="keep in keeps">
          <div class="container" @mouseover="hoverHandle(keep.id)">
            <h2 class="title">{{keep.name}}</h2>
            <div class="content">
              <div class="content-overlay"></div>
              <img class="content-image" :src="keep.imageUrl" alt="">
              <div v-if="activeUser" class="content-details fadeIn-bottom">
                <button class="btn eye">
                  <i class="fa fa-eye fa-2x" title="View Keep" @click="updateKeepViews(keep)" data-toggle="modal" data-target="#keep-view"
                    aria-hidden="true"></i>
                </button>
                <button class="btn check">
                  <i class="fa fa-check fa-2x" title="Add Keep To A Vault" data-toggle="modal" data-target="#add-to-vault" aria-hidden="true"></i>
                </button>
                <button class="btn share-btn">
                    <i class="fa fa-share-alt fa-2x" data-toggle="modal" data-target="#share"aria-hidden="true"></i>
              </button>
              </div>
              <div v-else class="content-details fadeIn-bottom">
                <button class="btn eye">
                  <i class="fa fa-eye fa-2x" title="View Keep" @click="updateKeepViews(keep)" data-toggle="modal" data-target="#keep-view"
                    aria-hidden="true"></i>
                </button>
                <button class="btn check">
                  <i class="fa fa-check fa-2x" title="Add Keep To A Vault" data-toggle="modal" data-target="#login" aria-hidden="true"></i>
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
    name: 'Home',
    data() {
      return {
        login: {
          email: '',
          password: ''
        },
        search:''
      }
    },
    components: {

    },
    mounted() {
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getKeeps', { resource: "keeps" })

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
      activeKeep() {
        return this.$store.state.activeKeep
      }
    },
    methods: {
      submitLogin() {
        this.$store.dispatch('login', this.login)
        this.login = {
          email: '',
          password: ''
        }
      },
      findKeepsBy(){
        debugger
        this.$store.dispatch('findKeeps', {resource: "keeps", data: this.search})
      },
      getKeeps() {
        debugger
        this.$store.dispatch('getKeeps', {
          resource: "keeps",
        })
      },
      hoverHandle(id) {
        this.$store.dispatch('getKeep', { resource: "keeps", id: id })
        this.$store.dispatch('getVaults', { resource: 'vaults', id: this.activeUser.id })
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
        this.$store.dispatch('updateKeep', { resource: "keeps", endpoint: this.activeKeep.id, keep: this.activeKeep })
      },
      updateKeepViews(keep) {
        debugger
        keep.viewed++
        var updatedKeep = {
          name: keep.name,
          imageUrl: keep.imageUrl,
          userId: keep.userId,
          keepCount: keep.keepCount,
          viewed: keep.viewed,
          public: keep.public
        }
        this.$store.dispatch('updateKeep', { resource: "keeps", endpoint: keep.id, keep: updatedKeep })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .share-btn{
    margin-bottom:10em;
    background-color:rgba(140, 140, 153, 0.801);
    color:rgba(245, 245, 245, 0.445);
  }
  .eye{
    margin-bottom:10em;
    background-color:rgba(134, 226, 233, 0.521)
  }
  .check{
    margin-bottom:10em;
    background-color:rgba(233, 150, 122, 0.493)
  }
  .search-btn{
    background-color:rgba(0, 0, 0, 0.479)
  }
  .search-btn i{
    color:rgba(255, 255, 255, 0.678);
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
  .container .title{
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

  .content-details h2 {
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