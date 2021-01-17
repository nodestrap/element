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



    get defaultClassName(): string {
        return '';
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

    handleAnimationEnd(e: React.MouseEvent) {
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