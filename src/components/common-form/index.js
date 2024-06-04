import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CommonForm = ({
  action,
  isBtnDisabled,
  btnType,
  formControls,
  formData,
  setFormData,
  handleFileChange,
  buttonText,
}) => {
  const renderInputByComponentType = (getCurrentControl) => {
    let content = null;

    switch (getCurrentControl.componentType) {
      case "input":
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              placeholder={getCurrentControl.placeholder}
              disabled={getCurrentControl.disabled}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [getCurrentControl.name]: e.target.value,
                })
              }
              className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-within:ring-offset-0"
            />
          </div>
        );
        break;

      case "file":
        content = (
          <Label
            htmlFor={getCurrentControl.name}
            className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
          >
            <h2>{getCurrentControl.label}</h2>
            <Input
              type="file"
              onChange={handleFileChange}
              id={getCurrentControl.name}
            ></Input>
          </Label>
        );
        break;
      default:
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              placeholder={getCurrentControl.placeholder}
              disabled={getCurrentControl.disabled}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [getCurrentControl.name]: e.target.value,
                })
              }
              className="w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-within:ring-offset-0"
            />
          </div>
        );
        break;
    }
    return content;
  };
  return (
    <form action={action}>
      {formControls.map((control) => renderInputByComponentType(control))}
      <div className="mt-6 w-full">
        <Button
          type={btnType || "submit"}
          disabled={isBtnDisabled}
          className="disabled:opacity-60 flex justify-center items-center px-5 h-11"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default CommonForm;
