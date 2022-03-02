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
export class EnhancedDialogOverlay extends OverlayElement {
    static get is(): string;
    static get template(): any;
    static get properties(): {
        /**
         * @type {Boolean}
         */
        modeless: boolean;
        /**
         * @type {Boolean}
         */
        withBackdrop: boolean;
    };
    ready(): void;
    _slotEmptyAttribute(slot: any): void;
    /**
     * Updates the coordinates of the overlay.
     * @param {!DialogOverlayBoundsParam} bounds
     */
    setBounds(bounds: DialogOverlayBoundsParam): void;
    /**
     * Retrieves the coordinates of the overlay.
     * @return {!DialogOverlayBounds}
     */
    getBounds(): DialogOverlayBounds;
    /**
     * Safari 13 renders overflowing elements incorrectly.
     * This forces it to recalculate height.
     * @private
     */
    private __forceSafariReflow;
}
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
export class EnhancedDialog extends Dialog {
    static get template(): any;
    static get is(): string;
    static get version(): string;
    _startDrag(e: any): void;
    _originalBounds: any;
    _originalMouseCoords: {
        top: number;
        left: number;
    };
}
import { OverlayElement } from "@vaadin/vaadin-overlay/src/vaadin-overlay.js";
import { DialogOverlayBoundsParam } from "@vaadin/dialog/src/vaadin-dialog";
import { DialogOverlayBounds } from "@vaadin/dialog/src/vaadin-dialog";
import { Dialog } from "@vaadin/dialog/src/vaadin-dialog";
//# sourceMappingURL=vcf-enhanced-dialog.d.ts.map