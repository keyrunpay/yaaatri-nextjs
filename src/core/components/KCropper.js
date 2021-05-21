import React from "react";
import Cropper from "cropperjs";
import "cropperjs";
import "cropperjs/dist/cropper.css";

class CropperJS extends React.Component {
  componentDidMount() {
    var options = {};
    for (var prop in this.props) {
      if (prop !== "src" && prop !== "alt" && prop !== "crossOrigin") {
        options[prop] = this.props[prop];
      }
    }
    this.cropper = new Cropper(this.refs.img, options);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.replace(nextProps.src);
    }
    if (nextProps.aspectRatio !== this.props.aspectRatio) {
      this.setAspectRatio(nextProps.aspectRatio);
    }
  }

  componentWillUnmount() {
    if (this.cropper) {
      // Destroy the cropper, this makes sure events such as resize are cleaned up and do not leak
      this.cropper.destroy();
      // While we're at it remove our reference to the jQuery instance
      //   delete this.$img;
    }
  }

  move(offsetX, offsetY) {
    return this.cropper.move(offsetX, offsetY);
  }

  zoom(ratio) {
    return this.cropper.zoom(ratio);
  }

  rotate(degree) {
    return this.cropper.rotate(degree);
  }

  enable() {
    return this.cropper.enable();
  }

  disable() {
    return this.cropper.disable();
  }

  reset() {
    return this.cropper.reset();
  }

  clear() {
    return this.cropper.clear();
  }

  replace(url) {
    return this.cropper.replace(url);
  }

  getData(rounded) {
    return this.cropper.getData(rounded);
  }

  setData(data) {
    return this.cropper.setData(data);
  }

  getContainerData() {
    return this.cropper.getContainerData();
  }

  getImageData() {
    return this.cropper.getImageData();
  }

  getCanvasData() {
    return this.cropper.getCanvasData();
  }

  setCanvasData(data) {
    return this.cropper.setCanvasData(data);
  }

  getCropBoxData() {
    return this.cropper.getCropBoxData();
  }

  setCropBoxData(data) {
    return this.cropper.setCropBoxData(data);
  }

  getCroppedCanvas(options) {
    return this.cropper.getCroppedCanvas(options);
  }

  setAspectRatio(aspectRatio) {
    return this.cropper.setAspectRatio(aspectRatio);
  }

  setDragMode() {
    return this.cropper.setDragMode();
  }

  render() {
    const imgStyle = {
      opacity: 0,
    };
    return (
      <div style={this.props.style} src={null} crossOrigin={null} alt={null}>
        <img
          crossOrigin={this.props.crossOrigin}
          ref="img"
          src={this.props.src}
          alt={this.props.alt === undefined ? "picture" : this.props.alt}
          style={imgStyle}
        />
      </div>
    );
  }
}

export default CropperJS;
