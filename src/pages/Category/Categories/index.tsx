import React, { useEffect, useState } from "react";
import { Card, Drawer, Input } from 'antd';
import Container from "typedi";
import { TYPE_BTN } from "common/enum";
import { InputForm, UIButton } from "components/scss";
import { UITable } from "components/scss/table";
import { useForm, useMessage, useTable } from "hooks";
import { plainToClass } from "class-transformer";
import { Popconfirm } from 'antd';
import { CategoryDTO, DeleteCategoryQueryDTO, GetCategoryQueryDTO, PayloadAddCategoryDTO } from "common/dto/category/category.dto";
import { CategorylService } from "services/category-service/category.service";
import { utilities } from "helper";
import "./styles.scss"

export const Categories: React.FC = () => {

    /** const here------ */
    const categoryService = Container.get(CategorylService)
    const [visible, setVisible] = useState<boolean>(false)
    const { openMessage } = useMessage()
    const {
        values,
        disabled,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        loading: loadingForm,
        resetFields,
        setValues,
    } = useForm<PayloadAddCategoryDTO>({
        initialValues: {
            title: "",
            parent_id: ""
        },
        dtoValidation: PayloadAddCategoryDTO,
        onSubmit: async (values) => {
            const reponse = await categoryService.createCategory(values)
            openMessage("success", "Thêm vật liệu thành công")
            resetFields()
            fetchData()
            setVisible(false)
            return reponse
        }
    })
    const { title } = values
    const {
        dataSource,
        loading,
        setLoading,
        handleSetUpPage,
        pagination,
        handleReset,
        search,
        setSearch,
    } = useTable((data) => {
        fetchData(data)
    })
    const columns = [
        {
            title: "Tên",
            key: "title",
            dataIndex: "title"
        },
        {
            title: "Action",
            key: "action",
            render: (_name, record) => <div>
                <Popconfirm
                    placement="topLeft"
                    title={<div>
                        <div className="mb-2">Thêm Loại Sản Phẩm</div>
                        <InputForm
                            help={touched.title && errors.title ? errors.title : ""}
                            touched={touched.title}
                            errors={errors.title}
                            value={title}
                            onBlur={handleBlur}
                            name="title"
                            required
                            placeholder={"Tên Loại Sản Phẩm"}
                            onChange={handleChange}
                        />
                    </div>}
                    onConfirm={() => handleDelete(record)}
                    okText="Thêm"
                    cancelText="Hủy"
                    okButtonProps={
                        { loading: loadingForm, disabled: disabled, onClick: handleSubmit }
                    }
                    icon={""}
                >
                    <UIButton
                        onClick={() => {
                            console.log(record)
                            setValues({
                                title:"",
                                parent_id:record._id || ""
                            })
                        }}
                        className="me-2"
                    >
                        Thêm
                    </UIButton>
                </Popconfirm>
                <Popconfirm
                    placement="topLeft"
                    title={<div>
                        <div className="mb-2">Sửa Loại Sản Phẩm</div>
                        <InputForm
                            placeholder={"Tên Loại Sản Phẩm"}
                        />
                    </div>}
                    onConfirm={() => handleDelete(record)}
                    okText="Sửa"
                    cancelText="Hủy"
                    icon={""}
                >
                    <UIButton
                        typebtn={TYPE_BTN.warning}
                        className="me-2"
                    >Sửa</UIButton>
                </Popconfirm>
                <Popconfirm
                    placement="topLeft"
                    title={"Bạn có muốn xóa?"}
                    onConfirm={() => handleDelete(record)}
                    okText="Yes"
                    cancelText="No">
                    <UIButton
                        typebtn={TYPE_BTN.secondary}>Xóa</UIButton>
                </Popconfirm>
            </div>
        }
    ];

    /** function here ------------- */

    const handleDelete = (record) => {
        try {
            const queryDeleteMaterial = plainToClass(DeleteCategoryQueryDTO, { id: record._id })
            categoryService.deleteCategory(queryDeleteMaterial)
            handleReset()
            openMessage("success", "Bạn Đã xóa thành công!!")
        } catch (error) {
            openMessage("error", "Thất Bại")
        }

    }
    const fetchData = (data?: any) => {
        setLoading(true)
        categoryService.getAllCategory(plainToClass(GetCategoryQueryDTO, data)).then(data => {
            data.result = utilities.convertToTreeData(data.result)
            setLoading(false)
            handleSetUpPage(data)
        }
        ).catch(_err => {
            setLoading(false)
        })
    }
    useEffect(() => {

    }, [])
    return (
        <div className="categorys">
            <Card title={<div>
                <span>Quản Lý Loại Sản Phẩm</span>
                <Input.Search
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm Kiếm"
                    className="float-end"
                    allowClear
                    style={{ width: '40%' }}
                />
            </div>}>
                <div>
                    <UIButton onClick={() => {
                        setVisible(true)
                        resetFields()
                    }}
                        style={{ marginBottom: 16, float: "right" }}>Thêm</UIButton>
                    <UITable<CategoryDTO>
                        rowKey="_id"
                        bordered
                        loading={loading}
                        className="table-secondary"
                        dataSource={dataSource}
                        columns={columns}
                        pagination={pagination}
                        scroll={{ y: 500, x: 1000 }}

                    />
                </div>

            </Card>
            <Drawer
                title="Thêm Loại Sản Phẩm"
                placement={"top"}
                closable={true}
                onClose={() => setVisible(false)}
                visible={visible}
                key={"top"}
            >
                <div className="categorys_draw">
                    <InputForm
                        help={touched.title && errors.title ? errors.title : ""}
                        touched={touched.title}
                        errors={errors.title}
                        value={title}
                        onBlur={handleBlur}
                        name="title"
                        required
                        placeholder={"Tên Loại Sản Phẩm"}
                        onChange={handleChange}
                    />
                    <UIButton loading={loadingForm} disabled={disabled} onClick={handleSubmit}>Lưu</UIButton>
                </div>

            </Drawer>
        </div>
    );
};

