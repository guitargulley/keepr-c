<template>
    <div class="home container-fluid text-center">
        <h1>WELCOME TO GREGZ LIZT!</h1>
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
  
      },
      computed: {
        activeUser() {
          return this.$store.state.activeUser
        }
      },
      methods: {
        
      }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
    
  </style>