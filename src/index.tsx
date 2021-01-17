import React from 'react';
import './index.scss';



export interface Props {
    className?: string;

    children?: React.ReactNode
}

export interface State {
    hover: boolean;
    leave: boolean;
}

export default class Element extends React.Component<Props, State> {
    state: State = {
        hover: false,
        leave: false,
    };



    constructor(props: Props) {
        super(props);

        this.bindFunctions.bind(this);
        this.bindFunctions([
            this.handleMouseEnter,
            this.handleMouseLeave,
            this.handleAnimationEnd
        ]);
    }



    protected bindFunctions(functs: Function[]) {
        for (let i = 0; i < functs.length; i++) functs[i].bind(this);
    }



    get defaultClassName(): string {
        return "elm";
    }
    get className(): string {
        return this.props.className || this.defaultClassName;
    }
    get compositeClassName(): string {
        return [
            this.className,
            (this.state.hover && 'hover') || (this.state.leave && 'leave') || ''
        ].join(' ');
    }



    handleMouseEnter() {
        this.setState({
            hover: true,
            leave: false,
        });
    }
    handleMouseLeave() {
        this.setState({
            hover: false,
            leave: true,
        });
    }

    handleAnimationEnd() {
        this.setState({
            hover: false,
            leave: false,
        });
    }



    render() {
        return (
            <div
                className={this.compositeClassName}

                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}

                onAnimationEnd={this.handleAnimationEnd}
            >
                {this.props.children || 'abstract class element'}
            </div>
        );
    }
}