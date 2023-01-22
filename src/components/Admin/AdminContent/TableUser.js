

function TableUser(props) {

    const { 
        listUsers, 
        handleUpdateUser,
        handleViewUser,
        handleDelete
    } = props;

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0 
                        ?
                        listUsers.map((user, index) => 
                            <tr key={`table-users-${index}`}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button 
                                        className="btn btn-secondary"
                                        onClick={() => handleViewUser(user)}
                                    >
                                        View
                                    </button>
                                    <button 
                                        className="btn btn-warning mx-3"
                                        onClick={() => handleUpdateUser(user)}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(user)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                        : 
                        <tr>
                            <td colSpan="4">No Data Found</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );
}

export default TableUser;
