class Avatar extends HTMLElement {
    constructor () {
        super()

        this.root = this.attachShadow({mode: "open"})
        this.url = "/src/images/fallback.jpg"
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
                background-color: grey;
                overflow: hidden;
            }

            img {
                width: 100%;
                object-fit: cover;
            }

            @media (max-width: 700px) {
                div {
                    margin-top: .5rem;
                    margin-right: .8rem;
                    width: 100px;
                    height: 100px;
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