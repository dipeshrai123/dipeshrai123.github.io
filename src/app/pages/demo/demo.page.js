import React, { useState } from "react";
import { useInput } from "../../../hooks";
import { validator, isValid } from "../../../utils";
import { CheckBox, Button, Grid, InputField } from "../../commons";
import { CompWrapper } from "../../hocs";

export const Demo = () => {
  const [check, setCheck] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const toggle = (data) => {
    setCheck({ ...check, [`${data}`]: !check[data] });
  };

  const { data, onChangeHandler } = useInput({
    email: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const catchedErros = {};
    const validate = validator(catchedErros);

    const { email } = data;

    validate("email", email?.length === 0, () => {
      console.log("Email musn't be empty!");
    });

    if (!isValid(catchedErros)) {
      console.error(catchedErros);
      return;
    }
  };

  return (
    <CompWrapper>
      <div>this is demo</div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}>
        <CheckBox
          label="checkedA"
          name="checkedA"
          check={check.checkedA}
          handleCheckboxChange={toggle}
        />

        <CheckBox
          label="checkedB"
          name="checkedB"
          check={check.checkedB}
          handleCheckboxChange={toggle}
        />

        <CheckBox
          label="checkedC"
          name="checkedC"
          check={check.checkedC}
          handleCheckboxChange={toggle}
        />
      </div>
      <Grid.Container childs={4} lg={5} md={2} sm={1}>
        <Grid.Item></Grid.Item>
        <Grid.Item></Grid.Item>
        <Grid.Item></Grid.Item>
        <Grid.Item></Grid.Item>
      </Grid.Container>

      <InputField
        placeholder="Email"
        name="email"
        value={data?.email}
        onChange={onChangeHandler("email")}
        type="email"
      />
      <Button title="button" onClick={onSubmit} />
    </CompWrapper>
  );
};
