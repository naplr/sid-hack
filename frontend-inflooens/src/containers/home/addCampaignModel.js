import React from 'react'
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button'

class AddCampaignModel extends React.Component {
  state = {
    name: '',
    age: '',
    sex: ''
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value })
  }

  render() {
    const props = this.props
    return(
    <Dialog open={props.open} onRequestClose={props.onClose}>
      <DialogTitle>Create new campaign</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select target of users
        </DialogContentText>
        <TextField
          onChange={this.handleChange('name')}
          value={this.state.name}
          margin="dense"
          label="Project Name"
          type="text"
          fullWidth
        />
        <FormControl fullWidth={true}>
          <InputLabel>Age Range</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange('age')}
            input={<Input />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>3 - 20</MenuItem>
            <MenuItem value={2}>20 - 40</MenuItem>
            <MenuItem value={3}>40 - 60</MenuItem>
            <MenuItem value={3}>60 - 120</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel>Sex</InputLabel>
          <Select
            value={this.state.sex}
            onChange={this.handleChange('sex')}
            input={<Input />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Male</MenuItem>
            <MenuItem value={2}>Female</MenuItem>
            <MenuItem value={3}>Both</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Location"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>
          Cancel
        </Button>
        <Button onClick={() => props.onAdd(this.state.name)} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
    )
  }
}

AddCampaignModel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onAdd: PropTypes.func
}

export default AddCampaignModel