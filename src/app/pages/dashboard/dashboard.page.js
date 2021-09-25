import React from "react";
import { AiFillDelete, MdAdd } from "react-icons/all";

import {
  Text,
  Button,
  Stack,
  ConfirmationModal,
  Box,
  SelectField,
  SelectFieldBorderless,
} from "../../commons";
import { CompWrapper, Card } from "../../hocs";

const typeList = [
  { name: "Residential Buildings", value: "Residential Buildings" },
  { name: "Educational Buildings", value: "Educational Buildings" },
  { name: "Institutional Buildings", value: "Institutional Buildings" },
  { name: "Assembly Buildings", value: "Assembly Buildings" },
  { name: "Business Buildings", value: "Business Buildings" },
  { name: "Mercantile Buildings", value: "Mercantile Buildings" },
  { name: "Industrial Buildings", value: "Industrial Buildings" },
  { name: "Storage Buildings", value: "Storage Buildings" },
  { name: "Wholesale Establishments", value: "Wholesale Establishments" },
  { name: "Mixed Land Use Buildings", value: "Mixed Land Use Buildings" },
  { name: "Hazardous Buildings", value: "Hazardous Buildings" },
  { name: "Detached Buildings", value: "Detached Buildings" },
  { name: "Semi-Detached Buildings", value: "Semi-Detached Buildings" },
  {
    name: "Multi-Storey or High Rise Buildings",
    value: "Multi-Storey or High Rise Buildings",
  },
];
export const Dashboard = () => {
  return (
    <CompWrapper>
      <Stack direction="row" spacing={20}>
        <Card>
          <Text button>Button</Text>
          <Text caption>Caption</Text>
          <Text body>Body</Text>
          <Text heading>Heading</Text>
          <Text subheading>Subheading</Text>
          <Text pageheading>Pageheading</Text>
          <Text displaymedium>Displaymedium</Text>
          <Text displaylarge>Displaylarge</Text>
          <Text displayxlarge>Displayxlarge</Text>
        </Card>

        <Card>
          <Button.Ripple
            leftIcon={
              <MdAdd size={16} style={{ position: "relative", top: 2 }} />
            }
            title="Ripple Button"
          />
          <Button.Icon icon={<MdAdd size={16} />} />
          <Button
            leftIcon={
              <MdAdd size={16} style={{ position: "relative", top: 2 }} />
            }
            title="Button Button"
          />
          <Box mt={20}>
            <ConfirmationModal
              displayElement={
                <Button
                  leftIcon={
                    <AiFillDelete
                      size={16}
                      style={{ position: "relative", top: 2 }}
                    />
                  }
                  title="Delete"
                />
              }
              label="Are you sure you want to delete ?"
              onConfirmClick={(callback) => {
                callback();
              }}
              confirmLabel="Delete"
              danger
            />

            <SelectField
              borderless
              options={typeList}
              getOptionLabel="name"
              getOptionValue="value"
              onChangeValue={() => {}}
              isSearchable
              placeholder="Select Type"
            />
          </Box>
        </Card>
      </Stack>
    </CompWrapper>
  );
};
