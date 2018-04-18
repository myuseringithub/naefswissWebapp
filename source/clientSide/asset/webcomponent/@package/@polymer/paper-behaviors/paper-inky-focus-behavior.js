import '@polymer/polymer/polymer-legacy.js';
import { IronButtonState } from '@polymer/iron-behaviors/iron-button-state.js';
import { PaperRippleBehavior } from './paper-ripple-behavior.js';
import { IronControlState } from '@polymer/iron-behaviors/iron-control-state.js';

export const PaperInkyFocusBehaviorImpl = {
  observers: [
    '_focusedChanged(receivedFocusFromKeyboard)'
  ],

  _focusedChanged: function(receivedFocusFromKeyboard) {
    if (receivedFocusFromKeyboard) {
      this.ensureRipple();
    }
    if (this.hasRipple()) {
      this._ripple.holdDown = receivedFocusFromKeyboard;
    }
  },

  _createRipple: function() {
    var ripple = PaperRippleBehavior._createRipple();
    ripple.id = 'ink';
    ripple.setAttribute('center', '');
    ripple.classList.add('circle');
    return ripple;
  }
};

export const PaperInkyFocusBehavior = [
  IronButtonState,
  IronControlState,
  PaperRippleBehavior,
  PaperInkyFocusBehaviorImpl
];
