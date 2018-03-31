import appMixin from '/asset/webcomponent/document-element/appMixin.js'
import convertParamsIntoURLEncodedQuery from '/asset/javascript/convertParamsIntoURLEncodedQuery.js'

;(async () => {

    const AppMixin = appMixin(Polymer.ElementMixin(HTMLElement))
    class Element extends AppMixin {
        static get is() { return 'timeline-grid'; }
        static get template() { return Polymer.html`${css}${html}` }
        static get properties() {
            return { /* properties metadata */ 
                achievement: {
                    type: Object, notify: true, reflectToAttribute: true
                }
            }
        }

        static get observers() { return [ /* observer descriptors */
            
        ] }

        constructor() {
            super();
        }
        
        ready() {
            super.ready();

        }

        connectedCallback() {
            super.connectedCallback();
            this.fetchData()
        }

        fetchData() {
            let params = {
                language: 'Arabic'
            }
            let query = convertParamsIntoURLEncodedQuery(params)
            let entrypointKey = 'personalInfo'
            return fetch(`http://api.localhost/content/${entrypointKey}?${query}`, {
                method: 'POST',
                body: JSON.stringify({
                    extrafield: true,
                    schemaMode: 'nonStrict'
                }), 
                mode: 'cors',
                cache: 'no-cache',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(async response => {
                if(!response.ok) throw response.statusText // if status code resuted is not '200' (fetch resolves/passes on 404 for example.)
                let wrapperObject = await response.json()
                return wrapperObject[entrypointKey] // extract content object (without entrypointKey name)
            }).then(async data => {
                this.achievement = data // update property
            })
        }

    }
    customElements.define(Element.is, Element);

})() // async