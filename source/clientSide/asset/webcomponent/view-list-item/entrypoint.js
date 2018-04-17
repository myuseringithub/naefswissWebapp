import localization from '/@webcomponent/document-element/localizationMixin.js'
import appMixin from '/@webcomponent/document-element/appMixin.js'
import { PolymerElement , html } from '/@webcomponent/component.package/@polymer/polymer/polymer-element.js'
import polymerSupportPromiseBinding from '/@webcomponent/document-element/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
/** WebComponent **/
import '/@webcomponent/component.package/@polymer/iron-icons/iron-icons.js'
import '/@webcomponent/component.package/@polymer/paper-icon-button/paper-icon-button.js'
import '/@webcomponent/component.package/@polymer/app-layout/app-toolbar/app-toolbar.js'
import '/@webcomponent/component.package/@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '/@webcomponent/component.package/@polymer/app-layout/app-header/app-header.js'
import '/@webcomponent/component.package/@polymer/app-layout/app-header-layout/app-header-layout.js'
import '/@webcomponent/shared-styles.html$convertSharedStylesToJS'

;(async () => {

    const localizationMixin = await localization()
    const AppMixin = localizationMixin(appMixin(PolymerElement)) // Extend Polymer.Element base class
    const component = {
        css: html`<custom-style><!--for polyfill compatibility--><style include="shared-styles">{%= argument.css %}</style></custom-style>`,
        html: html`{%= argument.html %}`,
        superclass: AppMixin
    }    

    class Element extends component.superclass {

        static get is() { return 'view-list-item'; }
        static get template() { return html`${component.css}${component.html}` }
        static get properties() {
        return {
            app: Object,
        }
        }
    }
    customElements.define(Element.is, Element)

})() // async
