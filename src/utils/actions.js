import API from './apiService';

export const loginUser = async ({ username, password }, callback) => {
  console.log(username, password);
  try {
    const res = await API.post('/api-token-auth/', { username, password });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      callback();
      return null;
    }
  } catch (err) {
    console.log(err);
    return 'Something went wrong';
  }
};

export const fetchMessages = async (path, callback) => {
  let param;
  console.log(path);
  if (path === '/sent') {
    param = '/messages/sent';
  } else {
    param = '/messages/';
  }
  console.log(param);
  try {
    const res = await API.get(param);
    console.log(res.data);
    callback(res.data.reverse());
    return null;
  } catch (err) {
    console.log('error');
    return 'Error fetching messages';
  }
};

export const sendMessage = async (message, callback) => {
  try {
    const res = await API.post('/messages/', message);
    callback();
    return null;
  } catch (err) {
    console.log(err);
    return 'Error sending message. Please try again';
  }
};

export const deleteMessage = async (id) => {
  try {
    const res = await API.delete(`/messages/${id}`);
    return null;
  } catch (err) {
    console.log(err);
    return 'Error deleting message';
  }
};
