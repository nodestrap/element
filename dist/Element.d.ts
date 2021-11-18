import { default as React } from 'react';
import type { Optional, SingleOrArray } from '@cssfn/types';
export declare type Tag = keyof JSX.IntrinsicElements;
export declare type Role = React.AriaRole;
export declare type SemanticTag = SingleOrArray<Optional<Tag>>;
export declare type SemanticRole = SingleOrArray<Optional<Role>>;
export interface SemanticOptions {
    semanticTag?: SemanticTag;
    semanticRole?: SemanticRole;
}
export interface SemanticProps extends SemanticOptions, React.AriaAttributes {
    tag?: Tag;
    role?: Role;
}
export declare const useSemantic: (props: SemanticProps, options?: SemanticOptions) => readonly [keyof JSX.IntrinsicElements | undefined, React.AriaRole | undefined, boolean, boolean];
export declare const useTestSemantic: (props: SemanticProps, options: SemanticOptions) => readonly [keyof JSX.IntrinsicElements | undefined, React.AriaRole | undefined, boolean, boolean];
export interface ElementProps<TElement extends HTMLElement = HTMLElement> extends React.DOMAttributes<TElement>, SemanticProps {
    style?: React.CSSProperties;
    elmRef?: React.Ref<TElement>;
    id?: string;
    mainClass?: Optional<string>;
    classes?: Optional<string>[];
    variantClasses?: Optional<string>[];
    stateClasses?: Optional<string>[];
}
export declare function Element<TElement extends HTMLElement = HTMLElement>(props: ElementProps<TElement>): JSX.Element;
export { Element as default };
