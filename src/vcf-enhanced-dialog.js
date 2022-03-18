// eslint-disable-next-line no-unused-vars
import { Dialog } from '@vaadin/dialog';
import { OverlayElement } from '@vaadin/vaadin-overlay/src/vaadin-overlay.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import { getMouseOrFirstTouchEvent } from '@vaadin/dialog/src/vaadin-dialog-utils.js';
import '@vaadin/polymer-legacy-adapter/template-renderer.js';

registerStyles(
  'vcf-enhanced-dialog-overlay',
  css`
    :host {
      --_enhanced-dialog-content-padding: var(--lumo-space-l);
    }

    [part='content'] {
      padding: 0;
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - 6rem);
    }

    [part='header'] {
      padding: var(--lumo-space-s) var(--lumo-space-l);
      border-bottom: 1px solid var(--lumo-shade-10pct);
    }

    [part='dialog-content'] {
      position: relative;
      box-sizing: border-box;
      padding: var(--_enhanced-dialog-content-padding);
      flex: 1 1 auto;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    [part='footer'] {
      padding: var(--lumo-space-s) var(--lumo-space-l);
      background-color: var(--lumo-primary-color-10pct);
    }

    .empty {
      display: none;
    }

    :host([theme~='small']) [part='overlay'] {
      width: 50%;
      min-width: 25rem;
      max-width: 40rem;
    }

    :host([theme~='medium']) [part='overlay'] {
      width: 70%;
      min-width: 40rem;
      max-width: 75rem;
    }

    :host([theme~='large']) [part='overlay'] {
      width: 90%;
      min-width: 40rem;
    }

    :host([theme~='no-padding']) {
      --_enhanced-dialog-content-padding: 0;
    }

    @media screen and (max-width: 48rem) {
      :host([theme~='medium']) [part='overlay'],
      :host([theme~='large']) [part='overlay'] {
        width: 95%;
        min-width: 0;
      }
    }

    @media screen and (max-width: 30rem) {
      :host([theme~='small']) [part='overlay'] {
        width: 95%;
        min-width: 0;
      }
    }

    /* DRAGGABLE STYLES */

    :host([draggable]) [part='content'],
    :host([draggable]) [part='content'] [part='header'],
    :host([draggable]) [part='content'] [part='dialog-content'],
    :host([draggable]) [part='content'] [part='footer'] {
      cursor: move;
    }

    :host([draggable]) [part='content'] [part='header'] *,
    :host([draggable]) [part='content'] [part='dialog-content'] *,
    :host([draggable]) [part='content'] [part='footer'] * {
      cursor: auto;
    }

    /* RESIZER STYLES */

    :host([theme~='small'][resizable]) [part='overlay'],
    :host([theme~='medium'][resizable]) [part='overlay'],
    :host([theme~='large'][resizable]) [part='overlay'] {
      min-width: 0;
    }

    [part='overlay'] {
      position: relative;
      overflow: visible;
    }

    /* Hack for iOS to make the overlay take full size */
    [part='overlay'][style] {
      display: flex;
      flex-direction: column;
    }

    [part='content'] {
      box-sizing: border-box;
      height: 100%;
    }

    .resizer-container {
      height: 100%;
      width: 100%;
      overflow: auto;
    }

    :host(:not([resizable])) .resizer {
      display: none;
    }

    .resizer {
      position: absolute;
      height: 16px;
      width: 16px;
    }

    .resizer.edge {
      height: 8px;
      width: 8px;
      top: -4px;
      right: -4px;
      bottom: -4px;
      left: -4px;
    }

    .resizer.edge.n {
      width: auto;
      bottom: auto;
      cursor: ns-resize;
    }

    .resizer.ne {
      top: -4px;
      right: -4px;
      cursor: nesw-resize;
    }

    .resizer.edge.e {
      height: auto;
      left: auto;
      cursor: ew-resize;
    }

    .resizer.se {
      bottom: -4px;
      right: -4px;
      cursor: nwse-resize;
    }

    .resizer.edge.s {
      width: auto;
      top: auto;
      cursor: ns-resize;
    }

    .resizer.sw {
      bottom: -4px;
      left: -4px;
      cursor: nesw-resize;
    }

    .resizer.edge.w {
      height: auto;
      right: auto;
      cursor: ew-resize;
    }

    .resizer.nw {
      top: -4px;
      left: -4px;
      cursor: nwse-resize;
    }
  `
);

let overlayMemoizedTemplate;
let dialogMemoizedTemplate;

