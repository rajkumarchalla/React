import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {toNumber} from "lodash";
import { mapToCssModules, tagPropType } from "./utils";
import styles from "./styles.css";

const propTypes = {
  children: PropTypes.node,
  bar: PropTypes.bool,
  multi: PropTypes.bool,
  handle: PropTypes.func,
  tag: tagPropType,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  barClassName: PropTypes.string,
  title: PropTypes.string,
  cssModule: PropTypes.object,
  onClick: PropTypes.func
};

const defaultProps = {
  tag: "div",
  value: 0,
  max: 100,
  animated: false
};

const Progress = props => {
  const {
    children,
    className,
    barClassName,
    cssModule,
    value,
    max,
    animated,
    striped,
    color,
    lableColor,
    bar,
    circular,
    tag: Tag,
    title,
    onClick,
    ...attributes
  } = props;

  const percent = (toNumber(value) / toNumber(max)) * 100;

  const progressClasses = mapToCssModules(
    classNames(
      className
      // 'progress'
    ),
    cssModule
  );

  const progressBarClasses = mapToCssModules(
    classNames(
      "progress-bar",
      bar ? className || barClassName : barClassName,
      animated ? "progress-bar-animated" : null,
      color ? `bg-${color}` : null,
      striped || animated ? "progress-bar-striped" : null
    ),
    cssModule
  );

  const circularProgressBarClasses = classNames(
    classNames(
      animated ? "progress-bar-animated" : null,
      color ? `bg-${color}` : null,
      striped || animated ? "progress-bar-striped" : null
    ),
    cssModule
  )


  const circularProgressBarLabelClasses = classNames(
    
  )

  const ProgressBar = circular ? (
    <div className={styles.progress} onClick={onClick} >
      <span className={styles.progressleft}>
        <span className={styles.progressbar}></span>
      </span>
      <span className={styles.progressright}>
        <span className={styles.progressbar}></span>
      </span>
      <div className={styles.progressvalue} style={{ color: lableColor} }>90%</div>
</div>
  ) : (
    <div className="container" onClick={onClick}>
      <div className="row">
        <div className="col-sm">
          <span className={styles.ovlabel} style={{ color: lableColor} } data-testid="progress-displa">
            {title}
          </span>
        </div>
        <div className="col-sm" >
          <div className="progress">
          <span data-testid="progress-display">
            <div
              className={progressBarClasses}
              style={{ width: `${percent}%` }}
              role="progressbar"
              aria-valuenow={value}
              aria-valuemin="0"
              aria-valuemax={max}
              children={children}
            />
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (bar) {
    return ProgressBar;
  }

  return (
    <Tag {...attributes} className={progressClasses} children={ProgressBar} />
  );
};

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

export default Progress;
