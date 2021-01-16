import React from 'react';


interface Props {
    className?: string,
}

interface State {
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

        ([
            this.handleMouseEnter,
            this.handleMouseLeave,
            this.handleAnimationEnd,
        ] as Function[])
        .forEach((func) => func.bind(this));
    }


    protected get classNameDefault(): string {
        return "elm";
    }
    get className(): string {
        return [
            this.props.className || this.classNameDefault,
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
                className={this.className}

                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}

                onAnimationEnd={this.handleAnimationEnd}
            >
                abstract class element
            </div>
        );
    }
}