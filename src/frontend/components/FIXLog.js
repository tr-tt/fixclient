const template = document.createElement('template')

template.innerHTML =
`
<style>

</style>
`

class FIXLog extends HTMLElement
{
    constructor()
    {
        super()

        this.attachShadow({mode: "open"})

        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback()
    {

    }

    disconnectedCallback()
    {

    }

}

window.customElements.define('fix-log', FIXLog)

export default FIXLog