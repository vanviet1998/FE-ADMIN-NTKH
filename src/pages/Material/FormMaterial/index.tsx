import React, { useEffect, useState } from "react";
import { Card } from 'antd';
import Container from "typedi";
import "./styles.scss"
import { InputForm, UIButton } from "components/scss";
import Form from "antd/lib/form/Form";
import { TYPE_BTN } from "common/enum";
import { useForm, useMessage, useRouter } from "hooks";
import { PATH } from "configRouter/path";
import { GetMaterialParamsDTO, PayLoadAddMaterialBodyDTO, PayLoadUpdateMaterialBodyDTO } from "common/dto/material/material.dto";
import { MaterialService } from "services/material-service/material.service";
import { plainToClass } from "class-transformer";



export const FormMateral: React.FC = () => {
    const { push, pathname, query } = useRouter()
    const [getDetailLoading, setgetDetailLoading] = useState(false)
    const isEdit = pathname === PATH.MATERIAl_CREATE ? false : true
    const { openMessage } = useMessage()
    const serviceLogin = Container.get(MaterialService)
    const form = {
        initialValues: {
            title: "",
        },
        dtoValidation: isEdit ? PayLoadUpdateMaterialBodyDTO : PayLoadAddMaterialBodyDTO,
        onSubmit: async (values) => {
            if (isEdit) {
                const body = { _id: query.id,title:values.title }
                const reponse = await serviceLogin.updateMaterial(plainToClass(PayLoadUpdateMaterialBodyDTO, body))
                push(PATH.MATERIAl_ALL)
                openMessage("success", "Sửa vật liệu thành công")
                return reponse
            }
            const reponse = await serviceLogin.createMaterial(values)
            push(PATH.MATERIAl_ALL)
            openMessage("success", "Thêm vật liệu thành công")
            return reponse

        }
    }
    const {
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
        errors,
        disabled,
        loading,
        setValues,
    } = useForm<PayLoadAddMaterialBodyDTO | PayLoadUpdateMaterialBodyDTO>(form)

    useEffect(() => {
        if (isEdit) {
            setgetDetailLoading(true)
            const params = plainToClass(GetMaterialParamsDTO, query)
            serviceLogin.getDetailMaterial(params).then(data => {
                const result = plainToClass(PayLoadUpdateMaterialBodyDTO, data)
                setValues(result)
                setgetDetailLoading(false)
            }).catch(err => {
                setgetDetailLoading(false)
                console.error(err)
            })
        }
    }, [])

    const { title } = values
    return (
        <div className="form-material">
            <Card loading={getDetailLoading} title={isEdit ? "Sửa Vật Liệu" : "Thêm Vật Liệu"}>
                <Form
                    name="addMaterial"
                >
                    <div className="row">
                        <div className="col-12">

                            <InputForm
                                help={touched.title && errors.title ? errors.title : ""}
                                onBlur={handleBlur}
                                touched={touched.title}
                                errors={errors.title}
                                required
                                placeholder="Vật Liệu"
                                name="title"
                                value={title}
                                onChange={handleChange}
                            />

                        </div>
                        <div className="text-center">
                            <UIButton
                                loading={loading}
                                disabled={disabled}
                                typebtn={TYPE_BTN.primary}
                                onClick={handleSubmit}
                            >
                                {isEdit ? "Sửa" : "Tạo Vật Liệu"}
                            </UIButton>

                        </div>

                    </div>
                </Form>
            </Card>


        </div>

    );
};

