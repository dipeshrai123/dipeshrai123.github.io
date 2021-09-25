import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth, useNavigation } from "react-auth-navigation";
import { useHistory } from "react-router-dom";

import { useDocTitle } from "../../../../hooks/useDocTitle.hook";
import { capitalizeFirstLetter, isValid, validator } from "../../../../utils";
import { useInput } from "../../../../hooks";
import { ActivityIndicator, Card, CompWrapper } from "../../../hocs";
import {
  Box,
  Button,
  FormInput,
  // GooglePlaces,
  Grid,
  ImageUpload,
  InputField,
  SelectField,
} from "../../../commons";
import { editBuildingAction, getBuildingDetailAction } from "../../../../redux";

import UPLOAD from "../../../../assets/icons/upload.png";
import { RiCloseCircleFill } from "react-icons/ri";
import { FILE_URL } from "../../../../config";

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

const EditComponent = () => {
  const { toast } = useAuth();
  const { navigation } = useNavigation();
  const { navigate, routes } = navigation;
  const history = useHistory();
  const dispatch = useDispatch();
  const { editLoading, detail } = useSelector((state) => state.building);

  useDocTitle("Edit Building");
  const { data, onChangeHandler } = useInput({
    name: detail.prop_name,
    email: detail.prop_address.value,
    stairs: detail.stairs ?? "",
    buildingType: detail.prop_type,
    constructions: detail.prop_construction,
  });

  const [removedImage, setRemovedImage] = useState([]);
  const [image, setImage] = React.useState([]);
  const [locationName, setLocationName] = React.useState(
    detail.prop_address.value,
  );
  const changeImage = (data) => {
    setImage(data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const catchedErrors = {};
    const validate = validator(catchedErrors);

    const { email, name, stairs, buildingType, constructions } = data;

    const showMessage = (message) => {
      toast({ message, type: "error" });
    };
    validate("name", name.length === 0, () => {
      showMessage("Name musn't be empty!");
    });

    validate("address", locationName.length === 0, () => {
      showMessage("Address musn't be empty!");
    });

    validate("constructions", constructions.length === 0, () => {
      showMessage("Constructions can't be empty!");
    });

    validate("buildingType", buildingType.length === 0, () => {
      showMessage("BuildingType can't be empty!");
    });

    if (!isValid(catchedErrors)) {
      //   console.error(catchedErrors);
      return;
    }

    let formData = new FormData();
    await formData.append("propName", capitalizeFirstLetter(name));
    await formData.append(
      "propConstruction",
      capitalizeFirstLetter(constructions),
    );
    await formData.append("propType", buildingType);
    image.length > 0 &&
      image.forEach(async (element) => {
        await formData.append("imageFile", element.file);
      });

    // FOR INTEGRATION
    // dispatch(
    //   editBuildingAction(
    //     detail.id,
    //     formData,
    //     () => {
    //       // navigate(routes["Building"].path);

    //       history.goBack();
    //     },
    //     toast,
    //     removedImage,
    //   ),
    // );
  };

  const onRemoveImage = (i) => {
    const removedArray = [...removedImage];
    removedArray.push(i);
    setRemovedImage(removedArray);
  };

  return (
    <Card>
      <Box>
        <form onSubmit={submitHandler}>
          <FormInput label="Name" required>
            <InputField
              placeholder="Name"
              name="name"
              value={data.name}
              onChange={onChangeHandler("name")}
              type="text"
            />
          </FormInput>

          {/* <FormInput label="Address" required>
            <GooglePlaces
              setLocationName={setLocationName}
              defaultValue={detail.prop_address.value}
              disabled={true}
            />
          </FormInput> */}

          {/* <FormInput label="Stairs">
            <InputField
              placeholder="Stairs"
              name="stairs"
              value={data.stairs}
              onChange={onChangeHandler("stairs")}
              type="number"
              min="0"
              disabled={true}
            />
          </FormInput> */}
          <FormInput label="Type" required>
            <SelectField
              options={typeList}
              getOptionLabel="name"
              getOptionValue="value"
              onChangeValue={(item) => {
                onChangeHandler("buildingType", item?.value)();
              }}
              isSearchable
              placeholder="Select Type"
              defaultValue={typeList.filter(
                (item) => item.value === detail.prop_type,
              )}
            />
          </FormInput>

          <FormInput label="Constructions" required>
            <InputField
              placeholder="Constructions"
              name="constructions"
              value={data.constructions}
              onChange={onChangeHandler("constructions")}
              type="text"
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
                      src={UPLOAD}
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
              {({ onUploadImage, imageData, onRemove, deleteAllHandler }) => (
                <Box mb={20}>
                  <Grid.Container lg={4} md={2} sm={1}>
                    {detail.prop_image?.length > 0 &&
                      detail.prop_image.map(
                        (item, index) =>
                          !removedImage.includes(index) && (
                            <div key={index}>
                              <div
                                style={{
                                  position: "relative",
                                  display: "inline-block",
                                  boxShadow: "0px 2px 10px 0px #888888",
                                }}>
                                <img
                                  alt="Avatar"
                                  src={`${FILE_URL}/site/${item}`}
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
                                  onClick={() => onRemoveImage(index)}>
                                  <RiCloseCircleFill color="red" size={25} />
                                </div>
                              </div>
                            </div>
                          ),
                      )}

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
                              src={item.url}
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
          <ActivityIndicator animating={editLoading}>
            <Button title="Submit" type="submit" />
          </ActivityIndicator>
        </form>
      </Box>
    </Card>
  );
};

export const EditBuildingPage = () => {
  const { params } = useNavigation();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.building);

  useEffect(() => {
    if (params.id) {
      dispatch(getBuildingDetailAction(params.id));
    }
  }, [params.id]);

  return (
    <CompWrapper>
      {!!detail ? <EditComponent /> : <div>Loading....</div>}
    </CompWrapper>
  );
};
