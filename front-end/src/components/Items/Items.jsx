import React, { useEffect, useState } from 'react'
import { Table, Popconfirm } from 'antd'
import "antd/dist/antd.css"
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'
import "./items.css"
import TopBar from '../TopBar/TopBar'
import SideBar from '../SideBar/SideBar'

const Items = () => {

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);    
  const [name, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [editRow, setEditRow] = useState(false);
  const [editId, setEditId] = useState('');
  const [users, setUsers] = useState([]);



  const columns = [
      {
          key: '1',
          title: 'name',
          dataIndex: 'name',
      },
      {
          key: '2',
          title: 'description',
          dataIndex: 'description',
      },
      {
          key: '3',
          title: 'price',
          dataIndex: 'price',
          sorter : (record1, record2)=>{
              return record1.price - record2.price
          }
      },
      {
          key: '4',
          title: 'image',
          dataIndex: 'image',
      },
      {
          key: '5',
          title: 'userId',
          dataIndex: 'userId',
      },
      {
          title: 'Action',
          key: 'action',
          render: (_, record) =>items.length >= 1 ? (
              <div className='actionAddDelete'>
              <button className='btn btn-edit' onClick={() => handleEdit(record)}><AiOutlineEdit/></button>
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                  <button className='btn btn-delete'><AiOutlineDelete/></button>
              </Popconfirm>
              </div>
          ) : null,
      }
  ]

  const handleSubmit = (e) => {
      e.preventDefault();
      const id = users.length;
      const EditItem = { editId, name, description, price, image, userId};
      const newItem = { id, name ,description , price , image , userId};
      console.log(newItem);
      console.log(editRow);
      if(editRow === false){
          axios.post('http://localhost:5000/api/items', newItem)
          .then(res => {
              setItems([...items, res.data]);
          })
          .catch(err => console.log(err));
      }else{
          axios.put(`http://localhost:5000/api/items`, EditItem)
          .then(res => {
              setItems(items.map(
                items => items.id === editId ? res.data : items
                  ));
                  setEditRow(false)
          })
          .catch(err => console.log(err));
      }
      setFullName("");
      setDescription("");
      setPrice("");
      setImage("");
      setUserId("");
  }

      const handleEdit = (record) =>{
          const editItem = {...record}
          setEditRow(true);
          setFullName(editItem.name);
          setDescription(editItem.description);
          setPrice(editItem.price);
          setImage(editItem.image);
          setUserId(editItem.userId);
          setEditId(record.id)
      }
    
    const handleDelete = (key) => {
      axios.delete(`http://localhost:5000/api/items/${key}/`)
      const data = [...items];
      const index = data.findIndex(item => key === item.id);
      data.splice(index, 1);
      setItems(data);
    };

    useEffect(() => {
      axios.get('http://localhost:5000/api/items')
      .then(res => {
          setItems(res.data);
      })
      .catch(err => console.log(err))


      axios.get('http://localhost:5000/api/users')
      .then(res => {
          setUsers(res.data);
      })
      .catch(err => console.log(err))
      }, [items , users])



  return (
 <>
    <TopBar />
    <div className='main-side'>
      <SideBar item="Items"/>
      <div className="main-items">
        <div className='items-container'>
          <h1>Items</h1>
        <div className='items-content'>
        <Table rowKey={record => record.id} columns={columns} bordered dataSource={items}  pagination={
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
        <div className="items-footer">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Item name..." value={name} onChange={(e)=> setFullName(e.target.value)}/>
                <input type="text" placeholder="Item description..." value={description} onChange={(e)=> setDescription(e.target.value)}/>
                <input type="number" placeholder="item price..."  value={price} onChange={(e)=> setPrice(e.target.value)}/>
                <input type="file" placeholder="Item imafe..." accept="image/png, image/jpeg"  value={image} onChange={(e)=> setImage(e.target.value)}/>
                <select value={ userId } onChange={(e) => setUserId(e.target.value)} required>
                  <option value="nothing">Select your User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                </select>                
            {
                    editRow ? <button type="submit" className='btn add-btn'>Edit Item</button>: <button type="submit" className='btn add-btn'>Add Item</button>
                }
            </form>
        </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Items