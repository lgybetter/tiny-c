<template>
  <div class="hello">
    <textarea v-model="code" placeholder="请输入源程序"></textarea>
    <textarea v-model="result" disabled></textarea>
    <button @click="start">开始分析</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      code: '',
      result: ''
    }
  },
  methods: {
    start () {
      this.$http.post('http://localhost:3000/tiny', {
        code: this.code
      }).then(res => {
        this.result = res.body
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hello {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.hello textarea {
  width: 100%;
  height: 30%;
  padding: 1% 2%;
}

.hello button {
  width: 10%;
  height: 5%;
  margin: 1% auto;
}

</style>
