<template>
  <b-container>
    <div class="desktop-container">
      <b-row class="cb all" style="margin-top: 5vh;" v-if="loading">
        <b-spinner variant="dark" type="grow" label="Spinning"></b-spinner>
      </b-row>
      <b-row class="cb all" style="margin-top: 5vh;" v-else-if="msg">
        {{msg}}
      </b-row>

      <b-row style="margin-top: 2vh;" v-else>
        <b-col class="cb all content-container">
          <b-img
          :src="require('@/assets/img/sample.png')"
          fluid
          class="pic-style"
        />
        </b-col>
        <b-col class="content-container" style="color: #777774; margin-top: 2vh;">
          
          <b-row>
            <b-col class="cb vertical default-set">
              <a style="font-size: 3vmin; color: #444444; display: contents;">THANK YOU!</a> <br>
              this confirm that your reservation form has been successfully submitted <br>
              We've send a confirmation email to <b style="display: contents;">{{email}}</b>
            </b-col>
          </b-row>
          
          <b-row  style="padding-top: 3vh;">
            <b-col class="cb vertical default-set">
              Your queue number <br>
              <a style="font-size: 4vmin; color: #C3A97F; display: contents;">{{queue_num}}</a>
            </b-col>
          </b-row>

          <div class="row box-container">
            <div class="col-4 card-left cb all text-center card-left-text">
              {{day}}<br>
              <p style="display: contents; font-size: 6vmin; margin: -1.5vh 0;">{{day_number}}</p><br>
              {{month}}<br>
              ________<br>
              {{time}}
            </div>
            <div class="card-mid"></div>
            <div class="cb vertical col-7 card-right card-right-text">
              <b style="display: contents;">Kumulo Place, The Breeze BSD</b> <br>
              Eunoia x Tea Label Unit 12<br>
              The Breeze BSD City<br>
              Unit Lake Level / 77A&Outdoor<br>
              BSD Green Office Park, BSD City<br>
              Tangerang 15345
            </div>
          </div>

          <b-row >
            <b-col class="cb vertical default-set">
              Terms and conditions. <br>
              - One queue number only valid for one person <br>
              - One user only allowed to make one reservation. <br>
              - This queue number is non-transferable. <br>
              - Changes and Cancelation of booking date are not permitted. <br>
              - Please bring your ID card (KTP) at the time of admission. <br>
              - Eunoia has the right to refuse your attendance without any valid ID card.
            </b-col>
          </b-row>
      
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
// import moment from 'moment'

import Queue from '@/api/QueueApi'

export default {
  name: 'Thank-You',
  data () {
    return {
      loading: true,
      data : this.$route.query.data,
      msg: null,
      day_number: null,
      email: null,
      day: null,
      month: null,
      time: null,
      queue_num: null,
    }
  },
  created () {
    let self = this
    const promiseDay = self.loadDay()

    Promise.all([promiseDay]).then(() => {
      console.log(`done`)
    })
  
  },
  methods: {
     loadDay: async function () {
      let res = await Queue.fetch({_id: this.data})
      const promise = new Promise((resolve) => {

        if (res.data.queue) {
          this.day = res.data.queue.day
          this.day_number = res.data.queue.day_number
          this.month = res.data.queue.month
          this.time = res.data.queue.time
          this.email = res.data.queue.email
          this.queue_num = res.data.queue.queue_number
          
          this.msg = null
          this.loading = false
        } else {
          this.msg = res.data.msg
          this.loading = false
        }
        resolve()
      });
      Promise.resolve(promise);
    },
  }
}
</script>

