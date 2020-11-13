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
                        primaryLanguage: {
                            name: "...",
                            color: "black"
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
                    "Authorization": "Bearer " + process.env.ACCESS_TOKEN
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
                                        primaryLanguage {
                                            name
                                            color
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
                lang="${repository.primaryLanguage ? repository.primaryLanguage.name : "empty"}"
                stars="${repository.stargazerCount}"
                forks="${repository.forkCount}"
                color="${repository.primaryLanguage ? repository.primaryLanguage.color : "black"}"
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