import React, { useEffect } from "react";
import { Card, Input } from 'antd';
import Container from "typedi";
import { TYPE_BTN } from "common/enum";
import { UIButton } from "components/scss";
import { UITable } from "components/scss/table";
import { useMessage, useRouter, useTable } from "hooks";
import { MaterialService } from "services/material-service/material.service";
import { DeleteMaterialQueryDTO, GetMaterialQueryDTO, MaterialDTO } from "common/dto/material/material.dto";
import { plainToClass } from "class-transformer";
import { Popconfirm } from 'antd';
import { PATH } from "configRouter/path";


export const Materials: React.FC = () => {
    const materialService = Container.get(MaterialService)
    const { pushDetailPage } = useRouter()
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
                <UIButton
                    onClick={() => {
                        pushDetailPage(PATH.MATERIAl_EDIT, { id: record._id })
                    }}
                    className="me-2"
                >Sửa
                </UIButton>
                <Popconfirm placement="topLeft" title={"Bạn có muốn xóa?"} onConfirm={() => handleDelete(record)} okText="Yes" cancelText="No">
                    <UIButton typebtn={TYPE_BTN.secondary}>Xóa</UIButton>
                </Popconfirm>

            </div>
        }
    ];
    const handleDelete = (record) => {
        try {
            const queryDeleteMaterial = plainToClass(DeleteMaterialQueryDTO, { id: record._id })
            materialService.deleteMaterial(queryDeleteMaterial)
            handleReset()
            openMessage("success", "Bạn Đã xóa thành công!!")
        } catch (error) {

        }

    }
    const { openMessage } = useMessage()
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
    const fetchData = (data) => {
        setLoading(true)
        materialService.getAllMaterial(plainToClass(GetMaterialQueryDTO, data)).then(data => {
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
        <div className="products">
            <Card title={<div>
                <span>Quản Lý Vật Liệu</span>
                <Input.Search value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm Kiếm" className="float-end" allowClear style={{ width: '40%' }} />

            </div>}>
                <UITable<MaterialDTO>
                    rowKey="_id"
                    bordered
                    loading={loading}
                    className="table-secondary"
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                />
            </Card>
        </div>
    );
};

