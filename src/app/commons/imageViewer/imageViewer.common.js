import React from "react";
import { AnimatedBlock, interpolate, useMountedValue } from "react-ui-animate";
import { MdClose } from "react-icons/all";

const ImageViewer = ({ open, close, activeImage }) => {
  const mountedValue = useMountedValue(open, [0, 1, 0]);

  return (
    <>
      {mountedValue(
        (animation, mounted) =>
          mounted && (
            <AnimatedBlock
              className="imageviewer-container"
              style={{
                opacity: animation.value,
              }}>
              <AnimatedBlock
                className="imageviewer"
                style={{
                  transform: interpolate(
                    animation.value,
                    [0, 1],
                    ["scale(0.9)", "scale(1)"],
                  ),
                }}>
                <div className="imageviewer-close">
                  <div className="close-button" onClick={() => close(false)}>
                    <MdClose size={24} />
                  </div>
                </div>

                <img key={activeImage} src={activeImage} alt="ActiveGallery" />
              </AnimatedBlock>
            </AnimatedBlock>
          ),
      )}
    </>
  );
};

export default ImageViewer;
