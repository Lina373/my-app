// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import {Table, Button, Modal, Form} from 'react-bootstrap';
// import Cookies from 'js-cookie';
//
//
// const DataTable = () => {
//     const [data, setData] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [itemToEdit, setItemToEdit] = useState(null);
//     const [editedNazp, setEditedNazp] = useState('');
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [itemToDelete, setItemToDelete] = useState(null);
//     const [searchNp, setSearchNp] = useState('');
//     const [searchNazp, setSearchNazp] = useState('');
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [newNumber, setNewNumber] = useState('');
//     const [newNazp, setNewNazp] = useState('');
//
//
//     const handleShowAddModal = () => {
//         setShowAddModal(true);
//     };
//
//     const handleCloseAddModal = () => {
//         setShowAddModal(false);
//         setNewNumber('');
//         setNewNazp('');
//     };
//
//     const handleAddNew = () => {
//         if (newNumber && newNazp) {
//             const token = Cookies.get('token');
//             const decodedToken = JSON.parse(atob(token.split(".")[1]));
//             const id = decodedToken.id;
//
//
//             const newRecord = {
//                 np: newNumber,
//                 nazp: newNazp,
//                 user_id: id
//             };
//
//             const existingRecord = data.find(item => item.np === newNumber);
//             if (existingRecord) {
//                 alert('Номер вже є в таблиці');
//                 return;
//             }
//
//             axios
//                 .post('http://localhost:8080/data/add', newRecord)
//                 .then((response) => {
//                     console.log('Новая запись успешно добавлена:', response);
//                     fetchData();
//                     setShowAddModal(false);
//                     setNewNumber('');
//                     setNewNazp('');
//                 })
//                 .catch((error) => {
//                     console.error('Ошибка при добавлении новой записи:', error);
//                 });
//         }
//     };
//
//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/data');
//             setData(response.data);
//         } catch (error) {
//             console.error('Error while fetching data:', error);
//         }
//     };
//
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//     const handleRowClick = (item) => {
//         setItemToEdit(item);
//         setEditedNazp(item.nazp);
//         setShowModal(true);
//     };
//
//     const handleCloseModal = () => {
//         setShowModal(false);
//         setItemToEdit(null);
//         setEditedNazp('');
//     };
//
//     const handleEdit = () => {
//         confirmEdit();
//     };
//
//     const handleDelete = (item) => {
//         setItemToDelete(item);
//         setShowDeleteModal(true);
//     };
//
//     const handleCloseDeleteModal = () => {
//         setShowDeleteModal(false);
//         setItemToDelete(null);
//     };
//
//     // const confirmEdit = () => {
//     //     if (itemToEdit && editedNazp !== itemToEdit.nazp) {
//     //         axios
//     //             .put(`http://localhost:8080/data/update?id=${itemToEdit.id}`, {
//     //                 nazp: editedNazp,
//     //                 dz: itemToEdit.dz,
//     //                 np: itemToEdit.np
//     //             })
//     //             .then((response) => {
//     //                 console.log('Элемент успешно изменен:', response);
//     //                 fetchData();
//     //                 setShowModal(false);
//     //                 setItemToEdit(null);
//     //                 setEditedNazp('');
//     //             })
//     //             .catch((error) => {
//     //                 console.error('Ошибка при изменении элемента:', error);
//     //             });
//     //     }
//     // };
//
//     const confirmEdit = () => {
//         if (itemToEdit && editedNazp !== itemToEdit.nazp) {
//             axios
//                 .put(`http://localhost:8080/data/update?id=${itemToEdit.id}`, {
//                     nazp: editedNazp,
//                     dz: itemToEdit.dz,
//                     np: itemToEdit.np,
//                 })
//                 .then((response) => {
//                     console.log('Элемент успешно изменен:', response);
//                     fetchData();
//                     setShowModal(false);
//                     setItemToEdit(null);
//                     setEditedNazp('');
//                 })
//                 .catch((error) => {
//                     console.error('Ошибка при изменении элемента:', error);
//                 });
//         }
//     };
//
//
//     const confirmDelete = () => {
//         if (itemToDelete) {
//             axios
//                 .delete(`http://localhost:8080/data/delete?id=${itemToDelete.id}`)
//                 .then((response) => {
//                     console.log('Элемент успешно удален:', response);
//                     fetchData();
//                     setShowDeleteModal(false);
//                     setItemToDelete(null);
//                 })
//                 .catch((error) => {
//                     console.error('Ошибка при удалении элемента:', error);
//                 });
//         }
//     };
//
//     const handleSearch = () => {
//         const filteredData = data.filter(item => {
//             const searchNumber = parseInt(searchNp);
//             const lowerCaseSearchNazp = searchNazp.toLowerCase();
//
//             if (!isNaN(searchNumber)) {
//                 const itemNp = item.np.toString().toLowerCase();
//                 return itemNp === searchNumber.toString() && item.nazp.toLowerCase().includes(lowerCaseSearchNazp);
//             } else {
//                 const lowerCaseSearchNp = searchNp.toLowerCase();
//                 return item.np.includes(lowerCaseSearchNp) && item.nazp.toLowerCase().includes(lowerCaseSearchNazp);
//             }
//         });
//
//         setData(filteredData);
//     };
//
//     const handleClearSearch = () => {
//         setSearchNp('');
//         setSearchNazp('');
//         fetchData();
//     };
//
//     return (
//         <div>
//             <div>
//                 <div className="table-responsive"
//                      style={{maxWidth: 1500, margin: '0 auto', border: '1px solid #ccc', padding: 10}}>
//                     <div style={{ textAlign: 'right', marginBottom: '20px' }}>
//                         <Button variant="success" onClick={handleShowAddModal}>
//                             Додати
//                         </Button>
//                     </div>
//
//                     {/*Пошук */}
//                     <div style={{marginBottom: '20px'}}>
//                         <Form.Group controlId="formSearchNp">
//                             <Form.Label>Пошук по номеру</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={searchNp}
//                                 onChange={(e) => setSearchNp(e.target.value)}
//                             />
//                         </Form.Group>
//
//                         <Form.Group controlId="formSearchNazp">
//                             <Form.Label>Пошук по назві</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={searchNazp}
//                                 onChange={(e) => setSearchNazp(e.target.value)}
//                             />
//                         </Form.Group>
//                         <Button variant="primary" onClick={handleSearch}>
//                             Пошук
//                         </Button>
//                         <Button variant="secondary" onClick={handleClearSearch}>
//                             Очистити поля
//                         </Button>
//                     </div>
//
//                 </div>
//
//                 <div className="table-responsive"
//                      style={{maxWidth: 1500, margin: '0 auto', border: '1px solid #ccc', padding: 10}}>
//                     <Table striped bordered hover>
//                         <thead>
//                         <tr>
//                             <th colSpan={2} className="text-center">Підрозділ</th>
//                             <th className="text-center" rowSpan={2}>Дата</th>
//                             <th className="text-center" rowSpan={2}>Користувач</th>
//                             <th className="text-center" rowSpan={2}>Дії користувача</th>
//                         </tr>
//                         <tr>
//                             <th className="text-center">Номер</th>
//                             <th className="text-center">Назва</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {data.map((item) => (
//                             <tr key={item.id}>
//                                 <td>{item.np}</td>
//                                 <td onClick={() => handleRowClick(item)}>{item.nazp}</td>
//                                 <td className="text-center">{item.dz}</td>
//                                 <td className="text-center">{item.username}</td>
//                                 <td className="text-center">
//                                     <Button variant="warning"
//                                             onClick={() => handleRowClick(item)}>Редагувати</Button>{' '}
//                                     <Button variant="danger" onClick={() => handleDelete(item)}>Видалити</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </Table>
//
//                     {/* Модальное окно для добавления */}
//                     <Modal show={showAddModal} onHide={handleCloseAddModal}>
//                         <Modal.Header closeButton>
//                             <Modal.Title>Добавить новую запись</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <Form>
//                                 <Form.Group controlId="formNewNumber">
//                                     <Form.Label>Новый номер</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         value={newNumber}
//                                         onChange={(e) => setNewNumber(e.target.value)}
//                                     />
//                                 </Form.Group>
//                                 <Form.Group controlId="formNewNazp">
//                                     <Form.Label>Новое наименование</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         value={newNazp}
//                                         onChange={(e) => setNewNazp(e.target.value)}
//                                     />
//                                 </Form.Group>
//                             </Form>
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={handleCloseAddModal}>
//                                 Закрити
//                             </Button>
//                             <Button variant="primary" onClick={handleAddNew}>
//                                 Додати
//                             </Button>
//                         </Modal.Footer>
//                     </Modal>
//
//                     {/* Модальное окно для редактирования */}
//                     <Modal show={showModal} onHide={handleCloseModal}>
//                         <Modal.Header closeButton>
//                             <Modal.Title>Редагувати</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <Form>
//                                 <Form.Group controlId="formNazp">
//                                     <Form.Label>Назва підрозділу</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         value={editedNazp}
//                                         onChange={(e) => setEditedNazp(e.target.value)}
//                                     />
//                                 </Form.Group>
//                             </Form>
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={handleCloseModal}>
//                                 Вийти
//                             </Button>
//                             <Button variant="primary" onClick={handleEdit}>
//                                 Зберегти
//                             </Button>
//                         </Modal.Footer>
//                     </Modal>
//
//                     {/* Модальное окно для подтверждения удаления */}
//                     <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
//                         <Modal.Header closeButton>
//                             <Modal.Title>Видалити</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             Ви бажаєте видалити
//                             номер: {itemToDelete && itemToDelete.np} та: {itemToDelete && itemToDelete.nazp}?
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={handleCloseDeleteModal}>
//                                 Ні
//                             </Button>
//                             <Button variant="danger" onClick={confirmDelete}>
//                                 Так, видалити
//                             </Button>
//                         </Modal.Footer>
//                     </Modal>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default DataTable;
//
//
//
//






