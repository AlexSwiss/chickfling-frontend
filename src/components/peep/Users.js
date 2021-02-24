import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import './Posts.css';

//Material ui core
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';



import { fetchUsers } from '../../store/modules/posts/actions/postsAction';
import User from './User'

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Users = () => {

  const usersSelector = useSelector((state) => state.UsersState);
  const dispatch = useDispatch();

  // console.log("this is the post state: ", postsSelector)

  const getUsers = () => dispatch(fetchUsers());

  const classes = useStyles();

  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let users = usersSelector.users.map((user) => {
    return (
      <Grid container spacing={4}>
      <Grid item key={user.id} xs={12} sm={6} md={4}>
         <Link to={'/users/' + user.id} key={user.id}>
          <User user={user} key={user.id} />
        </Link>
      </Grid>
      </Grid>
    );
  })
  return (
      <div className="container">{users}</div>
  )
}

export default Users
