# &lt;Element /&gt;

A basic building block without any applied stylesheet of nodestrap components.  
This is the most generic element for the base of (more) complex components.

## Preview

```jsx
<Element>
    hello world
</Element>
```
Rendered to:
```html
<div>
    hello world
</div>
```
-----
```jsx
<Element tag='span' classes={['button', 'awesome']} variantClasses={['big', 'dark']} stateClasses={['hovered']}>
    hello world
</Element>
```
Rendered to:
```html
<span class="button awesome big dark hovered">
    hello world
</span>
```
-----
```jsx
<Element semanticTag={['ul', 'ol']} semanticRole='list'>
    hello world
</Element>
<Element semanticTag={['ul', 'ol']} semanticRole='list' tag='ul'>
    hello world
</Element>
<Element semanticTag={['ul', 'ol']} semanticRole='list' tag='ol'>
    hello world
</Element>
<Element semanticTag={['ul', 'ol']} semanticRole='list' tag='div'>
    hello world
</Element>
```
Rendered to:
```html
<ul>
    hello world
</ul>
<ul>
    hello world
</ul>
<ol>
    hello world
</ol>
<div role="list">
    hello world
</div>
```

## Features
* Dynamic tag name `tag='div'`.
* Smart semantic tag & role.
* Access the DOM element via `elmRef=` (similar to `ref=`).

## Installation

Using npm:
```
npm i @nodestrap/element
```

## Support Us

If you feel our lib is useful for your projects,  
please make a donation to avoid our project from extinction.

We always maintain our projects as long as we're still alive.

[[Make a donation](https://ko-fi.com/heymarco)]
