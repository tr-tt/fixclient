const template = document.createElement('template')

template.innerHTML =
`
<style>
:host
{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--size_35);
    background-color: rgb(var(--color_5));
    -webkit-app-region: drag;
    border-bottom: 1px solid;
    border-color: rgba(var(--color5), 0.3);
}

/* FIX-ICON */

fix-icon
{
    padding: 0 var(--size_20);
}

/* SLOT */

slot[name=title]::slotted(span)
{
    display: flex;
    align-items: center;
    font-weight: var(--weight_600);
    font-size: var(--size_15);
    white-space: nowrap;
}

/* TITLE */

#title
{
    display: flex;
    height: 100%;
}
/* CONTROLS */

#controls
{
    display: flex;
    height: 100%;
    -webkit-app-region: no-drag;
}
#controls .button
{
    will-change: background-color;
    transition: ease 0.2s;
}
#controls .button:hover
{
    background-color: rgba(var(--white), 0.1);
}
#controls #close:hover
{
    background-color: rgb(var(--color_4)) !important;
}

</style>
<div id="title">
    <fix-icon icon="landmark-solid" class="w-20px"></fix-icon>
    <slot name="title"></slot>
</div>

<div id="controls">
    <fix-icon id="minimize" icon="minimize" class="w-15px button"></fix-icon>
    <fix-icon id="maximize" class="w-15px button"></fix-icon>
    <fix-icon id="close" icon="close" class="w-15px button"></fix-icon>
</div>
`

class FIXFrame extends HTMLElement
{
    constructor()
    {
        super()

        this.attachShadow({mode: "open"})

        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this._minimize = this.shadowRoot.querySelector('#minimize')
        this._maximize = this.shadowRoot.querySelector('#maximize')
        this._close = this.shadowRoot.querySelector('#close')
    }

    connectedCallback()
    {
        this._minimize.addEventListener('click', this._minimizeClick.bind(this))
        this._maximize.addEventListener('click', this._maximizeClick.bind(this))
        this._close.addEventListener('click', this._closeClick.bind(this))
        
        const isMaximized = window.api.isMaximized() // this function is defined in electron preloads

        if(isMaximized)
        {
            this._maximize.setAttribute('icon', 'unmaximize')
        }
        else
        {
            this._maximize.setAttribute('icon', 'maximize')
        }
    }

    disconnectedCallback()
    {
        this._minimize.removeEventListener('click', this._minimizeClick)
        this._maximize.removeEventListener('click', this._maximizeClick)
        this._close.removeEventListener('click', this._closeClick)
    }

    _minimizeClick()
    {
        window.api.minimize()
    }

    _maximizeClick()
    {
        const isMaximized = window.api.isMaximized()

        if(isMaximized)
        {
            window.api.unmaximize()

            this._maximize.setAttribute('icon', 'maximize')
        }
        else
        {
            window.api.maximize()

            this._maximize.setAttribute('icon', 'unmaximize')
        }
    }

    _closeClick()
    {
        window.api.close()
    }
}

window.customElements.define('fix-frame', FIXFrame)

export default FIXFrame