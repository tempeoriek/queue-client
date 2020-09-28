<template>
  <b-container >
    <div class="desktop-container" v-if="start_now">
      <!-- TITLE -->
      <b-row class="title-container">
        <b-col class="cb all">
          <p class="title-text" style="color: #777774;">Tea Label & Eunoia Store at Kumulo BSD</p>
        </b-col>
      </b-row>

      <!-- MONTH -->
      <b-row style="padding: 1.5vh 0 0">
        <b-col class="cb all">
          <p class="month-text">{{name_month}}</p>
        </b-col>
      </b-row>

      <!-- CHOOSE DAYS -->
      <div class="row cb horizontal">
        <div class="cb all day-set-circle" v-for="(pick_day, index) in pick_day" :key="index">
          <b-button class="circle" v-bind:style=pick_day.style :pressed.sync="pick_day.pressed" @click="chooseDay(pick_day)">
            <p class="in-circle">{{pick_day.date}}</p>
          </b-button>
        </div>
      </div>

      <div class="row cb horizontal">
        <div class="day-set-circle" v-for="(pick_day, index) in pick_day" :key="index">
          <div>
            <p class="cb all day-set">{{pick_day.day}}</p>
            <p class="cb all day-set" v-if="pick_day.vip">
              <b-img
                :src="require('@/assets/img/vip.png')"
                class="pic-style"
              />
            </p>
          </div>
        </div>
      </div>
      
      <hr style="width: 80%;">

      <!-- CHOOSE DATES -->
      <div v-if="loading" class="cb all">
        <b-spinner variant="dark" type="grow" label="Spinning"></b-spinner>
      </div>

      <div v-else>
        <div class="row cb all date-container" v-for="index in col_date" :key="index">
          <b-button v-bind:class="(pick_date[j-1+(5*(index-1))]) ? `btn-date` : `none-btn`" 
            v-bind:style="(pick_date[j-1+(5*(index-1))]) ? pick_date[j-1+(5*(index-1))].style  : null"
            @click="chooseDate(pick_date[j-1+(5*(index-1))])" 
            :disabled="(pick_date[j-1+(5*(index-1))]) ? (pick_date[j-1+(5*(index-1))].qty == 0) ? true : false : null"  
            v-for="j in 5" 
            :key="j"
          >
            <p class="cb all text-date time" 
              v-if="(pick_date[j-1+(5*(index-1))]) ? day_times = `${pick_date[j-1+(5*(index-1))].start_time} - ${pick_date[j-1+(5*(index-1))].end_time}` : day_times = null"
              v-bind:style="(pick_date[j-1+(5*(index-1))]) ? ((pick_date[j-1+(5*(index-1))].pressed)) ? `font-weight: bold` : `font-weight: 400` : null"
            >
            {{day_times}}
            </p>
            
            <p class="cb all text-date qty" 
              v-bind:style="(pick_date[j-1+(5*(index-1))].pressed) ? `color: white` :(pick_date[j-1+(5*(index-1))].qty > 2) ? `color: green;` : (pick_date[j-1+(5*(index-1))].qty == 0) ? `color: black` : `color: red`" 
              v-if="(pick_date[j-1+(5*(index-1))]) ? (pick_date[j-1+(5*(index-1))].qty > 2) ? qty = `Still Available` : (pick_date[j-1+(5*(index-1))].qty == 0) ? qty = `Fully Booked` : qty = `${pick_date[j-1+(5*(index-1))].qty} Spot left` : qty = null"
            >
                {{qty}}
            </p>
          </b-button>
        </div>
        
        <hr style="width: 80%;">

        <b-row class="cb all term-title-style">
          TERMS AND CONDITIONS
        </b-row>

        <hr style="width: 5%; border: 1.5px solid !important;">

        <b-row class="cb all term-body-style">
          By completing and submitting this form, you agree to our terms and conditions. <br>
          - One queue number only valid for one person <br>
          - One user only allowed to make one reservation. <br>
          - This queue number is non-transferable. <br>
          - Changes and Cancelation of booking date are not permitted. <br>
          - Please bring your ID card (KTP) at the time of admission. <br>
          - Eunoia has the right to refuse your attendance without any valid ID card.
        </b-row>

        <b-row style="padding-top: 4vh; margin-bottom: 2vh;" v-if="!loading">
          <b-col class="cb all">
            <!-- SETTING VIP -->
            <b-button class="btn-book home" v-b-modal="`modal-center-vip`" @click="validateChoosenDate()" v-if="is_vip">Book now</b-button>
            <b-button class="btn-book home" v-b-modal="`modal-center-guest`" @click="validateChoosenDate()" v-else>Book now</b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <div v-else>
      <b-row>
        <b-col class="cb all" style="color: #777774; height: 50vh; font-size: 3vw;">
          We have not open yet !          
        </b-col>
      </b-row>
    </div>


    <!-- MODAL LOGIN -->
    <b-modal id="modal-center-vip" 
      centered 
      hide-footer
      header-class="border-bottom-0" 
      footer-class="border-top-0" 
      @hidden="closeModal()">
        <template v-slot:modal-title>
          <div v-if="msg_validation">
            <b-img
              :src="require('@/assets/img/bell.svg')"
              class="pic-style"
            /> <br>
            <p class="text-title-modal">OOPSIE!</p>
          </div>
          <div v-else style="font-weight: bold;">
            BOOK AS A MEMBER
          </div>
        </template>

        <b-form @submit="onSubmitVip" style="margin: 0 4vw;" v-if="!msg_validation">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="input-box"
            :state="validationEmail"
            required
          >
          </b-form-input>  
      
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="input-box bottom"
            :state="validationPassword"
            required
          >
          </b-form-input>  
          <b-form-input
            id="input-3"
            v-model="form.ktp"
            type="number"
            placeholder="ID Card"
            class="input-box bottom"
            :state="validationKTP"
            required
          >
          </b-form-input>  

          <div v-if="(this.email_validation === false)">
            <b-form-invalid-feedback :state="validationEmail">
              Example: eunoia@eunoia.com.
            </b-form-invalid-feedback>
          </div>
          <div v-else-if="(this.password_validation === false)">
            <b-form-invalid-feedback :state="validationPassword">
              Your password not long enough
            </b-form-invalid-feedback>
          </div>
          <div v-else-if="(this.ktp_validation === false)">
            <b-form-invalid-feedback :state="validationKTP">
              Your ID Card not long enough
            </b-form-invalid-feedback>
          </div>
          
          <div class="row" style="margin: 1.5vh 0">
            <div>
              <b-button class="btn-book in-modal"  type="submit" :disabled=bookdisabled>
                Book Now
              </b-button>
            </div>
            <div class="cb vertical" style="margin-left: 1vw;">
              <b-spinner variant="dark" type="grow" label="Spinning" v-if="bookdisabled"></b-spinner>
            </div>
          </div>
        </b-form>

        <div v-else>
          <div class="cb all text-center">{{msg_validation}}</div>
          <div class="cb all">
            <b-button 
              class="btn-book in-modal" 
              style="margin: 3vh 0;"
              @click="$bvModal.hide(`modal-center-vip`)"
            >
              OK
            </b-button>  
          </div>
        </div>
    </b-modal>

    <!-- MODAL GUEST -->
    <b-modal id="modal-center-guest" 
      centered 
      hide-footer
      no-stacking
      header-class="border-bottom-0" 
      footer-class="border-top-0" 
      @hidden="closeModal()">
        <template v-slot:modal-title>
          <div v-if="msg_validation">
            <b-img
              :src="require('@/assets/img/bell.svg')"
              class="pic-style"
            /> <br>
            <p class="text-title-modal">OOPSIE!</p>
          </div>
          <div v-else style="font-weight: bold;">
            BOOK AS GUEST
          </div>
        </template>

        <b-form @submit="onSubmitGuest" style="margin: 0 4vw;" v-if="!msg_validation">
          <b-form-input
            id="input-3"
            v-model="form.first_name"
            type="text"
            placeholder="First Name"
            class="input-box"
            required
          >
          </b-form-input>  
          
          <b-form-input
            id="input-4"
            v-model="form.last_name"
            type="text"
            placeholder="Last Name"
            class="input-box bottom"
            required
          >
          </b-form-input>  

          <b-form-input
            id="input-5"
            v-model="form.phone"
            type="number"
            placeholder="Phone"
            class="input-box bottom"
            required
          >
          </b-form-input>  

          <b-form-input
            id="input-6"
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="input-box bottom"
            required
            :state="validationEmail"
          >
          </b-form-input>

          <b-form-input
            id="input-6"
            v-model="form.ktp"
            type="number"
            placeholder="ID Card"
            class="input-box bottom"
            required
          >
          </b-form-input>  
          
          <div v-if="(this.email_validation === false)">
            <b-form-invalid-feedback :state="validationEmail">
              Example: eunoia@eunoia.com.
            </b-form-invalid-feedback>
          </div>
          <div v-else-if="(this.ktp_validation === false)">
            <b-form-invalid-feedback :state="validationKTP">
              Your ID Card not long enough
            </b-form-invalid-feedback>
          </div>
          
          <div class="row" style="margin: 1.5vh 0">
            <div>
              <b-button class="btn-book in-modal"  type="submit" :disabled=bookdisabled>
                Book Now
              </b-button>
            </div>
            <div class="cb vertical" style="margin-left: 1vw;">
              <a class="cb all" style="font-size: 1.5vmin; color: #C3A97F;"  v-b-modal.modal-center-vip>Have an a account?</a>
            </div>
            <div class="cb vertical" style="margin-left: 1vw;">
              <b-spinner variant="dark" type="grow" label="Spinning" v-if="bookdisabled"></b-spinner>
            </div>
          </div>
        </b-form>

        <div v-else>
          <div class="cb all text-center">{{msg_validation}}</div>
          <div class="cb all">
            <b-button class="btn-book in-modal" style="margin: 3vh 0;" @click="$bvModal.hide(`modal-center-guest`)">OK</b-button>  
          </div>
        </div>
    </b-modal>

  </b-container>
