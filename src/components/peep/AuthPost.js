import React from 'react'
import Moment from 'react-moment';
import { useSelector } from 'react-redux'
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import './Posts.css';
import Default from '../../Assets/default.png'

import EditPost from './EditPost';
import DeletePost from './DeletePost'



const AuthPost = ({ post }) => {

  const currentState = useSelector(state => state)
  const authID = currentState.Auth.currentUser.id

  let $imagePreview = null;
  if(post.author.avatar_path){
    $imagePreview = (<img className="img_style_post" src={post.author.avatar_path} alt="no one"/>);
  } else {
    $imagePreview = (<img className="img_style_post" src={Default} alt="no one 2"/>);
  }
  
  return (
    <Card className="style-card-main">
      <CardBody className="style-card-body">
      <CardTitle>
        <span>
          <span className="mr-2">
            {$imagePreview}
          </span>
          <span href="" style={{fontWeight: 'bold'}}>{post.author.username}</span>
        </span>
        <span style={{float: 'right'}}>
          <Moment fromNow>{post.created_at}</Moment>
        </span>
        </CardTitle>
        <CardTitle>{post.title}</CardTitle>
        <CardText>{post.content}</CardText>
        
      </CardBody>
    </Card>
  )
}

export default AuthPost