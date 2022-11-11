import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

import styles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router";

function PostEditForm() {

  const [ errors, setErrors ] = useState({});
  const [ categories, setCategories ] = useState([]);
  
  const [ postData, setPostData ] = useState({
    title: '',
    content: '',
    category: '',
    image: '', 
  });

  // To get category option values from API using axios.options
  useEffect(() => {
    try {
      axiosReq.options('/posts/').then((response) => {
        setCategories(response.data.actions.POST.category.choices)
        console.log(response)
      });
    } catch (err) {

    }
  }, []);

  const { title, content, category, image } = postData;
 
  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`)
        const { title, content, image, category, is_owner } = data;

        is_owner ? setPostData({title, content, image, category}) : history.push('/');
      } catch (err) {
          console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

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

    if (imageInput?.current?.files[0]) {
      formData.append('image', imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`posts/${id}`, formData);
      history.push(`/posts/${id}`);
    }
    catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center align-items-center p-2 pr-lg-4 pt-lg-5">
      <h1 className={`pt-2 ${styles.Text}`}>Edit post</h1>
      <hr></hr>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className="shadow"/>
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
          className="shadow"/>
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
          {categories?.map(choice => {
            return (
              <option value={choice.value} key={choice.value}>{choice.display_name}</option>
            )
          })}
        </Form.Control>
      </Form.Group>

      <Button
        className={`${btnStyles.Button}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>

      <Button className={`${btnStyles.Button} `} type="submit">
        Save
      </Button>
    </div>
  );

  return (
    <Form
      onSubmit={handleSubmit}
      className="ml-5 ml-md-3 mt-3 card shadow">
      <Row>
        <Col className="py-2 pt-2 p-md-2 align-items-center d-flex" md={8}>
          <Container
            className={`${styles.Container} pt-2 d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={`shadow ${styles.Image}`} src={image} rounded/>
              </figure>
              <div>
                <Form.Label
                  className={` ${btnStyles.Button}  btn`}
                  htmlFor="image-upload">
                  Change the image
                </Form.Label> 
              </div>
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
        <Col md={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={styles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;