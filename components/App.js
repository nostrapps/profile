import { html, Component } from '../js/preacthtm.js'
import '../js/dior.js'
import Navbar from '../components/Navbar2.js'
import handleMutation from '../js/handlemutation.js'

var title = 'Loginr'

console.log(di.data)


function isLoggedIn() {
  if (di.data.loggedIn) {
    return true
  } else {
    return false
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.processMutation = this.processMutation.bind(this)
    this.ws = null
  }

  async fetchNostrProfile() {
    console.log('fetching profile')
    var relay = 'wss://nostr.rocks/'
    var ws
    if (!ws) {
      ws = new WebSocket(relay)

      ws.addEventListener('open', function (event) {
        console.log('open', ws)
        var req = `["REQ", "124", { "kinds": [0], "authors": ["${di.data.publicKey}"]}] `
        console.log('req', req)
        ws.send(req)

        ws.addEventListener('message', function (event) {
          var profile = JSON.parse(JSON.parse(event.data)[2].content)
          di.data.name = profile.name
          di.data.image = profile.picture
          console.log('event', profile)
          di.data = di.data
        })

      })

    }
  }

  async login() {
    console.log('login')
    let publicKey = await window?.nostr?.getPublicKey()

    // workaround for now
    // if (navigator.userAgent.indexOf("Firefox") > 0) {
    //   publicKey = publicKey.split(/(..)/g).filter(i => i).map(i => String.fromCharCode(parseInt(i, 16
    //   ))).join('')
    // }

    di.data.publicKey = publicKey

    if (di.data.publicKey) {
      di.data.loggedIn = true
      this.fetchNostrProfile()
    }
    di.data = di.data
  }

  async logout() {
    console.log('logout', di.data.loggedIn)
    di.data.publicKey = null
    di.data.loggedIn = false
    di.data = di.data
  }

  async componentDidMount() {
    console.log('handle mutations')
    handleMutation('data', this.processMutation)
  }

  processMutation() {
    console.log('process mutation!')
    this.setState({ mutation: true })
  }

  render() {
    if (isLoggedIn()) {
      return html`

      <div class="h-screen bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
      <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
          <div class=" h-32 overflow-hidden" >
              <img class="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
          </div>
          <div class="flex justify-center px-5  -mt-12">
              <img class="h-32 w-32 bg-white p-2 rounded-full" src="${di.data.image}" alt="" />

          </div>
          <div class=" ">
              <div class="text-center px-14">
                  <h2 class="text-gray-800 text-3xl font-bold">${di.data.name}</h2>
                  <p class="text-gray-400 mt-2">${di.data.publicKey}</p>
                  <p class="mt-2 text-gray-600">Logged in!</p>
              </div>
              <hr class="mt-6" />
              <div class="flex  bg-gray-50 ">
                  <a target="_blank" href="https://nostr.rocks/${di.data.publicKey}" class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                      <p><span class="font-semibold">Events</span></p>
                  </a>
                  <div class="border"></div>
                  <a onClick=${this.logout} class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                      <p> <span class="font-semibold">Logout</span></p>
                  </a>

              </div>
          </div>
      </div>
  </div>

      `

    } else {
      return html`

      <div class="h-screen bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
      <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
          <div class=" h-32 overflow-hidden" >
              <img class="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
          </div>
          <div class="flex justify-center px-5  -mt-12">
              <img class="h-32 w-32 bg-white p-2 rounded-full" src="./images/nostrlogo.jpg" alt="" />

          </div>
          <div class=" ">
              <div class="text-center px-14">
                  <h2 class="text-gray-800 text-3xl font-bold">Login</h2>
                  <p class="text-gray-400 mt-2">@nostr</p>
                  <p class="mt-2 text-gray-600">Please use nos2x to Log In</p>
              </div>
              <hr class="mt-6" />
              <div class="flex  bg-gray-50 ">
                  <a href="https://github.com/fiatjaf/nos2x#install" target="_blank" class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                      <p><span class="font-semibold">Install nos2x</span></p>
                  </a>
                  <div class="border"></div>
                  <a onClick=${this.login} class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                      <p> <span class="font-semibold">Login</span></p>
                  </a>

              </div>
          </div>
      </div>
  </div>

    `

    }


  }
}
