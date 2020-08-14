<template>
  <b-container>
    <div class="header home-header">
      <div class="row cb all" style="padding-top: 2vh; margin:0;">
        <div>
          <a href="#" style="text-decoration: none;">
            <b-img
              :src="require('@/assets/img/logo.png')"
              class="pic-style"
            />
          </a>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>

export default {
  name: 'Header',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  /* @media only screen 
    and (max-width: 498px) 
    and (orientation: portrait) 
    and (-webkit-min-device-pixel-ratio: 1) {

    .home-header {
      height: 5vh;
      
    }
    .pic-style {
      height: 2vh; 
      width: 20vw;
    }
  
  }
  @media only screen 
    and (min-width: 498px) 
    and (max-width: 600px) 
    and (orientation: portrait) 
    and (-webkit-min-device-pixel-ratio: 1) {

    .home-header {
      height: 5vh;
      
    }
    .pic-style {
      height: 2.5vh; 
      width: 18vw;
    }
   
  }
  @media only screen 
    and (min-width: 600px) 
    and (max-width: 768px) 
    and (orientation: portrait) 
    and (-webkit-min-device-pixel-ratio: 1) {

    .home-header {
      height: 6vh;
      
    }
    .pic-style {
      height: 2.5vh; 
      width: 16vw;
    }

  
  }
  @media only screen 
    and (min-width: 768px) 
    and (max-width: 1026px) 
    and (orientation: portrait) 
    and (-webkit-min-device-pixel-ratio: 1) {

    .home-header {
      height: 8vh;
      
    }
    .pic-style {
      height: 3vh; 
      width: 12vw;
    }

 
  }
  @media only screen 
    and (min-width: 1026px) 
    and (max-width: 1280px) 
    and (-webkit-min-device-pixel-ratio: 1) {

    .home-header {
      height: 6vh;
      
    }
    .pic-style {
      height: 3.5vh; 
      width: 9vw;
    }
  }
  @media only screen 
    and (min-width: 1280px)
    and (max-width: 1500px)  
    and (-webkit-min-device-pixel-ratio: 1) {

    .home-header {
      height: 8vh;
      
    }
    .pic-style {
      height: 2.6vh; 
      width: 6vw;
    }
   
   
  }
  @media only screen 
    and (min-width: 1500px)
    and (max-width: 1750px)  
    and (-webkit-min-device-pixel-ratio: 1){

    .home-header {
      height: 10vh;
      
    }
    .pic-style {
      height: 3.5vh; 
      width: 8vw;
    }
   
 
  }
  @media only screen 
    and (min-width: 1750px)  
    and (-webkit-min-device-pixel-ratio: 1){

    .home-header {
      height: 10vh;
      
    }
    .pic-style {
      height: 3.5vh; 
      width: 8vw;
    }
   
  
  } */
  @media only screen 
    and (min-width: 780px) 
    and (-webkit-min-device-pixel-ratio: 1) {
    .home-header {
      height: 10vh;
      min-width: 950px;
      /* position: absolute; */
    }
  }
  .home-header {
    height: 10vh;
    /* min-width: 950px; */
    /* position: absolute; */
  }
  .pic-style {
    /* height: 3.5vh;  */
    /* width: 6.5vw; */
    width: 80px;
  }
  .header {
    left: 0;
    top: 0;
    right: 0;
    padding: 2vw;
    z-index: 100;
    background-color: transparent;
  }
  
</style>
