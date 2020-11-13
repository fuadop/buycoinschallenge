class NavHeader extends HTMLElement {
    
    constructor () {
        super()

        this.root = this.attachShadow({mode: "open"})
    }

    connectedCallback () {
        this.render()
    }

    render () {
        this.root.innerHTML = 
        `
        <style>
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
                margin-bottom: -.64rem;
                padding-bottom: .45rem;
            }

            @media (max-width: 700px) {
                ul {
                    justify-content: center;
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