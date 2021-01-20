import React from 'react';
import './index.scss';



export interface VariantSize {
    size?: 'sm' | 'lg';
}
export interface VariantTheme {
    theme?: string;
}



export interface Props {
    className?: string;
}

export interface State {
    hover: boolean;
    leave: boolean;
}

export default class Element<TProps extends Props = Props, TState extends State = State> extends React.Component<TProps, TState> {
    state: TState = { } as TState;



    constructor(props: TProps) {
        super(props);


        const state = this.state;

        state.hover = false;
        state.leave = false;
    }



    get defaultClassName(): string {
        return '';
    }
    get className(): string {
        return this.props.className ?? this.defaultClassName;
    }
    get compositeClassName(): string {
        const state = this.state;
        const props = this.props;
        return [
            // custom class(es):
            this.className,

            // states:
            (state.hover && ' ') || (state.leave && 'leave') || ' ',

            // variants:
            ((props as VariantTheme).theme || ' '),
            ((props as VariantSize).size || ' '),
        ]
        .filter(c => (c != ' ') && (c != '')) // removes blank classes
        .join(' '); // combines all classes separated by space
    }



    handleMouseEnter(e: React.MouseEvent) {
        this.setState({
            hover: true,
            leave: false,
        });
    }
    handleMouseLeave(e: React.MouseEvent) {
        this.setState({
            hover: false,
            leave: true,
        });
    }

    handleAnimationEnd(e: React.AnimationEvent) {
        this.setState({
            leave: false, // clean up leaving animation
        });
    }



    render() {
        return (
            <div
                className={this.compositeClassName}

                onMouseEnter={(e)   => this.handleMouseEnter(e)}
                onMouseLeave={(e)   => this.handleMouseLeave(e)}

                onAnimationEnd={(e) => this.handleAnimationEnd(e)}
            >
                {this.props.children ?? 'abstract class element'}
            </div>
        );
    }
}