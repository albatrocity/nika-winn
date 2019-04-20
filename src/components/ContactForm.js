import React, { Component } from "react";

import {
  Box,
  Heading,
  Form,
  FormField,
  TextInput,
  TextArea,
  Button
} from "grommet";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <Box>
        <Heading level={3}>Contact</Heading>
        <Form
          name="contact"
          method="post"
          action="/contact/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <div hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </div>
          <FormField>
            <TextInput
              className="input"
              type={"text"}
              name={"name"}
              onChange={this.handleChange}
              id={"name"}
              placeholder="Name"
              required={true}
              htmlFor={"name"}
            />
          </FormField>
          <FormField>
            <TextInput
              className="input"
              type={"email"}
              name={"email"}
              onChange={this.handleChange}
              id={"email"}
              required={true}
              htmlFor={"email"}
              placeholder="Email"
            />
          </FormField>

          <FormField>
            <TextArea
              className="textarea"
              name={"message"}
              onChange={this.handleChange}
              id={"message"}
              required={true}
              htmlFor={"message"}
              placeholder="Message"
            />
          </FormField>

          <Button type="submit" primary label="Send" />
        </Form>
      </Box>
    );
  }
}

export default ContactForm;
