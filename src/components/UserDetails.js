class UserDetails extends HTMLElement {

    constructor () {
        super()

        this.root = this.attachShadow({mode: "open"})
        this.fullname = "Loading...",
        this.username = "Loading...",
        this.description = "Loading..."
    }

    static get observedAttributes () {
        return ["name", "handle", "about"]
    }

    connectedCallback () {
        this.render()
    }

    attributeChangedCallback (name, _oldValue, newValue) {
        switch ( name ) {
            case "name":
                this.fullname = newValue
                break
            case "handle":
                this.username = newValue
                break
            case "about":
                this.description = newValue
                break
            default:
                break
        }
        this.render()
    }

    render () {
        this.root.innerHTML = 
        `
        <style>
            h3 {
                margin: 0 0;
                margin-top: 1rem;
            }

            p.username {
                color: grey;
                margin: 0 0;
            }

            @media(max-width: 700px) {
                p.about {
                    padding: .3rem;
                }
            }
        </style>
        <div>
            <h3 class="fullname">
                ${this.fullname}
            </h3>
            <p class="username">
                ${this.username}
            </p>
            <p class="about">
                ${this.description}
            </p>
        </div>
        `
    }
}

customElements.define("user-details", UserDetails)