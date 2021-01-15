import React, { useEffect, useState } from 'react';
import Detail from './Detail';
import { useStateValue } from "../../StateProvider"

function Notification() {

  const [{ token }, dispatch] = useStateValue();
  const [notifications, setNotification] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/notification', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        setStatus(res.status)
        return res.json();
      })
      .then(resData => {
        if (status === 500) {
          throw new Error(resData.message);
        }
        setNotification(resData["notifications"]);
      })
      .catch(err => {
        alert(err);
      });
  }, [])

  return (
    <div>
      <h1>Notifications</h1>
        {notifications?.map(notification => (
          <Detail key={notification._id} notification={notification} />
        ))}
    </div>
  )
}

export default Notification;