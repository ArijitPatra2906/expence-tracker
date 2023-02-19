import React, { useEffect, useState } from 'react'
import { Form, Input, message, Modal, Select } from 'antd'
import axios from 'axios';
import Spinner from './Spinner';

function AddEditTransaction({ edit, setEdit, getTransaction, showAddEditTransactionModal, setShowAddEditTransactionModal }) {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("expence tracker user"))
            setLoading(true)
            if (edit) {
                await axios.post(`${process.env.REACT_APP_BASEURL}/api/transaction/edit-transaction`, { payload: { ...values, userId: user._id, }, transactionId: edit._id })
                getTransaction()
                message.success("Transaction Updated Successfull")
            } else {
                await axios.post(`${process.env.REACT_APP_BASEURL}/api/transaction/add-transaction`, { ...values, userId: user._id })
                getTransaction()
                message.success("Transaction Added Successfull")
            }
            setLoading(false)
            setShowAddEditTransactionModal(false)
            setEdit(null)
        } catch (error) {
            setLoading(false)
            message.error("Something went wrong")
        }
    }



    return (
        <Modal footer={false} title={edit ? "Edit Transaction" : "Add Transaction"} visible={showAddEditTransactionModal} onCancel={() => setShowAddEditTransactionModal(false)}>
            {loading && <Spinner />}

            <Form layout="vertical" className='transactionForm' onFinish={onFinish} initialValues={edit}>
                <Form.Item label="Amount" name="amount">
                    <Input type='text' />
                </Form.Item>
                <Form.Item label="Type" name="type">
                    <Select>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expence'>Expences</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Category" name="category">
                    <Select>
                        <Select.Option value='salary'>Salary</Select.Option>
                        <Select.Option value='food'>Food</Select.Option>
                        <Select.Option value='entertainment'>Entertainment</Select.Option>
                        <Select.Option value='travel'>Travel</Select.Option>
                        <Select.Option value='medical'>Medical</Select.Option>
                        <Select.Option value='recharge'>Recharge</Select.Option>
                        <Select.Option value='education'>Education</Select.Option>
                        <Select.Option value='investment'>Investment</Select.Option>
                        <Select.Option value='emi'>EMI</Select.Option>
                        <Select.Option value='others'>Others</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Date" name="date">
                    <Input type='date' />
                </Form.Item>
                <Form.Item label="Reference" name="reference">
                    <Input type='text' />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input type='text' />
                </Form.Item>
                <div className="d-flex justify-content-end">
                    <button className='primary' type='submit'>SAVE</button>
                </div>
            </Form>
        </Modal>
    )
}

export default AddEditTransaction