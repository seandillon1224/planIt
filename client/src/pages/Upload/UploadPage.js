import React, {Component} from "react";
import API from '../../utils';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalFooter, ModalBody, Row, Col } from 'reactstrap';
    
class UploadPage extends Component {
  constructor(props){
    super(props);
    this.state={
      img:{
        img_file:null,
        name:""
      },
      form: {
        name: ""
      }
    }
    this.changeForm = this.changeForm.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.saveCongratsForm = this.saveCongratsForm.bind(this);
  }

  changeForm(event) {
    const field = event.target.name;
    const form = this.state.form;
    form[field] = event.target.value;
    this.setState({form});
  }

  fileUpload(event){
    let reader = new FileReader();
    let file = event.target.files[0];
    let fileName = file.name;
    reader.onload = (upload) => {
      this.setState({img:{
        img_file: upload.target.result,
        name:fileName
      }});
    }
    reader.readAsDataURL(file)
  }

  saveCongratsForm(event){
    event.preventDefault();
    console.log(this.state.form.name)

    const data = {
      name: this.state.form.name,
      file: this.state.img.name,
      img_file: this.state.img.img_file,
    };
    API.saveEmail(data)
    .then(res=>{
      this.setState({errors:res.data});
    }).catch(err=>{
      console.log(err);
    });
  }

  render() {
    return (
      <div>
         <FormGroup encType='multipart/form-data'>
              <Label for="file">Featured Image</Label>
              <Input type="file" name="file" id="file" onChange={this.fileUpload}/>
          </FormGroup>
              <div className="button-group">
           
              <Button color="warning" onClick={this.saveCongratsForm}>Save</Button>
              
              <p className="text-muted bottom-label">
                  Save Image.
              </p>
          </div>
      </div>
    )
  }
}


export default UploadPage;