class NavHeader extends HTMLElement {
    
    constructor () {
        super()

        this.root = this.attachShadow({mode: "open"})
        this.repoamount = "..."
    }

    static get observedAttributes () {
        return ["repocount"]
    }

    connectedCallback () {
        this.render()
    }

    attributeChangedCallback (name, _oldValue, newValue) {
        if (name === "repocount") {
            this.repoamount = newValue
        }
        this.render()
    }

    render () {
        this.root.innerHTML = 
        `
        <style>

            header {
                position: sticky;
                top: 0;
                background: linear-gradient(to right, transparent 30%, white 30%)
            }

            nav {
                background-color: black;
                padding: .3rem;
                padding-left: 1rem;
            }

            nav>img {
                display: inline-block;
                background-color: white;
                border: none;
                border-radius: 50%;
                width: 30px;
            }

            ul {
                background: linear-gradient(to right,transparent 30%, white 30%);
                font-weight: bold;
                height: 4vh;
                padding-right: 3rem;
                padding-bottom: .6rem;
                list-style: none;
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                border-bottom: 1px solid #eee;
            }

            ul li {
                margin: 0 .3rem;
            }

            ul li:nth-child(2) {
                position: relative;
                display: inline-block;
                border-bottom: 3px solid red;
                margin-bottom: -.75rem;
                padding-bottom: .34rem;
            }

            .badge {
                display: inline-flex;
                border-radius: 40%;
                padding: .2rem .6rem;
                background-color: #eee;
                justify-content: center;
                align-items: middle;
                font-weight: 100 !important;
            }

            @media (max-width: 700px) {
                header {
                    background: white;
                }

                ul {
                    justify-content: center;
                    background: white;
                    font-size: .8rem;
                }

                ul li:nth-child(2) {
                    display: inline-flex;
                }
                .badge {
                    margin-left: .6rem;
                }
            }
        </style>
        <header>
            <nav>
                <img src="https://www.flaticon.com/svg/static/icons/svg/25/25231.svg" alt="github logo"/>
            </nav>
            <ul>
                <li>
                    Overview
                </li>
                <li>
                    Repositories
                    <span class="badge">
                        ${this.repoamount}
                    </span>
                </li>
                <li>
                    Projects
                </li>
                <li>
                    Packages
                </li>
            </ul>
        </header>
        `
    }
}

customElements.define("nav-header", NavHeader)