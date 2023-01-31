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
    console.log(role);

    return axios.post('api/v1/participant', data);
};

// -- get all users --
const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
};

// -- delete a user --
const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } }); // urlencoded
};

// -- get user with paginate --
const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

// -- post login --
const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, {
        email,
        password
    });                          // urlencoded
};

// -- post register --
const postRegister = (email, username, password) => {
    return axios.post(`api/v1/register`, {
        email,       
        username,
        password,
    });                          // urlencoded
};

// -- update user --
const putUpdateUser = (id, userName, role, avatar) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', avatar);

    return axios.put('api/v1/participant', data);
};

// ============================================================= QUIZ ===============================================================

// -- get quiz by user --
const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

// -- get quiz Question --
const getDataQuestion = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

// -- post submit quiz --
const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, {...data})       // raw data
}

// -- post create new quiz --
const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);

    return axios.post('api/v1/quiz', data);
}

// -- get All Quiz --
const getAllQuizForAdmin = () => {
    return axios.get('api/v1/quiz/all')
}


export { 
    postCreateNewUser, 
    getAllUsers, 
    putUpdateUser, 
    deleteUser, 
    getUserWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getDataQuestion,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuizForAdmin
};
