import React from "react";
import { useAuth } from "react-auth-navigation";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../../hooks";
import { capitalizeFirstLetter, isValid, validator } from "../../../utils";
import {
  Box,
  Button,
  FormInput,
  Grid,
  ImageUpload,
  InputField,
  SelectField,
  Stack,
} from "../../commons";
import { ActivityIndicator, Card, CompWrapper } from "../../hocs";

import UPLOAD from "../../../assets/icons/upload.png";

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
  { name: "Slums", value: "Slums" },
  { name: "Unsafe Buildings", value: "Unsafe Buildings" },
  { name: "Special Buildings", value: "Special Buildings" },
  { name: "Multi-Level Car Parking", value: "Multi-Level Car Parking" },
];

export const AddSample = () => {
  const { toast } = useAuth();
  const [image, setImage] = React.useState([]);

  const dispatch = useDispatch();
  const { addLoading } = useSelector((state) => state.building);

  const { data, onChangeHandler } = useInput({
    sampleName: "",
    sampleType: "",
  });

  const changeImage = (data) => {
    setImage(data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const catchedErrors = {};
    const validate = validator(catchedErrors);

    const { sampleName, sampleType } = data;

    const showMessage = (message) => {
      toast({ message, type: "error" });
    };
    validate("sampleName", sampleName.length === 0, () => {
      showMessage("sampleName can't be empty!");
    });

    validate("sampleType", sampleType.length === 0, () => {
      showMessage("sampleType can't be empty!");
    });

    if (!isValid(catchedErrors)) {
      //   console.error(catchedErrors);
      return;
    }

    let formData = new FormData();
    await formData.append("sampleName", capitalizeFirstLetter(sampleName));

    await formData.append("sampleType", sampleType);
    for (let i = 0; i < image.length; i++) {
      await formData.append("imageFile", image[i].file);
    }

    // FOR INTEGRATION
    // dispatch(
    //   addBuildingAction(
    //     formData,
    //     () => {
    //       navigate(routes["Building"].path);
    //     },
    //     toast,
    //   ),
    // );
  };

  return (
    <CompWrapper>
      <Card>
        <Box>
          <form onSubmit={submitHandler}>
            <Stack direction="column" spacing={16}>
              <FormInput label="Name" required>
                <InputField
                  placeholder="Name"
                  name="sampleName"
                  value={data.sampleName}
                  onChange={onChangeHandler("sampleName")}
                  type="text"
                />
              </FormInput>

              <FormInput label="Type" required>
                <SelectField
                  options={typeList}
                  getOptionLabel="name"
                  getOptionValue="value"
                  onChangeValue={(item) => {
                    onChangeHandler("sampleType", item?.value)();
                  }}
                  isSearchable
                  placeholder="Select Type"
                />
              </FormInput>

              <FormInput label="Images" required>
                <ImageUpload
                  onChange={changeImage}
                  buttonStyle={{ background: "red", display: "inline-block" }}
                  title="upload image"
                  multiple
                  accept="image/*"
                  buttonclick={
                    <Box mt={20}>
                      <div
                        style={{
                          display: "inline-block",
                          border: "1px dashed #000",
                          padding: 50,
                          cursor: "pointer",
                          overflow: "hidden",
                        }}>
                        <img
                          alt="Avatar"
                          link={UPLOAD}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "contain",
                            overflow: "hidden",
                          }}
                        />
                      </div>
                    </Box>
                  }>
                  {({
                    onUploadImage,
                    imageData,
                    onRemove,
                    deleteAllHandler,
                  }) => (
                    <Box>
                      <Grid.Container lg={4} md={2} sm={1}>
                        {imageData &&
                          imageData.map((item, index) => (
                            <div key={index}>
                              <div
                                style={{
                                  position: "relative",
                                  display: "inline-block",
                                  boxShadow: "0px 2px 10px 0px #888888",
                                }}>
                                <img
                                  alt="Avatar"
                                  link={item.url}
                                  style={{
                                    width: 200,
                                    height: 200,
                                    objectFit: "contain",
                                    overflow: "hidden",
                                  }}
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => onRemove(index)}>
                                  <RiCloseCircleFill color="red" size={25} />
                                </div>
                              </div>
                            </div>
                          ))}
                      </Grid.Container>
                    </Box>
                  )}
                </ImageUpload>
              </FormInput>
              <ActivityIndicator animating={addLoading}>
                <Button title="Submit" type="submit" />
              </ActivityIndicator>
            </Stack>
          </form>
        </Box>
      </Card>
    </CompWrapper>
  );
};
