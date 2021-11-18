// react:
import { default as React, useMemo, } from 'react'; // base technology of our cssfn components
export const useSemantic = (props, options = props) => {
    const roleAbs = props.role ?? (Array.isArray(options.semanticRole) ? (options.semanticRole?.[0] ?? undefined) : (options.semanticRole ?? undefined));
    const isDesiredType = !!roleAbs && (Array.isArray(options.semanticRole) ? options.semanticRole.includes(roleAbs) : (options.semanticRole === roleAbs));
    const tagFn = props.tag ?? (isDesiredType ? (Array.isArray(options.semanticTag) ? (options.semanticTag?.[0] ?? undefined) : (options.semanticTag ?? undefined)) : undefined);
    const isSemanticTag = !!tagFn && (Array.isArray(options.semanticTag) ? options.semanticTag.includes(tagFn) : (options.semanticTag === tagFn));
    const roleFn = isDesiredType ? (isSemanticTag ? '' : roleAbs) : roleAbs; /* `''` => do not render role attribute, `undefined` => lets the BaseComponent decide the appropriate role */
    return [
        tagFn,
        roleFn,
        isDesiredType,
        isSemanticTag,
    ];
};
export const useTestSemantic = (props, options) => {
    const semanticTag = (() => {
        if (!props.semanticTag)
            return options.semanticTag;
        if (props.semanticTag === options.semanticTag)
            return options.semanticTag;
        const semanticTag1 = Array.isArray(props.semanticTag) ? props.semanticTag : [props.semanticTag];
        const semanticTag2 = Array.isArray(options.semanticTag) ? options.semanticTag : [options.semanticTag];
        const intersect = semanticTag1.filter((p) => semanticTag2.includes(p));
        return (intersect.length) ? intersect : null;
    })();
    const semanticRole = (() => {
        if (!props.semanticRole)
            return options.semanticRole;
        if (props.semanticRole === options.semanticRole)
            return options.semanticRole;
        const semanticRole1 = Array.isArray(props.semanticRole) ? props.semanticRole : [props.semanticRole];
        const semanticRole2 = Array.isArray(options.semanticRole) ? options.semanticRole : [options.semanticRole];
        const intersect = semanticRole1.filter((p) => semanticRole2.includes(p));
        return (intersect.length) ? intersect : null;
    })();
    return useSemantic(props, { semanticTag, semanticRole });
};
// react components:
const htmlPropList = [
    // All HTML Attributes
    'accept',
    'acceptCharset',
    'action',
    'allowFullScreen',
    'allowTransparency',
    'alt',
    'as',
    'async',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'capture',
    'cellPadding',
    'cellSpacing',
    'charSet',
    'challenge',
    'checked',
    'cite',
    'classID',
    'cols',
    'colSpan',
    'content',
    'controls',
    'coords',
    'crossOrigin',
    'data',
    'dateTime',
    'default',
    'defer',
    'disabled',
    'download',
    'encType',
    'form',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'headers',
    'height',
    'high',
    'href',
    'hrefLang',
    'htmlFor',
    'httpEquiv',
    'integrity',
    'keyParams',
    'keyType',
    'kind',
    'label',
    'list',
    'loop',
    'low',
    'manifest',
    'marginHeight',
    'marginWidth',
    'max',
    'maxLength',
    'media',
    'mediaGroup',
    'method',
    'min',
    'minLength',
    'multiple',
    'muted',
    'name',
    'nonce',
    'noValidate',
    'open',
    'optimum',
    'pattern',
    'placeholder',
    'playsInline',
    'poster',
    'preload',
    'readOnly',
    'rel',
    'required',
    'reversed',
    'rows',
    'rowSpan',
    'sandbox',
    'scope',
    'scoped',
    'scrolling',
    'seamless',
    'selected',
    'shape',
    'size',
    'sizes',
    'span',
    'src',
    'srcDoc',
    'srcLang',
    'srcSet',
    'start',
    'step',
    'summary',
    'target',
    'type',
    'useMap',
    'value',
    'width',
    'wmode',
    'wrap',
    // Standard HTML Attributes:
    'accessKey',
    // 'className',
    'contentEditable',
    'contextMenu',
    'dir',
    'draggable',
    'hidden',
    'id',
    'lang',
    'slot',
    'spellCheck',
    'style',
    'title',
    'translate',
    // accessibilities:
    'tabIndex',
    // values:
    'defaultValue',
    // more:
    'referrerPolicy',
    'ping',
];
const isHtmlProp = (propName) => propName.startsWith('on') || propName.startsWith('aria-') || htmlPropList.includes(propName);
export function Element(props) {
    // html props:
    const htmlProps = useMemo(() => {
        const htmlProps = {
            ref: props.elmRef,
        };
        for (const name in props) {
            if (isHtmlProp(name)) {
                htmlProps[name] = props[name];
            } // if
        } // for
        return htmlProps;
    }, [props]);
    // fn props:
    const [tag, role] = useSemantic(props);
    const Tag = (tag ?? 'div');
    // jsx:
    return (<Tag 
    // other props:
    {...htmlProps} 
    // semantics:
    role={role || undefined} aria-label={props['aria-label'] || undefined} 
    // classes:
    className={Array.from(new Set([
            // main:
            props.mainClass,
            // additionals:
            ...(props.classes ?? []),
            // variants:
            ...(props.variantClasses ?? []),
            // states:
            ...(props.stateClasses ?? []),
        ].filter((c) => !!c))).join(' ') || undefined}>
            {props.children}
        </Tag>);
}
export { Element as default };
