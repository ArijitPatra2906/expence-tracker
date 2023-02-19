import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import "../assets/Transaction.css"
import { DatePicker, message, Select, Table, } from 'antd'
import AddEditTransaction from '../components/AddEditTransaction'
import axios from 'axios'
import Spinner from '../components/Spinner'
import moment from "moment"
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Analitics from '../components/Analitics'
function Home() {
    const { RangePicker } = DatePicker;
    const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transactionData, setTransactionData] = useState([])
    const [frequency, setFrequency] = useState("7");
    const [type, setType] = useState("alltransaction");
    const [selectedRange, setSelectedRange] = useState([]);
    const [viewType, setViewType] = useState("table");
    const [edit, setEdit] = useState(null);
    // const [delete, setDelete] = useState(null)
    const getTransaction = async () => {
        const user = JSON.parse(localStorage.getItem("expence tracker user"))
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/transaction/get-alltransaction`, { userId: user._id, frequency, ...(frequency === "custom" && { selectedRange }), type })
            setLoading(false)
            setTransactionData(response.data)
            // console.log(transactionData)
        } catch (error) {
            setLoading(false)
            message.error("Something went wrong")
        }
    }
    const deleteTransaction = async (record) => {
        const user = JSON.parse(localStorage.getItem("expence tracker user"))
        try {
            setLoading(true)
            await axios.post(`${process.env.REACT_APP_BASEURL}/api/transaction/delete-transaction`, { transactionId: record._id })
            message.success("Transaction deleted Successfully!!")
            getTransaction()
            setLoading(false)

        } catch (error) {
            setLoading(false)
            message.error("Something went wrong")
        }
    }
    useEffect(() => {
        getTransaction()
    }, [frequency, selectedRange, type])


    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'name',
            render: (record) => <label className='moment'>{moment(record).format("YYYY-MM-DD")}</label>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Reference',
            dataIndex: 'reference',
            key: 'reference',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {

                return <div>
                    <EditOutlined onClick={() => {
                        setEdit(record)
                        setShowAddEditTransactionModal(true)
                    }} />
                    <DeleteOutlined className='mx-3' onClick={() => deleteTransaction(record)} />
                </div>
            }
        },
    ];

    return (
        <Layout>
            {loading && <Spinner />}
            <div className="filter d-flex justify-content-between align-items-center">
                <div className='d-flex'>
                    <div className="d-flex flex-column ">
                        <h6>Select Frequency</h6>
                        <Select value={frequency} onChange={(value) => setFrequency(value)}>
                            <Select.Option value="7">Last 7 Days</Select.Option>
                            <Select.Option value="15">Last 15 Days</Select.Option>
                            <Select.Option value="30">Last 1 Month</Select.Option>
                            <Select.Option value="180">Last 6 Month</Select.Option>
                            <Select.Option value="365">Last 1 Year</Select.Option>
                            <Select.Option value="custom">Custom</Select.Option>
                        </Select>

                        {frequency === "custom" && (
                            <div className='mt-2'>
                                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
                            </div>)}
                    </div>
                    <div className="d-flex flex-column mx-5">
                        <h6>Select Type</h6>
                        <Select value={type} onChange={(value) => setType(value)}>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expence">Expence</Select.Option>
                            <Select.Option value="alltransaction">All Transaction</Select.Option>
                        </Select>
                    </div>
                </div>

                <div className='d-flex align-items-center justify-content-center'>
                    <div className="d-flex justify-content-end">
                        <div>
                            <div className='view-switch mx-5'>
                                <UnorderedListOutlined className={`${viewType === "table" ? "active-icon" : "inactive-icon"}`} onClick={() => setViewType("table")} />
                                <AreaChartOutlined className={`${viewType === "analytics" ? "active-icon" : "inactive-icon"}`} onClick={() => setViewType("analytics")} />
                            </div>
                        </div>
                    </div>

                    <button className="primary" onClick={() => setShowAddEditTransactionModal(true)}>Add New</button>
                </div>

            </div>
            <div className="table_analitics">
                <div className="table">

                    {viewType === "table" ? (
                        <div className="tableView">
                            <Table columns={columns} dataSource={transactionData}></Table>
                        </div>
                    ) : (
                        <Analitics transactions={transactionData} />
                    )}
                </div>
            </div>

            {showAddEditTransactionModal && (
                <AddEditTransaction
                    showAddEditTransactionModal={showAddEditTransactionModal}
                    setShowAddEditTransactionModal={setShowAddEditTransactionModal}
                    getTransaction={getTransaction}
                    edit={edit}
                    setEdit={setEdit}
                />
            )}
        </Layout>
    )
}

export default Home