import React from "react";
import { Card } from 'antd';
import { PayLoadLoginBodyDTO } from "common/dto/login/login.dto";
import { LoginService } from "services/login-service/login.service";
import Container from "typedi";
import "./styles.scss"
import { InputForm, UIButton } from "components/scss";
import Form from "antd/lib/form/Form";
import { TYPE_BTN } from "common/enum";
import { useForm, useRouter } from "hooks";
import { addAuthoz } from "helper/cookie";
import { PATH } from "configRouter/path";



export const Login: React.FC = () => {
    const { push } = useRouter()
    const serviceLogin = Container.get(LoginService)
    const form = {
        initialValues: {
            username: "",
            password: ""
        },
        dtoValidation: PayLoadLoginBodyDTO,
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
    } = useForm<PayLoadLoginBodyDTO>(form)
    const { username, password } = values
    return (
        <div className="page">
            <div className="page_login">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Card title="Đăng Nhập">
                                <Form
                                    name="login"
                                >
                                    <InputForm
                                        help={touched.username && errors.username ? errors.username : ""}
                                        onBlur={handleBlur}
                                        touched={touched.username}
                                        errors={errors.username}
                                        placeholder="Tên Đăng Nhập"
                                        name="username"
                                        value={username}
                                        onChange={handleChange}
                                    />
                                    <InputForm
                                        help={touched.password && errors.password ? errors.password : ""}
                                        onBlur={handleBlur}
                                        touched={touched.password}
                                        errors={errors.password}
                                        placeholder="Password"
                                        name="password"
                                        iconEnd="password"
                                        type="password"
                                        value={password}
                                        onChange={handleChange}
                                    />
                                    <UIButton 
                                        loading={loading} 
                                        disabled={disabled} 
                                        typebtn={TYPE_BTN.primary} 
                                        onClick={handleSubmit}
                                    >
                                        Đăng Nhập
                                    </UIButton>
                                </Form>
                            </Card>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

