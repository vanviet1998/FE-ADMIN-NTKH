import React from "react";
import { Card } from 'antd';
import { LoginService } from "services/login-service/login.service";
import Container from "typedi";
import "./styles.scss"
import { InputForm, UIButton } from "components/scss";
import Form from "antd/lib/form/Form";
import { TYPE_BTN } from "common/enum";
import { useForm, useRouter } from "hooks";
import { addAuthoz } from "helper/cookie";
import { PATH } from "configRouter/path";
import { PayLoadAddProductBodyDTO } from "common/dto/products/product.dto";



export const FormProduct: React.FC = () => {
    const { push } = useRouter()
    const serviceLogin = Container.get(LoginService)
    const form = {
        initialValues: {
            username: "",
            password: ""
        },
        dtoValidation: PayLoadAddProductBodyDTO,
        onSubmit: async (values) => {
            const reponse = await serviceLogin.login(values)
            addAuthoz(reponse.token, 365)
            push(PATH.HOME)
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
        disabled, loading
    } = useForm<PayLoadAddProductBodyDTO>(form)

    const { username, password } = values
    return (
        <div className="form-product">
            <Card title="Thêm Sản Phẩm">
                <Form
                    name="addProduct"
                >
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <InputForm
                                help={touched.username && errors.username ? errors.username : ""}
                                onBlur={handleBlur}
                                touched={touched.username}
                                errors={errors.username}
                                placeholder="Tên Sản Phẩm"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                            <InputForm
                                help={touched.password && errors.password ? errors.password : ""}
                                onBlur={handleBlur}
                                touched={touched.password}
                                errors={errors.password}
                                placeholder="Thời gian bảo hành"
                                name="password"
                                type="number"
                                value={password}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-12 col-lg-4">
                            <InputForm
                                help={touched.username && errors.username ? errors.username : ""}
                                onBlur={handleBlur}
                                touched={touched.username}
                                errors={errors.username}
                                placeholder="Loại Sản Phẩm"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                            <InputForm
                                help={touched.password && errors.password ? errors.password : ""}
                                onBlur={handleBlur}
                                touched={touched.password}
                                errors={errors.password}
                                placeholder="Vật Liệu"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />

                        </div>
                        <div>
                            <UIButton
                                loading={loading}
                                disabled={disabled}
                                typebtn={TYPE_BTN.primary}
                                onClick={handleSubmit}
                            >
                                Đăng Nhập
                            </UIButton>

                        </div>

                    </div>
                </Form>
            </Card>


        </div>

    );
};

