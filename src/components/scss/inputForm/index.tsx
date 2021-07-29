import React, { ChangeEventHandler, ReactNode, useState } from "react";
import { Form, Input } from 'antd';
import "./input.styles.scss";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

interface Iprops {
    name?: string,
    placeholder?: string,
    onChange?: ChangeEventHandler,
    onBlur?: ChangeEventHandler,
    pattern?: string
    value?: any,
    addonAfter?: ReactNode,
    inputStyle?: React.CSSProperties,
    help?: ReactNode,
    required?: boolean,
    classForm?: string,
    iconEnd?: string,
    classNameInput?: string,
    type?: string,
    touched?: any,
    errors?: any
}

export const InputForm: React.FC<Iprops> = (props) => {
    const [hiddenPassWord, sethiddenPassWord] = useState<boolean>(false)
    const getIcon = (iconType) => {
        switch (iconType) {
            case "password":
                return !hiddenPassWord ? (
                    <EyeOutlined
                        className="icon-hidden"
                        onClick={() => {
                            sethiddenPassWord(!hiddenPassWord);
                        }}
                    />
                ) : (
                    <EyeInvisibleOutlined
                        className="icon-hidden"
                        onClick={() => {
                            sethiddenPassWord(!hiddenPassWord);
                        }}
                    />
                );
        }
    };
    const {
        name,
        placeholder,
        onChange,
        pattern,
        onBlur,
        help,
        value,
        addonAfter,
        inputStyle,
        required,
        classForm,
        iconEnd,
        classNameInput,
        type,
        touched,
        errors
    } = props

    const getValidationStatus = () => {
        return touched && errors ? "error" : !touched ? 'nomal' : undefined
    }

    return (
        <Form.Item
            required={required}
            className={`${classForm} wrap-input-form`}
        >
            <div className="form-floating">
                {getIcon(iconEnd)}
                <Input
                    value={value}
                    id={name}
                    name={name}
                    onChange={onChange}
                    pattern={pattern}
                    autoComplete={"new-password"}
                    onBlur={onBlur}
                    style={inputStyle}
                    addonAfter={addonAfter}
                    className={`${classNameInput} form-control ${getValidationStatus() === 'error' ? 'is-invalid' : getValidationStatus() === 'nomal' ? '' : 'is-valid'} `}
                    placeholder={placeholder}
                    type={type === "password" && hiddenPassWord ? "" : type}


                />
                <label htmlFor={name}>{placeholder}</label>
                <div id={name} className="invalid-feedback">
                    {help}
                </div>
            </div>


        </Form.Item>

    )
};

