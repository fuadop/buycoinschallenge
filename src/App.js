import "./components/Avatar.js"
import "./components/UserDetails.js"
import "./components/NavHeader.js"
import "./components/RepoList.js"
import "./components/Repository.js"

class App extends HTMLElement {
    constructor () {
        super()
    }

    connectedCallback () {
        this.render()
    }

    render () {
        this.innerHTML = 
        `
        <div>
            <nav-header></nav-header>
            <div class="flex">
                <div class="pl-5 flex-item overview">
                    <avatar-image 
                    image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                    >
                    </avatar-image>
                    <user-details 
                    name="Fuad Olatunji"
                    handle="fuadop"
                    about="Software Engineer @Google"
                    >
                    </user-details>
                </div>
                <div class="flex-item">
                    <single-repo
                    title="A web app"
                    lang="Html"
                    stars="35"
                    forks="50"
                    lastupdate="1 Oct"
                    ></single-repo>
                </div>
            </div>
        </div>
        `
    }
}

customElements.define("main-app", App)

window.onload = function() {
    document.getElementById("root").appendChild(document.createElement("main-app"))
}