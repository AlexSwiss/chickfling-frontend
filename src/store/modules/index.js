import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { usersState }  from "./posts/reducer/postsReducer";
import { likesState } from './likes/reducer/likesReducer'
import { commentsState } from './comments/reducer/commentsReducer'


const reducer = combineReducers({
  Auth: authReducer,
  UsersState: usersState,
  LikesState: likesState,
  CommentsState: commentsState
})

export default reducer

