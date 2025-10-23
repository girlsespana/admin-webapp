import Select from "@/components/forms/Select";
import {AdsBannerCategoryChoices} from "@types";
import {SelectOption} from "@/components/forms/Select/types";
import {FC} from "react";
import {SingleValue} from "react-select";

interface Props {
  defaultValue?: string
  onChange?: (selectedOption: SelectOption | null) => void
}

const BannerCategorySelect: FC<Props> = ({ defaultValue, onChange }) => {

  const options = Object.values(AdsBannerCategoryChoices).map((choice) => ({
    label: choice,
    value: choice,
  }))

  const defaultValueFounded = options.find(option => option.value === defaultValue)

  const handleSelectChange = (selectedOption: SingleValue<SelectOption>) => {
    if (onChange) {
      onChange(selectedOption)
    }
  }

  return (
    <Select
      placeholder="Categoria"
      options={options}
      menuPosition="fixed"
      onChange={handleSelectChange}
      isClearable
      {...(defaultValueFounded ? { defaultValue: defaultValueFounded } : {})}
    />
  )
}

export default BannerCategorySelect