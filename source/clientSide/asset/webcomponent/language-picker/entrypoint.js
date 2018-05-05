import { PolymerElement , html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'
import polymerSupportPromiseBinding from '/@javascript/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
import { defineCustomElement } from '/@javascript/defineCustomElement.decorator.js'
/** Mixin **/
import localization from '/@webcomponent/mixin/localizationMixin.js'
import appMixin from '/@webcomponent/mixin/appMixin.js'
/** Package WebComponent **/
import '/@webcomponent/@package/@polymer/iron-icons/iron-icons.js'
import '/@webcomponent/@package/@polymer/paper-button/paper-button.js'
import '/@webcomponent/@package/@polymer/iron-icon/iron-icon.js'
import '/@webcomponent/@package/@polymer/paper-listbox/paper-listbox.js'
import '/@webcomponent/@package/@polymer/paper-item/paper-item.js'
import '/@webcomponent/@package/@polymer/paper-menu-button/paper-menu-button.js'

const component = {
    elementName: 'language-picker',
    css: html`<custom-style><!--for polyfill compatibility--><style include="shared-styles">{%= argument.css %}</style></custom-style>`,
    html: html`{%= argument.html %}`,
}

;(async () => {

    const localizationMixin = await localization()
    const AppMixin = localizationMixin(appMixin(PolymerElement)) // Extend Polymer.Element base class
    component.superclass = AppMixin

    @defineCustomElement(component.elementName)
    class Element extends component.superclass {
        static get template() { return html`${component.css}${component.html}` }
        static get properties() {
            return { /* properties metadata */ 
                language: {
                    type: String,
                    notify: true,
                    reflectToAttribute: true
                },
                languageCode: {
                    type: String,
                    computed: '_languageCode(language)'
                }
            }
        }

        static get observers() { return [ /* observer descriptors */
            'changeDirection(language)'
        ] }

        constructor() {
            super();
        }
        
        ready() {
            super.ready();
            this.$.menu.allowOutsideScroll = true // Prevent scroll binding - needs to be fixed by Polymer team.
            this.$.menu.$.dropdown.setAttribute('no-animations', '') // Prevent keyFrame error - needs to be updated by Polymer team.
        }

        connectedCallback() {
            super.connectedCallback();
        }
        
        _languageCode(language) {
            return this.languageList
                    .find(languageItem => languageItem.name == language)
                    .code
        }
        
        changeDirection(language) {
            let rightLanguages = ['Arabic', 'Hebrew']
            // this.$.menu.horizontalAlign = (rightLanguages.includes(language)) ? 'left' : 'right'; // alignment is opposite to text direction.
        }
    }

    Element.prototype.languageList = [
        {
            name: 'Arabic',
            code: 'AR',
        },
        {
            name: 'English',
            code: 'EN',
        },
        {
            name: 'Hebrew',
            code: 'HE'
        }
    ]

})() // async

export default async () => {
    if(!customElements.get(component.elementName)) { // if element not defined wait till custom element is registered
        await customElements.whenDefined(component.elementName)
    }

    return component.elementName
}