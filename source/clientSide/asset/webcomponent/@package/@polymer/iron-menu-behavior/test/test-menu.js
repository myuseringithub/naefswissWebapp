import '@polymer/polymer/polymer-legacy.js';
import { IronMenuBehavior } from '../iron-menu-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <slot></slot>

    <div id="extraContent" tabindex="-1">focusable extra content</div>
`,

  is: 'test-menu',

  behaviors: [
    IronMenuBehavior
  ],

  get extraContent() {
    return this.$.extraContent;
  }
});
