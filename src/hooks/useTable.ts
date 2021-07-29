import { PagingDTO } from 'common/dto/base.dto';
import { PAGING_DEFAULT } from 'common/enum';
import { utilities } from 'helper';
import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

function useTable<T>(callBack = (
  _data?: any) => { }) {

  const [search, setSearch] = useState<string>(null);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(PAGING_DEFAULT.PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(PAGING_DEFAULT.LIMIT);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [params, setParams] = useState({});
  const debouncedValue = useDebounce(search)

  const handleAddArray = (element) => {
    setDataSource([{
      ...element,
      _id: utilities.uidGenerator(),
      new: true
    }, ...dataSource,
    ])
  }

  const handleChangePage = (page: number, pageSize: number) => {
    callBack({
      pageNumber: page,
      limit: pageSize
    });
  }

  const handleReset = () => {
    callBack({
      pageNumber: page,
      limit: pageSize
    });
  }

  const handleEditRow = (element) => {
    const index = dataSource.findIndex((obj => obj._id == element._id));
    let tempt = dataSource
    tempt[index] = element
    setDataSource(tempt)
  }

  function handleSetUpPage(data: PagingDTO<T>) {
    setTotal(data.total)
    setPageSize(data.pageSize)
    setDataSource(data.result)
    setPage(data.page + 1)
  }

  const pagination = {
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    onChange: (page: number, pageSize: number) => handleChangePage(page, pageSize),
    total: total,
    pageSize: pageSize,
    current: page,
    showSizeChanger: true
  }

  /**When has value search ===> call deboundced ==> call search api with default params [q]*/
  useEffect(() => {
    if (debouncedValue !== null)
      callBack({
        pageNumber: page,
        limit: pageSize,
        q: debouncedValue ? debouncedValue : null
      });
  }, [debouncedValue]);

  useEffect(() => {
    callBack({
      pageNumber: page,
      limit: pageSize,
    });
  }, []);

  return {
    search,
    setSearch,
    handleSetUpPage,
    pageSize,
    setPageSize,
    dataSource,
    setDataSource,
    loading,
    setLoading,
    total,
    setTotal,
    page,
    setPage,
    setSelectedRowKeys,
    selectedRowKeys,
    handleAddArray,
    handleEditRow,
    handleChangePage,
    pagination,
    handleReset,
    params,
    setParams
  };
}
export default useTable