import React from 'react';
import './index.scss';



export interface Props {
    className?: string;
}

export interface State {
    hover: boolean;
    leave: boolean;
}

export default class Element<TProps extends Props, TState extends State> extends React.Component<TProps, TState> {
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
        return [
            this.className,
            (state.hover && '') ?? (state.leave && 'leave') ?? '',
        ].join(' ');
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