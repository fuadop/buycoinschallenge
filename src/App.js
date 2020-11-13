import "./components/Avatar.js"
import "./components/UserDetails.js"
import "./components/NavHeader.js"
import "./components/Repository.js"

class App extends HTMLElement {
    constructor () {
        super()
        this.name = "fuadop"
        this.data = {
            name: "Loading..",
            bio: "Loading...",
            avatarUrl: "/src/images/fallback.jpg",
            repositories: {
                totalCount: "...",
                nodes: [
                    {
                        name: "Loading...",
                        forksCount: "...",
                        stargazerCount: "...",
                        updatedAt: "0",
                        languages: {
                            nodes: [
                                {
                                    name: "..."
                                }
                            ]
                        }
                    }
                ]
            }
        }

        this.monthsEnum = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ]
    }

    async connectedCallback () {
        this.fetchData()
        this.render()
    }

    async fetchData () {
        try {
            const data = await fetch("https://api.github.com/graphql" ,{
                method: "POST",
                headers: {
                    "Authorization": "Bearer 8e0c6d138dea2e88018df63e2b60a2b4cd9a2a32"
                },
                body: JSON.stringify({
                    query: `
                        {
                            user(login: "${this.name}") {
                                name
                                bio
                                avatarUrl
                                repositories(first: 20, orderBy: {
                                    field: STARGAZERS
                                    direction: DESC
                                }) {
                                    totalCount
                                    nodes {
                                        name
                                        forkCount
                                        stargazerCount
                                        updatedAt
                                        languages(first: 1) {
                                            nodes {
                                                name
                                                color
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    `
                })
            })

            const response = await data.json()
            this.data = await response.data.user
            this.render()
        } catch (error) {
            alert(error)
        }
    }

    renderRepos () {
        return this.data.repositories.nodes.map( repository => (
            `
                <single-repo
                title="${repository.name}"
                lang="${repository.languages.nodes.length > 0 ? repository.languages.nodes[0].name : "empty"}"
                stars="${repository.stargazerCount}"
                forks="${repository.forkCount}"
                color="${repository.languages.nodes.length > 0 ? repository.languages.nodes[0].color : "black"}"
                lastupdate="${new Date(repository.updatedAt).getDay() + " " + this.monthsEnum[new Date(repository.updatedAt).getMonth()]}"
                ></single-repo>
            `
        )) 
    }

    render () {
        this.innerHTML = 
        `
        <div>
            <nav-header
            repocount="${this.data.repositories.totalCount}"
            ></nav-header>
            <div class="flex">
                <div class="pl-5 flex-item overview">
                    <avatar-image 
                    image="${this.data.avatarUrl}"
                    >
                    </avatar-image>
                    <user-details 
                    name="${this.data.name}"
                    handle="${this.name}"
                    about="${this.data.bio}"
                    >
                    </user-details>
                </div>
                <div class="flex-item">
                    ${this.renderRepos()}
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