<template>
  <b-container>
    <div class="desktop-container">
      <b-row class="form-container">
        <b-col>
          <p class="form-title">Pick Date: </p>
          <b-form-select class="form-body" v-model="selected" :options="pick_day" @change="inputDate(selected)"></b-form-select>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="table-container">
          <b-table
            :items="data"
            :fields="fields"
            responsive="sm"
            class="mt-4"
            outlined
            show-empty
          >
          </b-table>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import Day from '@/api/DayApi'
import Queue from '@/api/QueueApi'

export default {
  name: 'List',
  data() {
    return {
     
      fields: [
        { key: 'ID_Number', sortable: true },
        { key: 'name', sortable: true },
        { key: 'email', sortable: true },
        { key: 'queue', sortable: false },
        { key: 'start', sortable: true },
        { key: 'end', sortable: true }
      ],

      selected: null,
      data: [],
      pick_day: [
        {value: null, text: `Please choose the date`}
      ]
    }
  },
  created () {
    const self = this
    const promiseDay = self.loadDay()

    Promise.all([promiseDay]).then(() => {
      console.log(`done`)
    })
  },
  methods: {
    loadDay: async function () {
      let self = this
      self.is_busy = false
      let res = await Day.fetch()
      const data = new Promise((resolve) => {
        res.data.day.forEach((day) => {
          self.pick_day.push({
            value: day.id,
            text: `${day.days}`
          })
        });
        self.loading = false;
        resolve()
      });
      Promise.resolve(data);
    },
   
    inputDate: async function (param) {
      this.data = [];
      let res = await Queue.pickDay({ day: param});
      res.data.queue.forEach((tm) => {
        this.data.push(tm);
      });
      console.log(this.data)
    }
  }
}
</script>

<style scoped>
 .form-container {
   margin-top: 10vh; 
   width: 25vw;
 }
 .form-title {
   font-size: 14px; 
   font-weight: bold;
 }
 .form-body {
   font-size: 12px; 
 }
 .table-container {
   font-size: 12px;
 }
</style>
