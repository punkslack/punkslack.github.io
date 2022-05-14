async function createApp() {
  if (!document.getElementById('main')) {
    let res = await fetch(`/views/app.html`)
    let body = await res.text()
    const template = document.createElement('script')
    template.setAttribute('type', 'text/x-template')
    template.id = 'main'
    template.append(body)
    document.body.append(template)
  }

  return new Vue({
    template: '#main',
    vuetify: new Vuetify(),
    methods: {
      async login (e) {
        console.log(`Navigating to Login view`, e)
        await this.$destroy()
        await createLogin(this)
      },
    },
  }).$mount('#app')
}
