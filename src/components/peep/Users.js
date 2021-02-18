import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import './Posts.css';

import { fetchUsers } from '../../store/modules/posts/actions/postsAction';
import User from './User'


const Users = () => {

  const usersSelector = useSelector((state) => state.UsersState);
  const dispatch = useDispatch();

  // console.log("this is the post state: ", postsSelector)

  const getUsers = () => dispatch(fetchUsers());

  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let users = usersSelector.users.map((user) => {
    return (
      <div  className="mt-2 style-card" key={user.id}>
         <Link to={'/users/' + user.id} key={user.id}>
          <User user={user} key={user.id} />
        </Link>
      </div>
    );
  })
  return (
    <div className="container">{users}</div>
  )
}

export default Users
