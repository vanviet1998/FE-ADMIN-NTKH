import React from 'react';
import { Menu } from 'antd';
import "./draw.styles.scss"
import { PATH } from 'configRouter/path';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";

const { SubMenu } = Menu;

type PropsType = RouteComponentProps

class MenuDraw extends React.Component<PropsType> {
  state = {
    theme: 'dark',
    current: '1',
  };
  private readonly menu = {
    products: {
      icon: <i className="bi bi-blockquote-left" />,
      title: "Sản Phẩm",
      components: [
        {
          icon: <i className="bi bi-border-all"></i>,
          name: "Tất cả sản phẩm",
          path: PATH.PRODUCTS_ALL,
        },
        {
          icon: <i className="bi bi-plus-circle"></i>,
          name: "Thêm sản phẩm",
          path: PATH.PRODUCT_CREATE,
        },
      ]
    },
    categoris: {
      icon: <i className="bi bi-stack"></i>,
      title: "Loại Sản Phẩm",
      components: [
        {
          icon: <i className="bi bi-border-all"></i>,
          name: "Tất cả loại sản phẩm",
          path: PATH.CATEGORY_ALL,
        },
      ]
    },
    materials: {
      icon: <i className="bi bi-eyedropper" />,
      title: "Vật Liệu",
      components: [
        {
          icon: <i className="bi bi-border-all"></i>,
          name: "Tất cả vật liệu",
          path: PATH.MATERIAl_ALL,
        },
        {
          icon: <i className="bi bi-plus-circle"></i>,
          name: "Thêm vật liệu",
          path: PATH.MATERIAl_CREATE,
        },
      ]
    },
    panels: {
      title: "Panels",
      components: [
        {
          icon: <i className="bi bi-border-all"></i>,
          name: "Tất cả sản phẩm",
          path: PATH.PANEL_EDIT,
        },
        {
          icon: <i className="bi bi-blockquote-left"></i>,
          name: "Thêm sản phẩm",
          path: PATH.PANEL_CREATE,
        },
      ]
    },
    feedBacks: {
      title: "Feed Back",
      components: [
        {
          icon: <i className="bi bi-border-all"></i>,
          name: "Tất cả sản phẩm",
          path: PATH.FEEDBACK_ALL,
        },
        {
          icon: <i className="bi bi-blockquote-left"></i>,
          name: "Thêm sản phẩm",
          path: PATH.FEEDBACK_CREATE,
        },
      ]
    },


  }

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    this.props.history.push(e.key)
  };

  render() {
    const keysMenu = Object.keys(this.menu)
    const pathname = window.location.pathname
    const findPath = pathname.split("/")[1]
    const openkey = keysMenu.filter(key => {
      const index = this.menu[key].components.findIndex(v => v.path.split("/")[1] === findPath)
      return index === -1 ? false : true
    })
    return (
      <div className="left-menu">
        <Menu
          theme="dark"
          onClick={this.handleClick}
          style={{ width: 256 }}
          selectedKeys={[pathname]}
          defaultOpenKeys={openkey}
          mode="inline"
        >
          {
            keysMenu.map((item) =>
              <SubMenu key={item} icon={this.menu[item].icon} title={this.menu[item].title}>
                {this.menu[item].components.map(itemMenu => (
                  <Menu.Item icon={itemMenu.icon} key={itemMenu.path}>{itemMenu.name}</Menu.Item>

                ))}

              </SubMenu>
            )
          }
        </Menu>
      </div>
    );
  }
}

export default withRouter(MenuDraw)




































