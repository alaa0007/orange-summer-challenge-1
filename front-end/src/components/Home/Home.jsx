import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import TopBar from '../TopBar/TopBar'
import { Table, Popconfirm, Form  } from 'antd'
import "antd/dist/antd.css"
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from "axios"
import './home.css'


const Home = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [editRow, setEditRow] = useState(false);
    const [editId, setEditId] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isManager, setIsManager] = useState("");
    const [form] = Form.useForm();

    useEffect(() => {
        axios.get("http://localhost:5000/api/users").then(res => {
            setUsers(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [users])


    
    const columns = [
        {
            key: '1',
            title: 'User Name',
            dataIndex: 'name',
        },
        {
            key: '2',
            title: 'User Email',
            dataIndex: 'email',
        },
        {
            key: '3',
            title: 'User Password',
            dataIndex: 'password',
        },
        {
            key: '4',
            title: 'Role',
            dataIndex: 'isManager',
            filters : [
                {text: 'Manager', value: true},
                {text: 'User', value: false},
            ],
            onFilter : (value, record) => 
            record.isManager === value,
            render: isManager => (
                isManager === true ?  <p>Manager</p> : <p>User</p>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) =>
                    users.length >= 1 ? (
                    <div className='actionAddDelete'>
                    <button className='btn btn-edit' onClick={() => handleEdit(record)}><AiOutlineEdit/></button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <button className='btn btn-delete'><AiOutlineDelete/></button>
                    </Popconfirm>
                    </div>
          ) : null,
        }
    ]
    
    const handleSubmit = async (e) => {
            e.preventDefault();
            const newUser = { name ,email , password , isManager};
            console.log(newUser);
            if(editRow === false){
                axios.post('http://localhost:5000/api/users/', newUser) 
                .then(res => {
                    setUsers([...users, res.data]);
                    form.resetFields();
                })
                .catch(err => console.log(err))
            }else{
                axios.put(`http://localhost:5000/api/users/`, newUser)
                .catch(err => console.log(err))
            }
            setUsers("");
            setName("");
            setEmail("");
            setPassword("");
            setIsManager("");
          }
    
        
          

          const handleDelete = (key) => {
            axios.delete(`http://localhost:5000/api/users/${key}`)
            .then(res => {
                const newUser = users.filter(user => user.id !== key);
                setUsers(newUser);
            })
            .catch(err => console.log(err))
          };
    


          const handleEdit = (record) => {
            const editUser = { ...record };
            setEditRow(true);
            setName(editUser.name);
            setEmail(editUser.email);
            setPassword(editUser.password);
            setIsManager(editUser.isManager);
            setEditId(record.id);
          };


  return (
    <>
    <div className="elfsight-app-8747515a-675f-492a-a7d8-10e8bc730547"></div>   
        <TopBar/>
        <div className='main-side'>
        <SideBar users ="users" />
        <div className="main-users">
            <div className='users-container'>
                <h1>Users</h1>
            <div className='users-content'>
            <Table rowKey={record => record.id} columns={columns} bordered dataSource={users}  pagination={
            {
                pageSize: pageSize,
                current: page,
                onChange(page, pageSize) {
                setPage(page);
                setPageSize(pageSize);
                }
            }
        }>
        </Table>
        </div>
        <div className="users-footer">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="User Name..." onChange={(e) => setName(e.target.value)} value={ name } required/>
                <input type="email" placeholder="User Email..." onChange={(e) => setEmail(e.target.value)} value={ email } required/>
                <input type="text" placeholder="User Password ..." onChange={(e) => setPassword(e.target.value)} value={ password } required/>
                <select value={ isManager } onChange={(e) => setIsManager(e.target.value)} required>
                  <option value="nothing">Select Role</option>
                        <option key="1" value="true">Manager</option>
                        <option key="2" value="false">User</option>
                </select> 
                {
                    editRow ? <button className='btn btn-add'>Edit User</button> : <button className='btn btn-add'>Add User</button>
                }
            </form>        
            
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home