import { connect } from 'react-redux';
import listUserComponent from '../../views/User/UsersList'
import { usersList, fetchUser, updateSingleUser } from '../../actions/user/userActions'

const mapDispatchToProps = (dispatch) => {
  return {
    usersList: (filters) => dispatch(usersList(filters)),
    fetchUser: (id) => dispatch(fetchUser(id)),
    updateSingleUser: (id, updatedValue) => dispatch(updateSingleUser(id, updatedValue)),
  }
}
const mapStateToProps = (state) => {
  return {
    fetchedUsers: state.user,
  }
}

const ListUsersContainer = connect(mapStateToProps, mapDispatchToProps)(listUserComponent)
export default ListUsersContainer;
