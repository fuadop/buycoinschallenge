class RepoList extends HTMLElement {
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
        `
    }
}

customElements.define("repo-list", RepoList)