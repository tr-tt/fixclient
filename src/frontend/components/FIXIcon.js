import Icons from '../../assets/icons/icons.js'

const template = document.createElement('template')

template.innerHTML =
`
<style>
    *
    {
        box-sizing: border-box;
    }
    :host
    {
        display: flex;
        justify-content: center;
        overflow: hidden;
    }
    svg path
    {
        fill: currentColor;
        stroke: currentColor;
    }
</style>
<svg xmlns="http://www.w3.org/2000/svg"></svg>
`

class FIXIcon extends HTMLElement
{
    constructor()
    {
        super()

        this.attachShadow({mode: "open"})

        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this._svg = this.shadowRoot.querySelector('svg')

        this._parser = new DOMParser()
    }

    connectedCallback()
    {
        this.classList.forEach((token) =>
        {
            if (token.includes('w-'))
            {
                this._setWidth(token.replace('w-', ''))
            }
        })
    }

    static get observedAttributes()
    {
        return ['icon']
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if (oldValue === newValue)
        {
            return;
        }

        if (name === 'icon')
        {
            this._render(newValue)
        }
    }

    _render(icon)
    {
        const svg = this._parser.parseFromString(Icons[icon], 'text/html').body.childNodes[0]

        this._svg.setAttribute('viewBox', svg.getAttribute('viewBox'))

        this._svg.innerHTML = svg.innerHTML
    }

    _setWidth(width)
    {
        this.style.width = width
    }
}

window.customElements.define('fix-icon', FIXIcon)

export default FIXIcon