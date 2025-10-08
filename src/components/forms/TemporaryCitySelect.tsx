// TODO delete this component in the future
import type {FC} from 'react'
import type {SingleValue} from 'react-select'
import type {SelectOption} from '@/components/forms/Select/types'
import Select from "@/components/forms/Select";

interface Props {
    defaultValue?: string
    // TODO investigate how to fix this
    menuPosition?: 'fixed' | 'absolute'
    onChange?: (selectedOption: SelectOption | null) => void
}

const options: SelectOption[] = [
    {label: 'Madrid', value: 'Q2l0eU5vZGU6NDIz'},
    {label: 'Barcelona', value: 'Q2l0eU5vZGU6NTA5'},
    {label: 'Santa Cruz de Tenerife', value: 'Q2l0eU5vZGU6NDM='}
]

const TemporaryCitySelect: FC<Props> = ({defaultValue, menuPosition = 'fixed', onChange}) => {
    const defaultValueFounded = options.find(option => option.value === defaultValue)

    const handleSelectChange = (selectedOption: SingleValue<SelectOption>) => {
        if (onChange) {
            onChange(selectedOption)
        }
    }

    return (
        <Select
            placeholder="Ciudad"
            options={options}
            // TODO investigate how to fix this
            menuPosition={menuPosition}
            isClearable={true}
            onChange={handleSelectChange}
            {...(defaultValueFounded ? {defaultValue: defaultValueFounded} : {})}
        />
    )
}

export default TemporaryCitySelect