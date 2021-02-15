import React from 'react';
import { FaTrash } from 'react-icons/fa';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

function MessaseItem({
  message: { id, body, sender, receiver, sent, title },
  active,
  deleteMessage,
}) {
  return (
    <div className="card m-2">
      <div className="card-body">
        <div className="d-flex">
          <div className="mr-auto">
            <h5 className="card-title">{title}</h5>
          </div>
          <div
            role="button"
            tabIndex="0"
            onKeyPress={null}
            onClick={() => deleteMessage(id)}
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <FaTrash color="red" />
          </div>
        </div>
        <p className="text-muted">
          {active === '/inbox' ? `from: ${sender}` : `to: ${receiver}`}
        </p>
        <small className="text-muted">{timeAgo.format(Date.parse(sent))}</small>
        <p className="card-text">{body}</p>
      </div>
    </div>
  );
}

export default MessaseItem;