/**
 * The overlay element for [`<vcf-enhanced-dialog>`](/api/#/elements/vcf-enhanced-dialog).
 *
 * ### Styling
 *
 * The following Shadow DOM parts are available for styling the overlay component itself:
 *
 * Part name | Description
 * --|--
 * `header` | Header section of the dialog.
 * `dialog-content` | Content section of the dialog.
 * `footer` | Footer section of the dialog.
 *
 * @extends OverlayElement
 * @mixes IronResizableBehavior
 * @private
 */
class EnhancedDialogOverlay extends mixinBehaviors(IronResizableBehavior, OverlayElement) {
  static get is() {
    return 'vcf-enhanced-dialog-overlay';
  }

  static get template() {
    if (!overlayMemoizedTemplate) {
      overlayMemoizedTemplate = super.template.cloneNode(true);
      const contentPartTemplate = html`
        <div id="header" class="empty" part="header">
          <slot id="headerSlot" name="header"></slot>
        </div>
        <div id="dialogContent" part="dialog-content">
          <slot></slot>
        </div>
        <div id="footer" class="empty" part="footer">
          <slot id="footerSlot" name="footer"></slot>
        </div>
      `;
      const contentPart = overlayMemoizedTemplate.content.querySelector('[part="content"]');
      const overlayPart = overlayMemoizedTemplate.content.querySelector('[part="overlay"]');
      const resizerContainer = document.createElement('div');
      resizerContainer.id = 'resizerContainer';
      resizerContainer.classList.add('resizer-container');
      resizerContainer.appendChild(contentPart);
      overlayPart.appendChild(resizerContainer);
      contentPart.querySelector('slot').remove();
      contentPart.appendChild(contentPartTemplate.content);
    }
    return overlayMemoizedTemplate;
  }

  static get properties() {
    return {
      /**
       * @type {Boolean}
       */
      modeless: Boolean,
      /**
       * @type {Boolean}
       */
      withBackdrop: Boolean
    };
  }

  ready() {
    super.ready();
    this._slotEmptyAttribute(this.$.headerSlot);
    this._slotEmptyAttribute(this.$.footerSlot);
  }

  _slotEmptyAttribute(slot) {
    slot.addEventListener('slotchange', () => {
      if (slot.assignedNodes().length === 0) slot.parentElement.classList.add('empty');
      else slot.parentElement.classList.remove('empty');
    });
  }

  /**
   * Updates the coordinates of the overlay.
   * @param {!DialogOverlayBoundsParam} bounds
   */
  setBounds(bounds) {
    const overlay = this.$.overlay;
    const parsedBounds = Object.assign({}, bounds);

    if (overlay.style.position !== 'absolute') {
      overlay.style.position = 'absolute';
      this.setAttribute('has-bounds-set', '');
      this.__forceSafariReflow();
    }

    for (const arg in parsedBounds) {
      if (typeof parsedBounds[arg] === 'number') {
        parsedBounds[arg] = `${parsedBounds[arg]}px`;
      }
    }

    Object.assign(overlay.style, parsedBounds);
  }

  /**
   * Retrieves the coordinates of the overlay.
   * @return {!DialogOverlayBounds}
   */
  getBounds() {
    const overlayBounds = this.$.overlay.getBoundingClientRect();
    const containerBounds = this.getBoundingClientRect();
    const top = overlayBounds.top - containerBounds.top;
    const left = overlayBounds.left - containerBounds.left;
    const width = overlayBounds.width;
    const height = overlayBounds.height;
    return { top, left, width, height };
  }

  /**
   * Safari 13 renders overflowing elements incorrectly.
   * This forces it to recalculate height.
   * @private
   */
  __forceSafariReflow() {
    const scrollPosition = this.$.resizerContainer.scrollTop;
    const overlay = this.$.overlay;
    overlay.style.display = 'block';

    requestAnimationFrame(() => {
      overlay.style.display = '';
      this.$.resizerContainer.scrollTop = scrollPosition;
    });
  }
}

customElements.define(EnhancedDialogOverlay.is, EnhancedDialogOverlay);

