import {connect} from 'react-redux';
import {loadFile} from '../actions';
import FileUpload from '../components/FileUpload';

const mapDispatchToProps = (dispatch) => {
  return {
    onDrop: (file) => dispatch(loadFile(file))
  }
}

export default connect(null, mapDispatchToProps)(FileUpload);
