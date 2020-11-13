class Avatar extends HTMLElement {
    constructor () {
        super()

        this.root = this.attachShadow({mode: "open"})
        this.url = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
    }

    connectedCallback () {
        this.render()
    }
    
    static get observedAttributes () {
        return ["image"]
    }

    attributeChangedCallback (name, _oldValue, newValue) {
        if (name === "image") {
            this.url = newValue
        }
        return this.render()
    }

    render () {
        this.root.innerHTML = 
        `
        <style>
            div {
                margin-top: -3rem;
                border-radius: 50%;
                width: 250px;
                height: 250px;
                overflow: hidden;
            }

            img {
                width: 100%;
            }

            @media (max-width: 700px) {
                div {
                    margin-top: .5rem;
                }
            }
        </style>
        
        <div>
            <img src="${this.url}"/>
        </div>


        `
    }
}

customElements.define("avatar-image", Avatar)