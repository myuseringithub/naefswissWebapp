import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import './color.js';
import './typography.js';
import './shadow.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style is="custom-style">
    body {
      @apply --paper-font-common-base;
      font-size: 14px;
      margin: 0;
      padding: 24px;
      background-color: var(--paper-grey-50);
    }

    .horizontal-section-container {
      @apply --layout-horizontal;
      @apply --layout-center-justified;
      @apply --layout-wrap;
    }

    .vertical-section-container {
      @apply --layout-vertical;
      @apply --center-justified;
    }

    .horizontal-section {
      background-color: white;
      padding: 24px;
      margin-right: 24px;
      min-width: 200px;

      @apply --shadow-elevation-2dp;
    }

    .vertical-section {
      background-color: white;
      padding: 24px;
      margin: 0 24px 24px 24px;

      @apply --shadow-elevation-2dp;
    }

    .centered {
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }

    code {
      color: var(--google-grey-700);
    }

    /* TODO: remove this hack and use horizontal-section-container instead */
    body &gt; div.layout.horizontal.center-justified {
      @apply --layout-wrap;
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer);

/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/*
Note that this file probably doesn't do what you expect it to do. It's not
a `<style is=custom-style include="..."` type of style include, which mean
these styles will only apply to the main document, regardless of where
you import this file.

For a set of styles that can be applied to an element,
check iron-demo-helpers/demo-pages-shared-styles.html.
*/
;