/**
 * `<vcf-enhanced-dialog>` is a Web Component for creating customized modal dialogs.
 *
 * This is an extension of [`<vaadin-dialog>`](https://vaadin.com/components/dialog)
 * that adds the following features:
 *
 * - Header and footer slots.
 * - Scrollable content area.
 * - Size themes.
 *
 * The content of the dialog can be populated in two ways: imperatively by using
 * renderer callback function and declaratively by using Polymer's Templates.
 *
 * ### Rendering
 *
 * By default, the dialog uses the content provided by using the renderer callback function.
 *
 * The renderer function provides `root`, `dialog` arguments.
 * Generate DOM content, append it to the `root` element and control the state
 * of the host element by accessing `dialog`. Before generating new content,
 * users are able to check if there is already content in `root` for reusing it.
 *
 * ```html
 * <vcf-enhanced-dialog id="dialog"></vcf-enhanced-dialog>
 * ```
 * ```js
 * const dialog = document.querySelector('#dialog');
 * dialog.renderer = function(root, dialog) {
 *   root.textContent = "Sample dialog";
 * };
 * ```
 *
 * Renderer is called on the opening of the dialog.
 * DOM generated during the renderer call can be reused
 * in the next renderer call and will be provided with the `root` argument.
 * On first call it will be empty.
 *
 * ### Polymer Templates
 *
 * Alternatively, the content can be provided with Polymer's Template.
 * Dialog finds the first child template and uses that in case renderer callback function
 * is not provided. You can also set a custom template using the `template` property.
 *
 * ```html
 * <vcf-enhanced-dialog opened>
 *   <template>
 *     Sample dialog
 *   </template>
 * </vcf-enhanced-dialog>
 * ```
 *
 * ### Slots
 *
 * Slot name | Description | Default
 * --|--|--
 * | Main content of the dialog. |
 * __header__ | Header section at the top of the dialog. |
 * __footer__ | Footer section at the bottom of the dialog. |
 *
 * ### Styling
 *
 * The following custom properties are available for styling:
 *
 * Custom property | Description | Default
 * --|--|--
 * `--_enhanced-dialog-content-padding` | Padding for overlay content area | `var(--lumo-space-l)` [`1.5rem`]
 *
 * See [`<vcf-enhanced-dialog-overlay>` documentation](/api/#/elements/vcf-enhanced-dialog-overlay)
 * for stylable Shadow DOM parts.
 *
 * Note: the `theme` attribute value set on `<vaadin-dialog>` is
 * propagated to the internal `<vcf-enhanced-dialog-overlay>` component.
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @extends Dialog
 * @demo demo/index.html
 */
class EnhancedDialog extends Dialog {
  static get template() {
    if (!dialogMemoizedTemplate) {
      const enhancedDialogOverlayTemplate = html`
        <vcf-enhanced-dialog-overlay
          id="overlay"
          on-opened-changed="_onOverlayOpened"
          on-mousedown="_bringOverlayToFront"
          on-touchstart="_bringOverlayToFront"
          theme$="[[theme]]"
          ?modeless="[[modeless]]"
          with-backdrop="[[!modeless]]"
          resizable$="[[resizable]]"
          draggable$="[[draggable]]"
          focus-trap=""
          header="[[header]]"
        >
        </vcf-enhanced-dialog-overlay>
      `;
      dialogMemoizedTemplate = super.template.cloneNode(true);
      dialogMemoizedTemplate.content.querySelector('vaadin-dialog-overlay').remove();
      dialogMemoizedTemplate.content.appendChild(enhancedDialogOverlayTemplate.content);
    }
    return dialogMemoizedTemplate;
  }

  static get is() {
    return 'vcf-enhanced-dialog';
  }

  static get version() {
    return '22.0.7';
  }

  _startDrag(e) {
    if (this.draggable && (e.button === 0 || e.touches)) {
      const resizerContainer = this.$.overlay.$.resizerContainer;
      const isResizerContainer = e.target === resizerContainer;
      const isScrollbar = e.offsetX > resizerContainer.clientWidth || e.offsetY > resizerContainer.clientHeight;
      const isContentPart =
        e.target === this.$.overlay.$.content ||
        e.target === this.$.overlay.$.header ||
        e.target === this.$.overlay.$.dialogContent ||
        e.target === this.$.overlay.$.footer;
      const isDraggable = e.target.classList.contains('draggable');

      if ((isResizerContainer && !isScrollbar) || isContentPart || isDraggable) {
        // Is needed to prevent text selection in Safari
        !this._touchDevice && !isDraggable && e.preventDefault();
        this._originalBounds = this.$.overlay.getBounds();

        const event = getMouseOrFirstTouchEvent(e);

        this._originalMouseCoords = {
          top: event.pageY,
          left: event.pageX
        };
        window.addEventListener('mouseup', this._stopDrag);
        window.addEventListener('touchend', this._stopDrag);
        window.addEventListener('mousemove', this._drag);
        window.addEventListener('touchmove', this._drag);

        if (this.$.overlay.$.overlay.style.position !== 'absolute') {
          this.$.overlay.setBounds(this._originalBounds);
        }
      }
    }
  }
}

export { EnhancedDialogOverlay, EnhancedDialog };

customElements.define(EnhancedDialog.is, EnhancedDialog);

/**
 * @namespace Vaadin
 */
window.Vaadin.VcfEnhancedDialog = EnhancedDialog;
