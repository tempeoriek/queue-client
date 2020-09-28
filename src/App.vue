<template>
  <div id="app" :style="background">

    <!-- app -->
    <div>
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: 'App',
  components: {
    Header,
  },
  data () {
    return {
      background: {
        backgroundImage: `url(${require('@/assets/img/background.png')})`,
      }
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Basic Sans', 'Regular', 'sans-serif';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: 444444;
    background-color: #F5F5F5;
    position:absolute; 
    overflow-x: auto; 
    overflow-y: auto; 
    /* overflow: auto;  */
    width:100%; 
    height:100%;
  }

  div::before {
    opacity:.50; 
  }
  /* @media only screen 
    and (max-width: 496px) 
    and (orientation: portrait) 
    and (-webkit-min-device-pixel-ratio: 1) {
    .modal-dialog-centered {
        min-height: calc(100% - 3.5rem);
    }
    .modal-dialog {
      max-width: 70vw;
      margin: 1.75rem auto;
    }
  }
  @media only screen 
    and (min-width: 498px) {
    .modal-dialog-centered {
      min-height: calc(100% - 3.5rem);
    }
    .modal-dialog {
      max-width: 50vw;
      margin: 1.75rem auto;
    }
  } */

  .modal-backdrop {
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  .modal-content {
    border-radius: 3vmin !important;
  }
  .modal-header.close {
    padding: 1rem 1rem;
    margin: -1rem -1rem -1rem;
  }
  .modal-title {
    margin-bottom: 0;
    line-height: 1.5;
    text-align: center;
    width: 100%;
  }
  
  /* BASE STANDART */
  .bs {
    border: 0.2vmin solid grey;
    border-radius: 1vmin;
  }
  .fs {
    height: 100vh;
    width: 100vw;
  }

  .cb {
    display: flex;
  }
  .cb.all {
    justify-content: center;
    align-items: center;
  }
  .cb.vertical {
    align-items: center
  }
  .cb.horizontal {
    justify-content: center;
  }
  .cb.between {
    justify-content: space-between;
  }
  .cb.around {
    justify-content: space-around;
  }
  .cb.row {
    flex-direction: row;
  }
  .cb.top {
    align-items: flex-start;
  }
  .cb.bottom {
    align-items: flex-end;
  }
  .cb.left {
    justify-content: flex-start;
  }
  .cb.right {
    justify-content: flex-end;
  }
</style>
