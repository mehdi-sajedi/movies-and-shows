import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './CustomRange.module.scss';
import Slider, {
  createSliderWithTooltip,
  // Range,
} from 'rc-slider';
import 'rc-slider/assets/index.css';
const Range = createSliderWithTooltip(Slider.Range);

const CustomRange = ({
  name,
  defaults,
  state,
  action,
  min,
  max,
  step,
  tipFormatter,
  marks,
}) => {
  const { filterState, dispatchFilter } = useContext(AppContext);

  const railStyle = {
    // backgroundColor: 'black',
    // height: '100%',
    // position: 'absolute',
    // top: '0',
    // left: '0',
  };

  const trackStyle = [
    {
      // backgroundColor: 'skyblue',
      // height: '50%',
    },
  ];

  const handleStyle = [
    {
      // backgroundColor: 'dodgerblue',
      // padding: '15px',
      // position: 'absolute',
      // top: '-50%',
      // left: '50%',
    },
  ];

  const dotStyle = {
    // backgroundColor: 'dodgerblue',
    borderColor: 'skyblue',
    opacity: '0.75',
  };

  const handleSliderChange = (values) => {
    console.log(values);
    dispatchFilter({ type: action, payload: values });
  };

  return (
    <>
      <h3 className={styles.name}>{name}</h3>
      <Range
        className={styles.range}
        onChange={(values) => handleSliderChange(values)}
        defaultValue={defaults}
        value={state}
        min={min}
        max={max}
        railStyle={railStyle}
        trackStyle={trackStyle}
        handleStyle={handleStyle}
        dotStyle={dotStyle}
        step={step}
        tipProps={{
          placement: 'top',
          visible: true,
        }}
        tipFormatter={tipFormatter}
        marks={marks}
      />
    </>
  );
};

export default React.memo(CustomRange);
