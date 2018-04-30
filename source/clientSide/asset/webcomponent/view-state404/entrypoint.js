import { PolymerElement , html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'
import polymerSupportPromiseBinding from '/@webcomponent/document-element/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
import localization from '/@webcomponent/document-element/localizationMixin.js'
import appMixin from '/@webcomponent/document-element/appMixin.js'
import { defineCustomElement } from '/@javascript/defineCustomElement.decorator.js'

import '/@webcomponent/shared-styles.html$convertSharedStylesToJS'

const component = {
  elementName: 'view-state404',
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