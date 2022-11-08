import React, { useState } from "react";

import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";

import UploadImg from "../../assets/uploadimage.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from '../../components/Asset';

function PostCreateForm() {
  const [ errors, setErrors ] = useState({});
  const [ postData, setPostData ] = useState({
    title: '',
    content: '',
    category: '',
    image: '', 
  });
  const { title, content, category, image } = postData;

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImg = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image)
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const textFields = (
    <div className="text-center align-items-center">
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type="text"
          name="title"
          value={title}
          onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="content"
          value={content}
          onChange={handleChange}/>
      </Form.Group>

      <Form.Group >
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}>
          <option>Default value, change later</option>
        </Form.Control>
      </Form.Group>

      <Button
        className={`${btnStyles.Button}`}
        onClick={() => {}}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} `} type="submit">
        Create
      </Button>
    </div>
  );

  return (
    <Form className="ml-2">
      <Row>
        <Col className="py-2 pt-2 p-md-2" md={7} lg={8}>
          <Container
            className={`${styles.Container} pt-2 d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded/>
                  </figure>
                  <div>
                    <Form.Label
                      className={` ${btnStyles.Button}  btn`}
                      htmlFor="image-upload">
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
              <Form.Label
                className={`d-flex justify-content-center `}
                htmlFor="image-upload"
              >
                <Asset
                  src={UploadImg}
                  message={"Click to upload an image"}
                />
              </Form.Label>)}

              <Form.File
                id="image-upload"
                accept="image/*"
                className="d-none"
                onChange={handleChangeImg}
                />

            </Form.Group>
            <div className="d-md-none">{textFields}</div>

          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;