import SelectField from "@/components/forms/SelectField";
import {FC} from "react";
import {FieldProps} from "formik";
import BannerCategorySelect from "@/modules/banners/components/BannerCategorySelect";

const BannerCategorySelectField: FC<FieldProps> = (props) => {
  return (
    <SelectField
      {...props}
      component={BannerCategorySelect}
      defaultValue={props.field.value ?? null}
    />
  )
}

export default BannerCategorySelectField