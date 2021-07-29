import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { useState } from 'react';

interface IProps<T>{
    initialValues: T,
    /**
     * Must extends on class-validator and be dto class
     */
    dtoValidation: ClassConstructor<any>,
    onSubmit: (values: T) => Promise<any>
}
function useForm<T>(props: IProps<T>) {
    const { initialValues, dtoValidation, onSubmit } = props
    /** Make intitalValues of erros and touched depend on intitalValues of values */
    const cloneInit = { ...initialValues }
    Object.keys(initialValues).map(function (key) {
        cloneInit[key] = "";
    });
    /**values of form */
    const [values, setValues] = useState<T>(initialValues);
    /**when user plur on input touchec = true */
    const [touched, setTouched] = useState<T>(cloneInit);
    /**all error depends on class DTO */
    const [errors, setErros] = useState<T>(cloneInit);
    /**loading when submit form call api =>> */
    const [loading, setLoading] = useState<boolean>(false);
    /**when has any errors disabled = true */
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleSubmit = async () => {
        getReadyTouched()
        if (!await validator()) {
            setLoading(true)
            await onSubmit(values).then(_data => {
                setLoading(false)

            }).catch(_err => {
                setLoading(false)

            })
        }
    }
    const handleChange = (e: React.ChangeEvent<any>): void => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    const handleBlur = (e: React.FocusEvent<any>): void => {
        const { name } = e.target
        setTouched({ ...touched, [name]: true })
        validator()
    }
    /**Validator if have any erros return true */
    const validator = async (): Promise<any> => {
        const payload: object = plainToClass(dtoValidation, values)
        return validate(payload).then(async (item: ValidationError[]) => {
            let result = false
            const newErros = { ...cloneInit }
            if (item.length) {
                result = true
                await setDisabled(true)
                item.map((err: ValidationError) => {
                    const keys = Object.keys(err.constraints)
                    if (keys.length) {
                        newErros[err.property] = err.constraints[keys[0]]
                    }
                })

            } else {
                result = false
                await setDisabled(false)
            }
            await setErros(newErros)
            return result
        }).catch(() => false)
    }

    /**Get all touched=true on input */
    const getReadyTouched = () => {
        const cloneTouched = { ...initialValues }
        Object.keys(initialValues).map(function (key) {
            cloneTouched[key] = true;
        });
        setTouched(cloneTouched)
    }

    const resetFields=()=>{
        setValues(initialValues)
    }



    return {
        loading,
        setLoading,
        disabled,
        setDisabled,
        handleChange,
        values,
        setValues,
        errors,
        setErros,
        handleBlur,
        touched,
        setTouched,
        handleSubmit,
        resetFields
    }
}
export default useForm