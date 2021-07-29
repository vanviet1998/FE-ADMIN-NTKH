import React, { useEffect } from "react";
import { Card } from 'antd';
import Container from "typedi";
import { ProductService } from "services/product-service/product.service";
import { GetProductQueryDTO, ProductDTO } from "common/dto/products/product.dto";
import { utilities } from "helper";
import { STATUS_PRODUCT, TYPE_BTN } from "common/enum";
import { UIButton } from "components/scss";
import { UITable } from "components/scss/table";
import { useTable } from "hooks";



export const Products: React.FC = () => {
    
    const columns = [
        {
            title: "Tên",
            key: "name",
            dataIndex: "name"
        },
        {
            title: "Bảo hành (Tháng)",
            dataIndex: "guarantee",
            key: "guarantee"
        },
        {
            title: "Vật Liệu",
            dataIndex: "material",
            key: "material",
            render: (records) => (<span>{records?.title || ""}</span>)
        },
        {
            title: "Hình",
            dataIndex: "image",
            key: "image",
            render: (records) => (
                <div>
                    {records.map(item => (
                        <img className="img-fluid" style={{ width: 30 }} src={utilities.getImageUrl(item)}></img>
                    ))}
                </div>
    
            )
    
        },
    
        {
            title: "Giá",
            key: "price",
            dataIndex: "price",
            render: (records) => <span>{utilities.formatPrice(records || 0)}</span>
        },
        {
            title: "Giảm giá",
            dataIndex: "disCount",
            render: (records) => <span>{records}%</span>
        },
        {
            title: "Giá tính",
            dataIndex: "realPrice",
            key: "realPrice",
            render: (_records, data: ProductDTO) => <span>{utilities.caculatorPriceSale(data.price, data.disCount)}</span>
        },
        {
            title: "Trạng Thái",
            dataIndex: "status",
            key: "status",
            render: (records) => <span>{records === STATUS_PRODUCT.HAVE ? "Còn Hàng" : "Hết Hàng"}</span>
    
        },
        {
            title: "Action",
            key: "action",
            render: () => <div>
                <UIButton className="me-2">Sửa</UIButton>
                <UIButton typebtn={TYPE_BTN.secondary}>Xóa</UIButton>
            </div>
        }
    ];
    
    const productService = Container.get(ProductService)
    const { dataSource, setDataSource, loading, setLoading } = useTable(() => {
        const queryGetProduct = new GetProductQueryDTO()
        setLoading(true)
        productService.getProducts(queryGetProduct).then(data => {
            setLoading(false)
            setDataSource(data.result)
        }
        ).catch(_err => {
            setLoading(false)

        })
    })
    useEffect(() => {

    }, [])
    return (
        <div className="products">
            <Card title="Quản Lý Sản Phẩm">
                <UITable<ProductDTO>
                    bordered
                    loading={loading}
                    className="table-secondary"
                    dataSource={dataSource}
                    columns={columns}
                />
            </Card>
        </div>
    );
};

