import React  from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js';

class AddAssignment extends React.Component{
  constructor(props) {
      super(props);
      this.state = {id:null, name:'', due:''};
    };

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    };

    handleAdd = () => {
      const token = Cookies.get('XSRF-TOKEN');

      fetch(`${SERVER_URL}/assignment/create?id=${this.state.id}&name=${this.state.name}&due=${this.state.due}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                     'X-XSRF-TOKEN': token  },
          body: {
            id: this.state.id,
            name: this.state.name,
            due: this.state.due
          }
        })
      .then(res => {
          if (res.ok) {
            toast.success("Assignment successfully added", {
                position: toast.POSITION.BOTTOM_LEFT
            });
          } else {
            toast.error("Error when adding", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Post http status =' + res.status);
          }})
      .catch(err => {
        toast.error("Error when adding", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
      })

    };

    render() {

        const { id, name, due } = this.state;
        return(
            <div className="App">
              <Grid container>
                <Grid item align="left">
                   <h4>Create and Assignment:</h4>
                </Grid>
              </Grid>
              <div style={{width:'100%'}}>
                For DEBUG:  display state.
                {JSON.stringify(this.state)}
                <br/><br/>
              </div>
              <TextField autoFocus style = {{width:200}} label="Course ID" name="id" onChange={this.handleChange}  value={id} />
              <br/><br/>
              <TextField autoFocus style = {{width:200}} label="Assignment Name" name="name" onChange={this.handleChange}  value={name} />
              <br/><br/>
              <TextField autoFocus style = {{width:200}} label="Assignment Due Date" name="due" onChange={this.handleChange}  value={due} />
              <br/><br/>
              <div style={{ height: 400, width: '100%' }}>
                <Button id="Submit" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleAdd} >
                   Add Assignment
                </Button>
              </div>
              <ToastContainer autoClose={1500} />
            </div>
            );
        };
}

// required property:  addCourse is a function to call to perform the Add action
AddAssignment.propTypes = {
  addAssignment : PropTypes.func.isRequired
}

export default AddAssignment;