<style scoped>
  .content-container {
    padding-top: 8vh;
  }
  .pic-style {
    height: 450px;  
    width: 400px;
  }
  .box-container {
    /* width: 35vw; */
    min-width: 30vw;
    padding: 1.5vw;
  }
  .card-left {
    border-bottom: 0.2vmin solid grey; 
    border-left: 0.2vmin solid grey; 
    border-top: 0.2vmin solid grey; 
    padding: 2vw;
  }
  .card-right {
    max-width: 30vw; 
    border-bottom: 0.2vmin solid grey; 
    border-right: 0.2vmin solid grey; 
    border-top: 0.2vmin solid grey; 
    padding: 2vw;
  }
  .card-mid {
    height: 24vh;
    margin: 3vh 0; 
    padding: 0; 
    max-width: 0.1vw;
    
    border-left: 0.2vmin solid grey; 
  }
  .default-set {
    font-size: 1.5vmin; 
  }
  .card-right-text {
    font-size: 1.5vmin; 
  }
  .card-left.inside {
    margin: -2vh 0;
  }
  .card-left-text {
    font-size: 2vmin; 
  }
  @media screen 
    and (max-width: 429px) {
    .content-container {
      padding-top: 2vh;
    }
    .pic-style {
      height: 85%; 
      width: 100%;
    }
    .box-container {
      /* width: 35vw; */
      min-width: 30vw;
      padding: 1.5vw;
    }
    .card-left {
      border-bottom: 0.2vmin solid grey; 
      border-left: 0.2vmin solid grey; 
      border-top: 0.2vmin solid grey; 
      height: 12vh;
      padding: 1vw;
    }
    .card-right {
      max-width: 30vw; 
      border-bottom: 0.2vmin solid grey; 
      border-right: 0.2vmin solid grey; 
      border-top: 0.2vmin solid grey; 
      height: 12vh;
      padding: 2vw;
    }
    .card-mid {
      height: 10vh;
      margin: 1vh 0; 
      padding: 0; 
      max-width: 0.1vw;
      
      border-left: 0.2vmin solid grey; 
    }
    .default-set {
      font-size: 1.5vmin; 
    }
    .card-right-text {
      font-size: 1.5vmin; 
    }
    .card-left-text {
      font-size:1.2vmin; 
    }
  }
  @media screen 
    and (min-width: 421px)
    and (max-width: 780px) {
    .content-container {
      padding-top: 2vh;
    }
    .pic-style {
      height: 85%; 
      width: 100%;
    }
    .box-container {
      /* width: 35vw; */
      min-width: 30vw;
      padding: 1.5vw;
    }
    .card-left {
      border-bottom: 0.2vmin solid grey; 
      border-left: 0.2vmin solid grey; 
      border-top: 0.2vmin solid grey; 
      height: 18vh;
      padding: 1vw;
    }
    .card-right {
      max-width: 30vw; 
      border-bottom: 0.2vmin solid grey; 
      border-right: 0.2vmin solid grey; 
      border-top: 0.2vmin solid grey; 
      height: 18vh;
      padding: 2vw;
    }
    .card-mid {
      height: 14vh;
      margin: 2vh 0; 
      padding: 0; 
      max-width: 0.1vw;
      
      border-left: 0.2vmin solid grey; 
    }
    .default-set {
      font-size: 1.5vmin; 
    }
    .card-right-text {
      font-size: 1.2vmin; 
    }
    .card-left-text {
      font-size:1.2vmin; 
    }
  }
  @media screen 
    and (min-width: 780px) 
    and (-webkit-min-device-pixel-ratio: 1) {
   
    .content-container {
      padding-top: 8vh;
    }
    .pic-style {
      height: 450px;  
      width: 400px;
    }
    .box-container {
      /* width: 35vw; */
      min-width: 30vw;
      padding: 1.5vw;
    }
    .card-left {
      border-bottom: 0.2vmin solid grey; 
      border-left: 0.2vmin solid grey; 
      border-top: 0.2vmin solid grey; 
      padding: 2vw;
    }
    .card-right {
      max-width: 30vw; 
      border-bottom: 0.2vmin solid grey; 
      border-right: 0.2vmin solid grey; 
      border-top: 0.2vmin solid grey; 
      padding: 2vw;
    }
    .card-mid {
      height: 24vh;
      margin: 3vh 0; 
      padding: 0; 
      max-width: 0.1vw;
      
      border-left: 0.2vmin solid grey; 
    }
    .default-set {
      font-size: 1.5vmin; 
    }
    .card-right-text {
      font-size: 1.5vmin; 
    }
    .card-left.inside {
      margin: -2vh 0;
    }
    .card-left-text {
      font-size: 2vmin; 
    }
  }
</style>