</template>

<script>
// import moment from 'moment'

import Queue from '@/api/QueueApi'
import Day from '@/api/DayApi'
import Time from '@/api/TimeApi'

import moment from 'moment'
import router from '@/router'

export default {
  name: 'Home',
  data () {
    return {
      col_date: 0,
      date_key: null,
      name_month: null,

      headerTextVariant: "warning",

      pick_day: [],
      pick_date : [],

      start_now: true,
      times: null,
      days: null,
      //SETTING VIP
      // is_vip: true,
      is_vip: false,
      bookdisabled: false,
      loading: true,

      email_validation: null,
      password_validation: null,
      ktp_validation: null,
      msg_validation: null,

      form: {
        email: '',
        password: '',
        ktp: '',
        first_name: '',
        last_name: '',
        phone: '',
      },
    }
  },
  created () {
    const self = this
    const promiseStart = self.loadStart()
    const promiseDay = self.loadDay()

    Promise.all([promiseStart, promiseDay]).then(() => {
      self.loadDate();
    })
  },
  computed: {
    validationEmail() {
      // this.email_validation = (this.form.email) ? this.validEmail(this.form.email) : null;
      return (this.form.email) ? this.validEmail(this.form.email) : null;
    },
    validationPassword() {
      // this.password_validation = (this.form.password) ? this.validPassword(this.form.password) : null;
      return (this.form.password) ? this.validPassword(this.form.password) : null;
    },
    validationKTP() {
      // this.password_validation = (this.form.password) ? this.validPassword(this.form.password) : null;
      return (this.form.ktp) ? this.validKTP(this.form.ktp) : null;
    }
  },
  methods: {
    loadStart: async function () {
      let dateStr = '2020-08-07', //set
      timeStr = '13:00',
      date = moment(dateStr),
      time = moment(timeStr, 'HH:mm'),
      today = moment().format(`YYYY-MM-DDTHH:mm`)
      date.set({
        hour:   time.get('hour'),
        minute: time.get('minute'),
        second: time.get('second')
      });

      if (!moment(today).isSameOrAfter(date)) {
        this.start_now = false
      } else {
        this.start_now = true
      }
    },

    loadDay: async function () {
      let self = this
      let res = await Day.fetch()
      console.log(`temptoday: ${res.data.temptoday}`)
      console.log(`date: ${res.data.date}`)
      console.log(`tommorrow: ${res.data.tommorrow}`)
      console.log(`test: ${res.data.test}`)
      const data = new Promise((resolve) => {
        res.data.day.forEach((day) => {
          //SETTING VIP
          if (res.data.day[0].id == day.id) {
            self.date_key = day.id
            self.days = day.id
            if (day.vip) {
              self.is_vip = day.vip
            }
          } 
          self.pick_day.push(day)
        });
        self.name_month = self.pick_day[0].month;
        resolve()
      });
      Promise.resolve(data);
    },
    loadDate: async function () {
      let self = this

      self.pick_date.length = 0;
      self.times = null;
      
      let res = await Time.fetch({ day: self.date_key})
      res.data.time.forEach((tm) => {
        self.pick_date.push(tm);
      });

      let temp = self.pick_date.length/5;
      self.col_date = (parseInt(temp) < temp) ? parseInt(temp) + 1 : parseInt(temp)
      self.loading = false
    },

    closeModal() {
      this.form = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: ''
      };
      this.bookdisabled = false
    },
    onSubmitVip: async function (evt) {
      evt.preventDefault()
      let data = this.form
      this.bookdisabled = true

      if (this.times && this.days) {
        let res = await Queue.bookVip({
          day: this.days, 
          time: this.times,   
          email: data.email.toLowerCase(),
          password: data.password,
          ktp: data.ktp,
          is_vip: this.is_vip
        });

        if (res.data.queue) {
          this.msg_validation = null
          router.push({ path: `thank-you`, query: {data: res.data.queue._id} })
          this.bookdisabled = false
        } else {
          this.bookdisabled = false
          this.msg_validation = res.data.msg
        }
      } else {
        this.bookdisabled = false
        console.log(`please pick the time`)
      }
    },
    onSubmitGuest: async function (evt) {
      evt.preventDefault()
      let data = this.form
      this.bookdisabled = true

      if (this.times && this.days) {
        let res = await Queue.bookGuest({
          day: this.days, 
          time: this.times,   
          email: data.email.toLowerCase(),
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          ktp: data.ktp
        });

        if (res.data.queue) {
          this.msg_validation = null
          this.bookdisabled = false
          this.$router.push({ path: `thank-you`, query: {data: res.data.queue._id} })
        } else {
          this.msg_validation = res.data.msg
          this.bookdisabled = false
        }
      } else {
        this.bookdisabled = false
        console.log(`please pick the time`)
      }
    },
    validEmail: function (email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      this.email_validation = (this.form.email) ? re.test(email) : null;
      return re.test(email)
    },
    validPassword: function (password) {
      let re = (password.length > 4) ? true : false
      this.password_validation = (this.form.password) ? re : null;
      return re
    },
    validKTP: function (ktp) {
      let re = (ktp.length > 4) ? true : false
      this.ktp_validation = (this.form.ktp) ? re : null;
      return re
    },
    validateChoosenDate: function () {
      if (!this.times || !this.days) {
        this.msg_validation = `Sorry, you haven't choose date yet`
      } else {
        this.msg_validation = null
      }
    },
    
    chooseDay: function (param) {
      const self = this
      self.days = param.id
      self.is_vip = param.vip
      self.loading = true

      self.pick_day.forEach(async (day) => {
        if (day.id == param.id) {
          day.pressed = true
          day.style = {backgroundColor: `black`, color: `white`}

          self.date_key = day.id
          self.loadDate()
          
        } else {
          day.pressed = false
          day.style = {backgroundColor: `white`, color: `black`}
        }
      });
    },
    chooseDate: async function (param) {
      this.times = param.id

      this.pick_date.forEach((date) => {
        if (date.id == param.id) {
          date.pressed = true
          date.style = {backgroundColor: `black`, color: `white`}
        } else {
          date.pressed = false
          date.style = {backgroundColor: `white`, color: `black`}
        }
      });
    }
  }
}
</script>

