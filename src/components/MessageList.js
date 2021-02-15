import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchMessages, deleteMessage } from '../utils/actions';
import MessageItem from './MessaseItem';
import 'react-toastify/dist/ReactToastify.css';

function MessageList({ location: { pathname } }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await fetchMessages(pathname, (messageList) => {
        setMessages(messageList);
        setIsLoading(false);
      });
      if (res) {
        setError(res);
        setIsLoading(false);
      }
    };
    fetch();
  }, [pathname]);

  const onDeleteClick = async (id) => {
    const res = await deleteMessage(id);
    if (res) {
      toast.error(res);
    } else {
      setMessages(messages.filter((message) => message.id !== id));
      toast.success('Message successfully deleted');
    }
  };

  return (
    <div style={{ marginBottom: 100 }}>
      <h1>{pathname.replace('/', '').toUpperCase()}</h1>
      {isLoading ? (
        'Loading ...'
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            active={pathname}
            deleteMessage={onDeleteClick}
          />
        ))
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>No messages to display</p>
      )}
    </div>
  );
}

export default MessageList;
