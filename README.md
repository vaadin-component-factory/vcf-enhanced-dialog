# &lt;vcf-enhanced-dialog&gt;

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vaadin/web-components?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![npm version](https://badgen.net/npm/v/@vaadin-component-factory/vcf-enhanced-dialog)](https://www.npmjs.com/package/@vaadin-component-factory/vcf-enhanced-dialog)
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadin-component-factoryvcf-enhanced-dialog)

`<vcf-enhanced-dialog>` is a Web Component for creating customized modal dialogs.

This is an extension of [`<vaadin-dialog>`](https://vaadin.com/components/vaadin-dialog/html-api/elements/Vaadin.DialogElement)
that adds the following features:

- Header and footer sections.
- Scrollable content area.
- Size themes.

![Screenshot for Vaadin Component Factory enhanced dialog](https://user-images.githubusercontent.com/3392815/86490846-8e9f9a80-bd71-11ea-99cd-8e0a769ed8dd.png)

[Live demo ↗](https://vcf-enhanced-dialog.netlify.app)
|
[API documentation ↗](https://vcf-enhanced-dialog.netlify.app/api/#/elements/vcf-enhanced-dialog)

## Installation

Install `vcf-enhanced-dialog`:

```sh
npm i @vaadin-component-factory/vcf-enhanced-dialog --save
```

## Usage

Once installed, import it in your application:

```js
import '@vaadin-component-factory/vcf-enhanced-dialog';
```

Add `<vcf-enhanced-dialog>` element to the page. Use a `<template>` or [renderer](https://vcf-enhanced-dialog.netlify.app/api/#/elements/vcf-enhanced-dialog#description) function to add content to the dialog.

```html
<vcf-enhanced-dialog>
  <template>
    <h2 slot="header">Header</h2>
    <p>...</p>
    <vaadin-button slot="footer" onclick="cancel()">Cancel</vaadin-button>
  </template>
</vcf-enhanced-dialog>
```

## Running demo

1. Fork the `vcf-enhanced-dialog` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vcf-enhanced-dialog` directory, run `npm install` to install dependencies.

1. Run `npm start` to open the demo.

## Server-side API

This is the client-side (Polymer 3) web component. If you are looking for the server-side (Java) API for the Vaadin Platform, it can be found here: [Enhanced Dialog](https://vaadin.com/directory/component/enhanced-dialog)

## License

Apache License 2.0