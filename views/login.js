async function createLogin() {
  if (!document.getElementById('login')) {
    let res = await fetch(`/views/login.html`)
    let body = await res.text()
    const template = document.createElement('script')
    template.setAttribute('type', 'text/x-template')
    template.id = 'login'
    template.append(body)
    document.body.append(template)
  }

  return new Vue({
    template: '#login',
    vuetify: new Vuetify(),
    data () {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      async login (e) {
        try {
          const form = new URLSearchParams()
          form.append('username', this.username)
          form.append('password', this.password)
          let res = await fetch(`/login`, {
            method: 'post',
            body: form,
            mode: 'cors',
          })
          console.log(`res`, res)
          let body = await res.json()
          console.log(`body`, body)
        } catch (e) {
          console.log(e)
        }
      },
      async success (e) {
        console.log(`Navigating to Login app`, e)
        await this.$destroy()
        await createLogin(this)
      },
    },
  }).$mount('#app')
}
