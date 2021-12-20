// react:
import { default as React, useMemo, } from 'react'; // base technology of our cssfn components
export const useSemantic = (props, options = props) => {
    const { tag, role, } = props;
    const { semanticTag, semanticRole, } = options;
    return useMemo(() => {
        const roleAbs = role ?? (Array.isArray(semanticRole) ? (semanticRole?.[0] ?? undefined) : (semanticRole ?? undefined));
        const isDesiredType = !!roleAbs && (Array.isArray(semanticRole) ? semanticRole.includes(roleAbs) : (semanticRole === roleAbs));
        const tagFn = tag ?? (isDesiredType ? (Array.isArray(semanticTag) ? (semanticTag?.[0] ?? undefined) : (semanticTag ?? undefined)) : undefined);
        const isSemanticTag = !!tagFn && (Array.isArray(semanticTag) ? semanticTag.includes(tagFn) : (semanticTag === tagFn));
        const roleFn = isDesiredType ? (isSemanticTag ? '' : roleAbs) : roleAbs; /* `''` => do not render role attribute, `undefined` => lets the BaseComponent decide the appropriate role */
        return [
            tagFn,
            roleFn,
            isDesiredType,
            isSemanticTag,
        ];
        // eslint-disable-next-line
    }, [tag, role, ...(Array.isArray(semanticTag) ? semanticTag : [semanticTag]), ...(Array.isArray(semanticRole) ? semanticRole : [semanticRole])]);
};
export const useTestSemantic = (props, options) => {
    const { semanticTag: props_semanticTag, semanticRole: props_semanticRole, } = props;
    const { semanticTag: options_semanticTag, semanticRole: options_semanticRole, } = options;
    const newOptions = useMemo(() => {
        const semanticTag = (() => {
            if (!props_semanticTag)
                return options_semanticTag;
            if (props_semanticTag === options_semanticTag)
                return options_semanticTag;
            const semanticTag1 = Array.isArray(props_semanticTag) ? props_semanticTag : [props_semanticTag];
            const semanticTag2 = Array.isArray(options_semanticTag) ? options_semanticTag : [options_semanticTag];
            const intersect = semanticTag1.filter((p) => semanticTag2.includes(p));
            return (intersect.length) ? intersect : null;
        })();
        const semanticRole = (() => {
            if (!props_semanticRole)
                return options_semanticRole;
            if (props_semanticRole === options_semanticRole)
                return options_semanticRole;
            const semanticRole1 = Array.isArray(props_semanticRole) ? props_semanticRole : [props_semanticRole];
            const semanticRole2 = Array.isArray(options_semanticRole) ? options_semanticRole : [options_semanticRole];
            const intersect = semanticRole1.filter((p) => semanticRole2.includes(p));
            return (intersect.length) ? intersect : null;
        })();
        return {
            semanticTag,
            semanticRole,
        };
    }, [props_semanticTag, props_semanticRole, options_semanticTag, options_semanticRole]);
    return useSemantic(props, newOptions);
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
    // className:
    const { mainClass, classes, variantClasses, stateClasses, } = props;
    const className = useMemo(() => {
        return (Array.from(new Set([
            // main:
            mainClass,
            // additionals:
            ...(classes ?? []),
            // variants:
            ...(variantClasses ?? []),
            // states:
            ...(stateClasses ?? []),
        ].filter((c) => !!c))).join(' ')
            ||
                undefined);
    }, [mainClass, classes, variantClasses, stateClasses]);
    // fn props:
    const [tag, role] = useSemantic(props);
    const Tag = (tag || 'div'); // ignores an empty string '' of tag
    // jsx:
    return (React.createElement(Tag
    // other props:
    , { ...htmlProps, 
        // semantics:
        role: role || undefined, "aria-label": props['aria-label'] || undefined, 
        // classes:
        className: className }, props.children));
}
export { Element as default };
