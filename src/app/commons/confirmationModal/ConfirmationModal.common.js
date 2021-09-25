import React from "react";
import propTypes from "prop-types";

import { ActivityIndicator, CustomModal } from "../../hocs";
import { Button, Box, Text } from "../index";
import { colors } from "../../../modules/colors.module";

export const ConfirmationModal = ({
  displayElement,
  label,
  onConfirmClick,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  danger,
}) => {
  return (
    <CustomModal displayElement={displayElement}>
      {({ onCloseModalHandler }) => (
        <Box flexBox vertical>
          <Box flexBox>
            <Text>{label}</Text>
          </Box>
          <ActivityIndicator animating={loading}>
            <Box
              flexBox
              jEnd
              alCenter
              style={{
                width: "100%",
                float: "right",
              }}>
              <Button.Ripple
                onClick={() => {
                  onCloseModalHandler();
                }}
                type="button"
                title={cancelLabel}
              />
              <Button.Ripple
                style={{
                  background: !!danger
                    ? colors.light.red
                    : colors.light.primary200,
                  color: "white",
                }}
                type="button"
                onClick={() => {
                  onConfirmClick(onCloseModalHandler);
                }}
                title={confirmLabel}
              />
            </Box>
          </ActivityIndicator>
        </Box>
      )}
    </CustomModal>
  );
};

ConfirmationModal.propTypes = {
  displayElement: propTypes.element.isRequired,
  label: propTypes.string.isRequired,
  onConfirmClick: propTypes.func.isRequired,
  onCancelClick: propTypes.func,
  confirmLabel: propTypes.string,
  cancelLabel: propTypes.string,
  loading: propTypes.bool,
};
