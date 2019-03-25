import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import Button from 'react-bootstrap/Button'

const propTypes = {
    children: PropTypes.node,
    multi: PropTypes.bool,
    handle: PropTypes.func,
    onClick: PropTypes.func,
    tag: PropTypes.tag,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    animated: PropTypes.bool,
    color: PropTypes.string,
    className: PropTypes.string,
    barClassName: PropTypes.string,
    cssModule: PropTypes.object,
    btTitle: PropTypes.string,
    type: PropTypes.string,
    close: PropTypes.bool,
    active: PropTypes.bool
};
const defaultProps = {
    tag: "div",
    value: 0,
    text: "Sample bttttn",
    title : "ccccc"
};
const ExampleButton = props => {
    const {
        className,
        barClassName,
        cssModule,
        value,
        max,
        animated,
        striped,
        color,
        lableColor,
        close,
        onClick,
        active,
        circular,
        tag: Tag,
        btTitle,
        type,
        ...attributes
    } = props;


    const ExampleButtonP = (

        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <span className="default" style={{ color: lableColor }}>
                    <h1> Button Test </h1>
                    <button className={styles.buttonStyle}  color={props.lableColor} type={type} onClick={onClick}  lableColor={styles.buttonStyle} > {btTitle} </button> <br/> 
                    <Button className={styles.buttonStyle} variant="outline-primary" size="lg" block onClick={onClick} > {btTitle} </Button>
                    </span>
                </div>
            </div>
        </div>
    );
    if (ExampleButton) {
        return ExampleButtonP;
    }
    return (
        <Tag {...attributes} className={ExampleButton} children={ExampleButton} />
    );
};

ExampleButton.propTypes = propTypes;
ExampleButton.defaultProps = defaultProps;

export default ExampleButton;