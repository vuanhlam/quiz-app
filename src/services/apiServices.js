import axios from '~/utils/axiosCustomize';

// những logic liên quan đến gọi API sẽ gọi ở đây những hàm này đơn thuần trả ra phản hồi
// còn ở phía Component sẽ gọi những hàm này gián tiếp qua những hàm này để lấy phản hồi từ API 

// --- add new user ---
const postCreateNewUser = (email, password, userName, role, avatar) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', avatar);

    return axios.post('api/v1/participant', data);
};

// -- get all users --
const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

// -- delete a user --
const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', {data: {id: userId}});
}

// -- update user --
const putUpdateUser = (id, userName, role, avatar) => {
    const data = new FormData();
    data.append('id', id)
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', avatar);

    return axios.put('api/v1/participant', data);
};


export { 
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser
} 