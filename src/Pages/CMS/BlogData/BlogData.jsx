import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  blogDataApi,
  commentApi,
  commentFetchApi,
} from "../../../Store/blogDataSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { blog_pic } from "../../../Helper";
import TextField from "@mui/material/TextField";

const BlogData = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const { name, email, comment } = user;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blogData);
  useEffect(() => {
    dispatch(blogDataApi(id));
    dispatch(commentFetchApi(id));
  }, [dispatch, id]);

  const { postText, title } = data.bddata;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      comment: comment,
    };
    dispatch(commentApi({ id, payload: data })).then(()=>dispatch(commentFetchApi(id)))
    
    setUser({
      name: "",
      email: "",
      comment: "",
    });
  };

  return (
    <Box>
      <Container sx={{ marginTop: "50px" }}>
        <Card>
          <CardMedia
            sx={{ height: "300px", objectFit: "cover" }}
            image={blog_pic(id)}
            title="Blog Image"
          />
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "800" }}>
              {title}
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: postText }}
              variant="body2"
              sx={{ marginTop: "10px" }}
            />
          </CardContent>
        </Card>

        <Box sx={{ marginTop: "30px" }}>
          <Typography variant="h5">Comments</Typography>
          {data.cdata.map((item) => (
            <div key={item._id} style={{ marginTop: "10px" }}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body1">{item.comment}</Typography>
            </div>
          ))}
        </Box>

        <Box
          component="form"
          sx={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5">Leave a Reply</Typography>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ marginTop: "10px" }}
            name="name"
            value={name}
            onChange={handleChange}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ marginTop: "10px" }}
            name="email"
            value={email}
            onChange={handleChange}
          />
          <TextField
            id="comment"
            label="Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            sx={{ marginTop: "10px" }}
            name="comment"
            value={comment}
            onChange={handleChange}
          />
          {data.status==="idle"?(<>
            <Button
            type="submit"
            variant="outlined"
            size="large"
            sx={{ marginTop: "20px" }}
          >
            Submit
          </Button>
          </>):(<>
            <Button
            type="submit"
            variant="outlined"
            size="large"
            sx={{ marginTop: "20px" }}
          >
            Loadin..
          </Button>
          </>)}
        </Box>
      </Container>
    </Box>
  );
};

export default BlogData;