<style scoped>
  .title-container {
    padding: 4vh 0 0;
  }
  .title-text {
    /* font-size: 1.5vw;  */
    font-size: 14px; 
    text-align: center;
  }
  .month-text {
    /* font-size: 1.5vw;  */
    font-size: 13px; 
    color: #444444
  }
  .pic-style {
    width: 33px;
  }
  .btn-date {
    background-color: white; 
    color: black; 
    
    /* height: 7vh;  */
    width: 12%; 
    margin: 1vh 1vw;
    
    border-radius: 4vmin; 
    border: 0.2vmin solid grey; 
  }
  .date-container {
    margin-top: 1.5vh;
  }
  .day-set {
    margin: 1vh 0;
    font-size: 10px;
    /* font-size: 1.8vmin; */
  }
  .day-set-circle {
    margin: 0 -2px;
    -webkit-box-flex: 0;
    flex: 0 0 5%;
    max-width: 8.333333%;
  }
  .btn-book {
    background-color: white; 
    color: black; 
    border: 0.2vmin solid grey; 
    border-radius: 4vmin; 
    font-size: 12px;
  }
  .btn-book.home {
    /* width: 126px; */
    height: 47px; 
    width: 12%; 
  }
  .btn-book.in-modal {
    width: 8vw;
  }
  .circle{
    position:relative;
    width:60%;
    height:50%;
    padding-bottom:50%;
    background:white;
    border-radius:50%;
    border: 0.5px solid grey;
    margin: 0;
    color: black
  }
  .in-circle{
    position:absolute;
    top:50%; left:50%;
    transform: translate(-50%, -50%);
    margin:0;
  }

  .input-box {
    border-radius: 1vmin; 
    height: 4.5vh;
    font-size: 1.5vmin;
  }
  .input-box.bottom {
    margin-top: 1.5vh;
  }
  .text-date {
    height: 54%; 
    margin: 0;
  }
  .text-date.time {
    font-size: 11px;
    /* font-size: 0.7vw; */
  }
  .text-date.qty {
    font-size: 9px;
  }
  .term-title-style {
    color: #6A0000;
    font-size: 12px;
    font-weight: bold;
  }
  .term-body-style {
    font-size: 11px;
  }
  .text-title-modal {
    color: #DC9628;
    font-weight: bold;
    margin: 0;
  }
  .none-btn {
    display: none;
  }
  @media screen and (max-width: 429px){
    .title-container {
      padding: 0.5vh 0 0;
    }
    .title-text {
      font-size: 12px; 
      text-align: center;
    }
    .month-text {
      font-size: 12px; 
      color: #444444
    }
    .pic-style {
      width: 21px;
    }
    .day-set {
      margin-bottom: 0 0.7vh;
      font-size: 9px;
    }
    .day-set-circle {
      margin: 0 0.6vw 1vh;
      -webkit-box-flex: 0;
      flex: 0 0 6%;
      max-width: 8.333333%;
    }
    .btn-book {
      background-color: white; 
      color: black; 
      border: 0.2vmin solid grey; 
      border-radius: 4vmin; 
      font-size: 2vmin;
    }
    .btn-book.home {
      height: 3.8vh; 
      width: 25%; 
    }
    
    .btn-date {
      background-color: white; 
      color: black; 
      
      width: 18%; 
      margin: 0.5vh 0.5vw;
      
      border-radius: 4vmin; 
      border: 0.2vmin solid grey; 
    }
    .text-date {
      height: 54%; 
      margin: 0;
    }
    .text-date.time {
      /* font-size: 5px; */
      font-size: 1.3vmin;
    }
    .text-date.qty {
      /* font-size: 5px; */
      font-size: 1.3vmin;
    }

    .btn-book.in-modal {
      width: 18vw;
    }
    .date-container {
      margin-top: 0.5vh;
    }

    .circle{
      position:relative;
      width:60%;
      height:50%;
      padding-bottom: 2.5vh;
      background:white;
      border-radius:50%;
      border: 0.5px solid grey;
      margin: 0;
      color: black
    }
    .in-circle{
      position:absolute;
      top:50%; left:50%;
      transform: translate(-50%, -50%);
      margin:0;
      font-size: 12px;
    }

    .input-box {
      border-radius: 1vmin; 
      height: 4.5vh;
      font-size: 1.5vmin;
    }
    .input-box.bottom {
      margin-top: 1.5vh;
    }
    
    .term-title-style {
      color: #6A0000;
      font-size: 1.5vmin;
      font-weight: bold;
      margin: 0;
    }
    .term-body-style {
      margin: 0;
      font-size: 1.2vmin;
    }
  }
  @media screen 
    and (min-width: 429px)
    and (max-width: 780px) {
    .title-container {
      padding: 0.5vh 0 0;
    }
    .title-text {
      font-size: 12px; 
      text-align: center;
    }
    .month-text {
      font-size: 12px; 
      color: #444444
    }
    .pic-style {
      width: 21px;
    }
    .day-set {
      margin-bottom: 0 0.7vh;
      font-size: 9px;
    }
    .day-set-circle {
      margin: 0 0.6vw 1vh;
      -webkit-box-flex: 0;
      flex: 0 0 6%;
      max-width: 8.333333%;
    }
    .btn-book {
      background-color: white; 
      color: black; 
      border: 0.2vmin solid grey; 
      border-radius: 4vmin; 
      font-size: 10px;
    }
    .btn-book.home {
      height: 4vh; 
      width: 20%; 
    }
    
    .btn-date {
      background-color: white; 
      color: black; 
      
      width: 18%; 
      margin: 0.5vh 0.5vw;
      
      border-radius: 4vmin; 
      border: 0.2vmin solid grey; 
    }
    .text-date {
      height: 54%; 
      margin: 0;
    }
    .text-date.time {
      /* font-size: 5px; */
      font-size: 1.3vmin;
    }
    .text-date.qty {
      /* font-size: 5px; */
      font-size: 1.2vmin;
    }

    .btn-book.in-modal {
      width: 15vw;
    }
    .date-container {
      margin-top: 0.5vh;
    }

    .circle{
      position:relative;
      width:60%;
      height:50%;
      padding-bottom: 2vh;
      background:white;
      border-radius:50%;
      border: 0.5px solid grey;
      margin: 0;
      color: black
    }
    .in-circle{
      position:absolute;
      top:50%; left:50%;
      transform: translate(-50%, -50%);
      margin:0;
      font-size: 12px;
    }

    .input-box {
      border-radius: 1vmin; 
      height: 4.5vh;
      font-size: 1.5vmin;
    }
    .input-box.bottom {
      margin-top: 1.5vh;
    }
    
    .term-title-style {
      color: #6A0000;
      font-size: 1.5vmin;
      font-weight: bold;
      margin: 0;
    }
    .term-body-style {
      margin: 0;
      font-size: 1.2vmin;
    }
  }
  @media screen 
    and (min-width: 780px) 
    and (-webkit-min-device-pixel-ratio: 1){
    .desktop-container {
      min-width: 950px; 
      min-height: 600px;
    }
    .title-container {
      padding: 4vh 0 0;
    }
    .title-text {
      /* font-size: 1.5vw;  */
      font-size: 14px; 
      text-align: center;
    }
    .month-text {
      /* font-size: 1.5vw;  */
      font-size: 13px; 
      color: #444444
    }
    .pic-style {
      width: 33px;
    }
    .btn-date {
      background-color: white; 
      color: black; 
      
      /* height: 7vh;  */
      width: 12%; 
      margin: 1vh 1vw;
      
      border-radius: 4vmin; 
      border: 0.2vmin solid grey; 
    }
    .date-container {
      margin-top: 1.5vh;
    }
    .day-set {
      margin: 1vh 0;
      font-size: 10px;
      /* font-size: 1.8vmin; */
    }
    .day-set-circle {
      margin: 0 -2px;
      -webkit-box-flex: 0;
      flex: 0 0 5%;
      max-width: 8.333333%;
    }
    .btn-book {
      background-color: white; 
      color: black; 
      border: 0.2vmin solid grey; 
      border-radius: 4vmin; 
      font-size: 11px;
    }
    .btn-book.home {
      /* width: 126px; */
      height: 47px; 
      width: 11%; 
    }
    .btn-book.in-modal {
      width: 10vw;
    }
    .circle{
      position:relative;
      width:60%;
      height:50%;
      padding-bottom:50%;
      background:white;
      border-radius:50%;
      border: 0.5px solid grey;
      margin: 0;
      color: black
    }
    .in-circle{
      position:absolute;
      top:50%; left:50%;
      transform: translate(-50%, -50%);
      margin:0;
    }

    .input-box {
      border-radius: 1vmin; 
      height: 4.5vh;
      font-size: 1.5vmin;
    }
    .input-box.bottom {
      margin-top: 1.5vh;
    }
    .text-date {
      height: 54%; 
      margin: 0;
    }
    .text-date.time {
      font-size: 11px;
      /* font-size: 0.7vw; */
    }
    .text-date.qty {
      font-size: 9px;
    }
    .term-title-style {
      color: #6A0000;
      font-size: 12px;
      font-weight: bold;
    }
    .term-body-style {
      font-size: 11px;
    }
  }
  
</style>