import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table, Button, Modal, Form} from 'react-bootstrap';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';


const DataTable = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [editedNazp, setEditedNazp] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [searchNp, setSearchNp] = useState('');
    const [searchNazp, setSearchNazp] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newNumber, setNewNumber] = useState('');
    const [newNazp, setNewNazp] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;


    const token = Cookies.get('token'); // Получите токен из cookies или другого хранилища
    const decodedToken = jwt_decode(token);
    const newUserId = decodedToken.id;



    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setNewNumber('');
        setNewNazp('');
    };

    const handleAddNew = () => {
        if (newNumber && newNazp) {
            const token = Cookies.get('token');
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const id = decodedToken.id;


            const newRecord = {
                np: newNumber,
                nazp: newNazp,
                user_id: id
            };

            const existingRecord = data.find(item => item.np === newNumber);
            if (existingRecord) {
                alert('Номер вже є в таблиці');
                return;
            }

            axios
                .post('http://localhost:8080/data/add', newRecord)
                .then((response) => {
                    console.log('Новая запись успешно добавлена:', response);
                    fetchData();
                    setShowAddModal(false);
                    setNewNumber('');
                    setNewNazp('');
                })
                .catch((error) => {
                    console.error('Ошибка при добавлении новой записи:', error);
                });
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/data');
            setData(response.data);
        } catch (error) {
            console.error('Error while fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRowClick = (item) => {
        setItemToEdit(item);
        setEditedNazp(item.nazp);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setItemToEdit(null);
        setEditedNazp('');
    };


    const handleDelete = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };


    const handleEdit = () => {
        if (itemToEdit) {
            const updatedItem = {
                id: itemToEdit.id,
                np: itemToEdit.np,
                nazp: editedNazp,
                // dz: itemToEdit.dz,
                user_id: newUserId
            };

            axios
                .put(`http://localhost:8080/data/update?id=${itemToEdit.id}`, updatedItem)
                .then((response) => {
                    console.log('Элемент успешно изменен:', response);
                    fetchData();
                    setShowModal(false);
                    setItemToEdit(null);
                    setEditedNazp('');
                })
                .catch((error) => {
                    console.error('Ошибка при изменении элемента:', error);
                });
        }
    };



    const confirmDelete = () => {
        if (itemToDelete) {
            axios
                .delete(`http://localhost:8080/data/delete?id=${itemToDelete.id}`)
                .then((response) => {
                    console.log('Элемент успешно удален:', response);
                    fetchData();
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                })
                .catch((error) => {
                    console.error('Ошибка при удалении элемента:', error);
                });
        }
    };

    const handleSearch = () => {
        const filteredData = data.filter(item => {
            const searchNumber = parseInt(searchNp);
            const lowerCaseSearchNazp = searchNazp.toLowerCase();

            if (!isNaN(searchNumber)) {
                const itemNp = item.np.toString().toLowerCase();
                return itemNp === searchNumber.toString() && item.nazp.toLowerCase().includes(lowerCaseSearchNazp);
            } else {
                const lowerCaseSearchNp = searchNp.toLowerCase();
                return item.np.includes(lowerCaseSearchNp) && item.nazp.toLowerCase().includes(lowerCaseSearchNazp);
            }
        });

        setData(filteredData);
    };

    const handleClearSearch = () => {
        setSearchNp('');
        setSearchNazp('');
        fetchData();
    };

    return (
        <div>
            <div>
                <div className="table-responsive"
                     style={{maxWidth: 1500, margin: '0 auto', border: '1px solid #ccc', padding: 10}}>
                    <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                        <Button variant="success" onClick={handleShowAddModal}>
                            Додати
                        </Button>
                    </div>

                    {/*Пошук */}
                    <div style={{marginBottom: '20px'}}>
                        <Form.Group controlId="formSearchNp">
                            <Form.Label>Пошук по номеру</Form.Label>
                            <Form.Control
                                type="text"
                                value={searchNp}
                                onChange={(e) => setSearchNp(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formSearchNazp">
                            <Form.Label>Пошук по назві</Form.Label>
                            <Form.Control
                                type="text"
                                value={searchNazp}
                                onChange={(e) => setSearchNazp(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSearch}>
                            Пошук
                        </Button>
                        <Button variant="secondary" onClick={handleClearSearch}>
                            Очистити поля
                        </Button>
                    </div>

                </div>

                <div className="table-responsive"
                     style={{maxWidth: 1500, margin: '0 auto', border: '1px solid #ccc', padding: 10}}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th colSpan={2} className="text-center">Підрозділ</th>
                            <th className="text-center" rowSpan={2}>Дата</th>
                            <th className="text-center" rowSpan={2}>Користувач</th>
                            <th className="text-center" rowSpan={2}>Дії користувача</th>
                        </tr>
                        <tr>
                            <th className="text-center">Номер</th>
                            <th className="text-center">Назва</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.slice(startIdx, endIdx).map((item) => (
                            <tr key={item.id}>
                                <td>{item.np}</td>
                                {/*<td onClick={() => handleRowClick(item)}>{item.nazp}</td>*/}
                                <td>{item.nazp}</td>
                                <td className="text-center">{item.dz}</td>
                                <td className="text-center">{item.username}</td>
                                <td className="text-center">
                                    <Button variant="warning"
                                            onClick={() => handleRowClick(item)}>Редагувати</Button>{' '}
                                    <Button variant="danger" onClick={() => handleDelete(item)}>Видалити</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <div>
                        <Button variant="secondary" onClick={goToPrevPage} disabled={currentPage === 0}>
                            Назад
                        </Button>
                        <Button variant="secondary" onClick={goToNextPage} disabled={endIdx > data.length}>
                            Вперед
                        </Button>
                    </div>


                    {/* Модальное окно для добавления */}
                    <Modal show={showAddModal} onHide={handleCloseAddModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Добавить новую запись</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formNewNumber">
                                    <Form.Label>Новый номер</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newNumber}
                                        onChange={(e) => setNewNumber(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formNewNazp">
                                    <Form.Label>Новое наименование</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newNazp}
                                        onChange={(e) => setNewNazp(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAddModal}>
                                Закрити
                            </Button>
                            <Button variant="primary" onClick={handleAddNew}>
                                Додати
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Модальное окно для редактирования */}
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Редагувати</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formNazp">
                                    <Form.Label>Назва підрозділу</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editedNazp}
                                        onChange={(e) => setEditedNazp(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Вийти
                            </Button>
                            <Button variant="primary" onClick={handleEdit}>
                                Зберегти
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Модальное окно для подтверждения удаления */}
                    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Видалити</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Ви бажаєте вижалити
                            номер: {itemToDelete && itemToDelete.np} та: {itemToDelete && itemToDelete.nazp}?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                Ні
                            </Button>
                            <Button variant="danger" onClick={confirmDelete}>
                                Так, видалити
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default DataTable;



