import axios from '~/utils/axiosCustomize';

// những logic liên quan đến gọi API sẽ gọi ở đây những hàm này đơn thuần trả ra phản hồi
// còn ở phía Component sẽ gọi những hàm này gián tiếp qua những hàm này để lấy phản hồi từ API 
const postCreateNewUser = (email, password, userName, role, avatar) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', avatar);

    return axios.post('api/v1/participant', data);
};


export { postCreateNewUser } 