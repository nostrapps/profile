// import './index.css'

import { html } from '../js/preacthtm.js'

export default function Navbar1(props) {
  return html`

  <!-- component -->
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
  </head>
  <!-- Tailwind CSS better navbar -->
  <nav class="flex justify-between items-center bg-blue-600 h-16 shadow-lg">
    <div class="logo">
      <h1 class="ml-5 cursor-pointer text-white font-bold">${props.title}</h1>
    </div>
    <ul>
      <li>
        <a class="mr-6 bg-gray-500 p-3 pl-5 pr-5 rounded transition-all hover:bg-gray-600 text-white" href=""><i class="fas fa-home"></i> Home</a>
      </li>
    </ul>
  </nav>
  
`

}