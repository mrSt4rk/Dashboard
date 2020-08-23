import { connect } from 'react-redux';
import EditAdminUserComponent from '../../views/User/EditAdminUser'
import { updateAdminUser, fetchAdminUser } from '../../actions/user/userActions'


const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminUser: () => dispatch(fetchAdminUser()),
    updateAdminUser: (user) => dispatch(updateAdminUser(user))
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const EditAdminUserContainer = connect(mapStateToProps, mapDispatchToProps)(EditAdminUserComponent)
export default EditAdminUserContainer;
