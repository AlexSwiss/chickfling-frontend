
import React, { useEffect } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from "react-redux";
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import Default from '../../Assets/default.png'
import { fetchUser } from '../../store/modules/posts/actions/postsAction'
import Navigation from '../Navigation'
import EditPost from './EditPost';
import DeletePost from './DeletePost'


const UserDetails = (props) => {

  const userID  = props.match.params.id

  const dispatch = useDispatch()

  const singleUser = id => dispatch(fetchUser(id))

  const currentState = useSelector(state => state)

  const user = currentState.UsersState.user

  const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : ""

//Get the avatar of the author of the post
let $imagePreview = null;
if(user.avatar_path){
  $imagePreview = (<img className="img_style_post" src={user.avatar_path} alt="no one"/>);
} else {
  $imagePreview = (<img className="img_style_post" src={Default} alt="no one 2"/>);
}


  useEffect(() => {
    singleUser(userID)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="mt-5 style-card">
          <Card>
            <CardBody style={{paddingBottom: "0px"}}>
            <CardTitle>
              <span>
                <span className="mr-2">
                  {$imagePreview}
                </span>
                <span href="" style={{fontWeight: 'bold'}}>{user.username}<br />{user.email}</span>
              </span>
              </CardTitle>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UserDetails