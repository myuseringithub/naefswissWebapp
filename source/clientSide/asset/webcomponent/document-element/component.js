// TODO: Consider switching `document-element` to https://www.polymer-project.org/2.0/docs/api/elements/Polymer.DomBind
// window.addEventListener('WebComponentsReady', function() {
const App = window.App || {}; 
// Extend Polymer.Element base class
// class Element extends App.mixin.app.setting(Polymer.Element) {
class Element extends App.mixin(Polymer.Element) {
    static get is() { return 'document-element'; }
    static get template() { return Polymer.html`${css}${html}` }
    static get properties() {
        return { /* properties metadata */ 
            layout: {
                type: String,
                notify: true,
                reflectToAttribute: true,
            },
            page: {
                type: Object,
                notify: true,
                reflectToAttribute: true,
            },
            subroute: {
                type: Object,
                notify: true,
                reflectToAttribute: true,
            },              
        }
    }
    static get observers() { return [ /* observer descriptors */
        '_routePageChanged(routeData.pathTopLevel, subroute.path)',
        '_routeChanged(route)',
    ] }
    // static get template() {
    //     console.log(Polymer)
    //     return Polymer.html`<style>:host { color: blue; }</style>
    //         <h2>String template</h2>
    //         <div>I've got a string template!</div>`;
    // }
    constructor() { // in constructor - set default values & event listners. & Add shadow root which Polymer does.
        super()
  
        // Values are altered when server renderint to front-end (slashes are added).
        this.app.setting.location.routeBasePath = `${this.app.config.PROTOCOL}${this.app.config.HOST}`
        this.app.documentElement = this // register document element to be used as entrypoint to Polymer's binding system.
        this.app.configuration = {
            language: 'Arabic',
            accesibility: {
                color: 'light'
            }
        }
    }
    ready() { // invoked the first time added to the dom.
        // Polymer.Element : 
        // • Creates and attaches the element's shadow DOM tree.
        // • Initializes the data system, propagating initial values to data bindings.
        // • Allows observers and computed properties to run (as soon as any of their dependencies are defined).
        super.ready()
        
        // When possible, use afterNextRender to defer non-critical work until after first paint. (must load 'polymer/lib/utils/render-status.html')
        // Polymer.RenderStatus.afterNextRender(this, function() {
        //     this.addEventListener('click', this._handleClick);
        // });
    }
    connectedCallback() {
        super.connectedCallback(); // to allow Polymer to hook into the element's lifecycle.

        console.log('connection to IndexDB....')
    }
    disconnectionCallback() {
        super.disconnectionCallback()
    }
    attributeChangedCallback() {
        super.attributeChangedCallback()
    }


    _routeChanged(route) {
        // console.log(route)
    }

    _routePageChanged(pathTopLevel, pathLevel2) { // Choose page/view using URL path.
        if(typeof pathTopLevel == 'undefined') return; // skip initial `pathTopLevel` value of undefined.
        let documentKey = this.checkConditionTree(pathTopLevel, pathLevel2.replace(/\//g, ""))

        // Document & Template Tree procesing.
        let document = this.app.document.filter(unit => {
            if(unit.key == documentKey) return true
            return false
        })[0]
        
        // document.page.filename = document.page.file.substr(0, document.page.file.indexOf('.'));
        this.layout = document.layout
        this.page = document.page
        
    }

    checkConditionTree(pathTopLevel, pathLevel2) {
        let documentKey = ''

        switch (pathTopLevel) { // Choose appropriate view/page to view
            case '': // empty path
                documentKey = 'frontpage'
            break;
            case 'step': // empty path
                documentKey = 'step'
            break;
            case 'university':
                documentKey = 'universityPage'
            break;
            case 'contact':
                documentKey = 'about'
            break;
            case 'studyfield':
                switch (pathLevel2) {
                    case 'medicine':
                        documentKey = 'medicine'                            
                    break;
                    default:
                        documentKey = 'studyfieldPage'
                    break;                                                           
                }
            break;
            case 'country':
                switch (pathLevel2) {
                    case 'bucharest':
                        documentKey = 'bucharest'                            
                    break;
                    default:
                        documentKey = 'countryPage'
                    break;                                                           
                }
            break;
            case 'registration':
                switch (pathLevel2) {
                    case 'single':
                        documentKey = 'registration-single'                            
                    break;
                    case 'agency':
                        documentKey = 'registration-agency'
                    break;                                                           
                    default:
                        documentKey = 'registration-agency'
                    break;                                                           
                }
            break;
            case 'view1':
                documentKey = 'homePage-view1'
            break;
            case 'view2':
                documentKey = 'homePage-view2'
            break;
            case 'view3':
                documentKey = 'homePage-view3'
            break;
            default:
            case 'view404':
                documentKey = 'view-state404'
            break;
            // case undefined: // skop initial `pathTopLevel` value of undefined.
            //   break;
        }
        return documentKey
    }

    func() {
        return 'func function executed'
    }
}

// Register custom element definition using standard platform API
window.customElements.define(Element.is, Element);

// })
