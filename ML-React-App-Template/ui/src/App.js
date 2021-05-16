import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        //short: '',
        message: ''
        //email: '',
        //contact: ''
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('https://auto-ticket-assignment.herokuapp.com/api', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response,
          isLoading: false
        });
        
      });
      
  }

  handleCancelClick = (event) => {
    this.setState({result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    return (
      <Container>
        <div>
          <h1 className="title">Automatic Ticket Routing</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Short Description</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter keywords/description of issue" 
                  name="short"
                  value={formData.short}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Detailed description</Form.Label>
                <Form.Control 
                  type="textarea" 
                  rows="3"
                  placeholder="Enter detailed description of issue" 
                  name="message"
                  value={formData.message}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              
            <Form.Group as={Col}>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter email address" 
                  name="email"
                  value={formData.email}
                  onChange={this.handleChange} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter contact number" 
                  name="contact"
                  value={formData.contact}
                  onChange={this.handleChange} />
              </Form.Group>


            </Form.Row>

            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Predicting...' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>

          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h3 id="result">Predicted Label : {result}</h3>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default App;