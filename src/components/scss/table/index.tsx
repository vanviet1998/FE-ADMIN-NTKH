import React from "react";
import { Table, TableProps } from "antd";
import "./table.styles.scss"



export class UITable<T> extends React.PureComponent<TableProps<T>> {
  constructor(props: TableProps<T>) {
    super(props)

  }

  render() {
    return (
      <Table<TableProps<T>>
        {...this.props}
      />
    );
  }

};
