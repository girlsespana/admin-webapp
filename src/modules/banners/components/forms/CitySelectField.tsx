import {FC} from "react";
import {FieldProps} from "formik";
import SelectField from "@/components/forms/SelectField";
import TemporaryCitySelect from "@/components/forms/TemporaryCitySelect";

const CitySelectField: FC<FieldProps> = (props) => {
  return (
    <SelectField
      {...props}
      component={TemporaryCitySelect}
      defaultValue={props.field.value ?? null}
    />
  )
}

export default CitySelectField