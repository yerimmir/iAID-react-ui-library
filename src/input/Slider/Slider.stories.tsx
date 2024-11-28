import React from "react";
import { SliderLabel } from "../../label/SliderLabel";
import { Slider } from "./Slider";
// import "../../theme/default/scss/Slider/_index.scss";

export default {
  component: Slider,
  title: "Slider",
};

const Template = (args) => {
  return <Slider {...args}>
    <SliderLabel position={1} vertical={true}>1</SliderLabel>
    <SliderLabel position={2} vertical={true}>2</SliderLabel>
    <SliderLabel position={3} vertical={true}>3</SliderLabel>
    <SliderLabel position={4} vertical={true}>4</SliderLabel>
    <SliderLabel position={5} vertical={true}>5</SliderLabel>
    <SliderLabel position={6} vertical={true}>6</SliderLabel>
    <SliderLabel position={7} vertical={true}>7</SliderLabel>
    <SliderLabel position={8} vertical={true}>8</SliderLabel>
    <SliderLabel position={9} vertical={true}>9</SliderLabel>
    <SliderLabel position={10} vertical={true}>10</SliderLabel>
  </Slider>;
};

export const SliderTS = Template.bind({});

const style = {
  width: "300px",
  height: "200px",
  // padding: "10px",
  margin: "40px",
  // border: "1px solid black",
};

SliderTS.args = {
  min: 1,
  max: 10,
  // defaultValue: 50,
  vertical: true,
  showValue: false,
  showHandle: false,
  click: true,
  style: style,
  dir: "rtl",
  // componentStyle: {
  //   dragHandle: {backgroundColor: 'red'},
    // sliderTrackSelection: {backgroundColor: 'red'},
    // sliderTrack: {backgroundColor: 'purple', border: '1px solid black', height: '100px'},
  //   value: {color: 'white', backgroundColor: 'red', padding: '10px'}
  // }
};
