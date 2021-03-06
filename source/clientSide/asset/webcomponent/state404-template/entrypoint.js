import { PolymerElement , html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'
import polymerSupportPromiseBinding from '/@javascript/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
import { defineCustomElement } from '/@javascript/defineCustomElement.decorator.js'
/** Mixin **/
import localization from '/@webcomponent/mixin/localizationMixin.js'
import appMixin from '/@webcomponent/mixin/appMixin.js'
/** Custom WebComponent **/
import '/@webcomponent/shared-styles.html$convertSharedStylesToJS'

const component = {
  elementName: 'state404-template',
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
      return {
        baseUrl: {
          type: String,
          reflectToAttribute: true,
          value: `${App.config.PROTOCOL}${App.config.HOST}`
        },
      }
    }
  }
})() // async

export default async () => {
  if(!customElements.get(component.elementName)) { // if element not defined wait till custom element is registered
      await customElements.whenDefined(component.elementName)
  }

  return component.elementName
}