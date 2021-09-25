import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth, useNavigation } from "react-auth-navigation";

import { useDocTitle } from "../../../../hooks/useDocTitle.hook";
import { capitalizeFirstLetter, isValid, validator } from "../../../../utils";

import { ActivityIndicator, Card, CompWrapper } from "../../../hocs";
import {
  Box,
  Button,
  FormInput,
  Grid,
  ImageUpload,
  InputField,
  SelectField,
} from "../../../commons";
import UPLOAD from "../../../../assets/icons/upload.png";
import { RiCloseCircleFill } from "react-icons/ri";
import { useInput } from "../../../../hooks";

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

export const AddBuildingPage = () => {
  const { toast } = useAuth();
  const { navigation } = useNavigation();
  const { navigate, routes } = navigation;
  const dispatch = useDispatch();
  const { addLoading } = useSelector((state) => state.building);
  useDocTitle("Add Building");
  const { data, onChangeHandler } = useInput({
    name: "",
    email: "",
    // stairs: "",
    buildingType: "",
    constructions: "",
  });

  const [image, setImage] = React.useState([]);
  const [locationName, setLocationName] = React.useState("");
  const changeImage = (data) => {
    setImage(data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const catchedErrors = {};
    const validate = validator(catchedErrors);

    const { email, name, /* stairs, */ buildingType, constructions } = data;

    const showMessage = (message) => {
      toast({ message, type: "error" });
    };
    validate("name", name.length === 0, () => {
      showMessage("Name can't be empty!");
    });

    validate("address", locationName.length === 0, () => {
      showMessage("Address can't be empty!");
    });

    validate("constructions", constructions.length === 0, () => {
      showMessage("Constructions can't be empty!");
    });

    validate("buildingType", buildingType.length === 0, () => {
      showMessage("BuildingType can't be empty!");
    });

    // validate("stair", stairs.length === 0, () => {
    //   showMessage("Stair can't be empty!");
    // });

    if (!isValid(catchedErrors)) {
      //   console.error(catchedErrors);
      return;
    }

    let formData = new FormData();
    await formData.append("propName", capitalizeFirstLetter(name));
    await formData.append(
      "propAddress",
      JSON.stringify({
        coordinates: [1, 1],
        value: locationName,
      }),
    );

    await formData.append(
      "propConstruction",
      capitalizeFirstLetter(constructions),
    );
    // await formData.append("propStairs", 1);
    await formData.append("propType", buildingType);
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
              <GooglePlaces setLocationName={setLocationName} />
            </FormInput> */}

            {/* <FormInput label="Stairs">
              <InputField
                placeholder="Stairs"
                name="stairs"
                value={data.stairs}
                onChange={onChangeHandler("stairs")}
                type="number"
                min="0"
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
            <ActivityIndicator animating={addLoading}>
              <Button title="Submit" type="submit" />
            </ActivityIndicator>
          </form>
        </Box>
      </Card>
    </CompWrapper>
  );
};
