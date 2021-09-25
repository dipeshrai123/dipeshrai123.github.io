import React, { useState } from "react";
import propTypes from "prop-types";

import { Modal } from "react-uicomp";
import { Box } from "../../commons";

export const CustomModal = ({ displayElement, children }) => {
  const [visible, setVisible] = useState(false);

  const onCloseModalHandler = () => {
    setVisible(false);
  };

  return (
    <Box>
      <Box
        onClick={(e) => {
          e.preventDefault();
          setVisible(true);
        }}>
        {displayElement}
      </Box>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        onOutsideClick={() => setVisible(false)}>
        {children({ onCloseModalHandler })}
      </Modal>
    </Box>
  );
};

CustomModal.propTypes = {
  displayElement: propTypes.element.isRequired,
  children: propTypes.func.isRequired,
};
