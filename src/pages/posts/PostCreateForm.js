import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

import Asset from '../../components/Asset';

import UploadImg from "../../assets/uploadimage.png";

import styles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
  useRedirect('loggedOut');

  const [ errors, setErrors ] = useState({});
  const [ categories, setCategories ] = useState([]);
  const [ postData, setPostData ] = useState({
    title: '',
    content: '',
    category: '',
    image: '', 
  });

  /* Hook to get category option values from API using axios.options*/
  useEffect(() => {
    try {
      axiosReq.options('/posts/').then((response) => {
        setCategories(response.data.actions.POST.category.choices)
      });
    } catch (err) {""}
  }, []);

  const { title, content, category, image } = postData;
 
  const imageInput = useRef(null);
  const history = useHistory();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('image', imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post('posts/', formData);
      history.push(`/posts/${data.id}`);
    }
    catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center align-items-center p-2 pr-lg-4 pt-lg-5">
      <h1 className={`pt-2 ${styles.Text}`}>New post</h1>
      <hr></hr>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className="shadow"
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="content"
          value={content}
          onChange={handleChange}
          className="shadow"
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
          className="shadow"
        >
          <option>Choose...</option>
          {categories?.map(choice => {
            return (
              <option value={choice.value} key={choice.value}>{choice.display_name}</option>
            )
          })}
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.CloseBtn}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} `} type="submit">
        Create
      </Button>
    </div>
  );

  return (
    <Form
      onSubmit={handleSubmit}
      className="mt-3 card shadow">
      <Row>
        <Col className="py-2 pt-2 p-md-2" md={6} lg={8}>
          <Container
            className={`${styles.Container} pt-2 d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={styles.Image} src={image} rounded/>
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
                ref={imageInput}
                />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={6} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={styles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;