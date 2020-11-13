class Repostiory extends HTMLElement {
    constructor () {
        super()

        this.root = this.attachShadow({mode: "open"})
        this.reponame = "Loading..."
        this.language = "Loading..."
        this.starsamount = "Loading..."
        this.forksamount = "Loading..."
        this.lastupdated = "Loading..."
    }

    static get observedAttributes () {
        return ["title", "lang", "stars", "forks", "lastupdate"]
    }

    attributeChangedCallback (name, _oldValue, newValue) {
        switch ( name ) {
            case "title":
                this.reponame = newValue
                break
            case "lang":
                this.language = newValue
                break
            case "stars":
                this.starsamount = newValue
                break
            case "forks":
                this.forksamount = newValue
                break
            case "lastupdate":
                this.lastupdated = newValue
                break
            default:
                break
        }
        this.render()
    }

    connectedCallback () {
        this.render()
    }

    render () {
        this.root.innerHTML = 
        `
        <style>
            div {
                border-bottom: 1px solid #eee;
                border-top: 1px solid #eee;
                padding: 1rem 0;
                margin-right: 1rem;
            }

            p {
                font-weight: bold;
                color: blue;
            }

            ul {
                list-style: none;
                display: flex;
                justify-content: flex-start;
                color: grey;
                padding: 0;
            }
            
            ul li {
                margin-right: 1.5rem;
            }

            .language-color {
                display: inline-block;
                background-color: orange;
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }

            img {
                width: 1rem;
                height: 1rem;
            }

            @media (max-width: 700px) {
                div {
                    margin: 0 .5rem;
                }
            }
        </style>
        <div>
            <p>${this.reponame}</p>
            <ul>
                <li>
                    <span class="language-color"></span>
                    ${this.language}
                </li>
                <li>
                    <img src="/src/images/star.png" alt="star"/>
                    ${this.starsamount}
                </li>
                <li>
                <img src="/src/images/fork.png" alt="star"/>
                    ${this.forksamount}
                </li>
                <li>
                    Updated on ${this.lastupdated}
                </li>
            </ul>
        </div>
        `
    }
}

customElements.define("single-repo", Repostiory)