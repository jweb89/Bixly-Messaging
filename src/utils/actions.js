import API from './apiService';

export const loginUser = async ({ username, password }, callback) => {
  try {
    const res = await API.post('/api-token-auth/', { username, password });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      callback();
      return null;
    }
  } catch (err) {
    console.log(err);
    return 'Something went wrong. Please try again';
  }
};

export const fetchMessages = async (path, callback) => {
  let param;
  if (path === '/sent') {
    param = '/messages/sent';
  } else {
    param = '/messages/';
  }
  try {
    const res = await API.get(param);
    callback(res.data.reverse());
    return null;
  } catch (err) {
    console.log(err);
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
