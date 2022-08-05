const template = document.createElement('template')

template.innerHTML =
`
<style>
:host
{
    display: grid;
    height: calc(100% - var(--size_35));
    grid-template-areas: 'sections separator content';
    grid-template-columns: 160px var(--size_5) auto;
}

/* SECTIONS */

#sections
{
    grid-area: sections;
    position: relative;
}
#sections:hover #close
{
    opacity: 1;
}
#sections #close
{
    position: absolute;
    right: 0px;
    top: 300px;
    background-color: rgb(var(--color_5));
    padding: var(--size_10);
    cursor: pointer;
    border-radius: 50% 0 0 50%;
    opacity: 0;
    will-change: opacity;
    transition: ease 0.2s;
}
#sections .section
{
    display: flex;
    height: var(--size_50);
    border-left: var(--size_5) solid transparent;
    cursor: pointer;
    will-change: border-left-color;
    transition: ease 0.2s;
    border-bottom: 1px solid;
    border-bottom-color: rgba(var(--color5), 0.3);
}
#sections .section:hover,
#sections .section.active
{
    border-left-color: rgb(var(--color_4));
}
#sections .section fix-icon
{
    padding: 0 var(--size_20) 0 var(--size_15);
}
#sections .section span
{
    display: flex;
    align-items: center;
}

/* SEPARATOR */

#separator
{
    grid-area: separator;
    background-color: rgb(var(--color_5));   
}

/* CONTENT */

#content
{
    grid-area: content;
}
</style>
<div id="sections">
    <fix-icon id="close" icon="close" class="w-15px"></fix-icon>

    <div class="section active">
        <fix-icon icon="close" class="w-15px"></fix-icon>
        <span>Server</span>
    </div>

    <div class="section">
        <fix-icon icon="close" class="w-15px"></fix-icon>
        <span>Separators</span>
    </div>

    <div class="section">
        <fix-icon icon="close" class="w-15px"></fix-icon>
        <span>Tags</span>
    </div>

    <div class="section">
        <fix-icon icon="close" class="w-15px"></fix-icon>
        <span>Messages</span>
    </div>

    <div class="section">
        <fix-icon icon="close" class="w-15px"></fix-icon>
        <span>Logs</span>
    </div>
</div>

<div id="separator"></div>

<div id="content"></div>
`

class FIXApp extends HTMLElement
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

window.customElements.define('fix-app', FIXApp)

export default FIXApp