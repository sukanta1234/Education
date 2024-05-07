import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  add,
  blogApi,
  categoryApi,
  categoryWiseApi,
  recentPostApi,
  searchApi,
} from "../../../Store/blogSlice";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { blog_pic } from "../../../Helper";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BlogData from "../BlogData/BlogData";
import { Link } from "react-router-dom";

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog);
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    dispatch(blogApi());
    dispatch(categoryApi());
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  useEffect(() => {
    dispatch(recentPostApi());
  }, []);

  const handleCLick = (id) => {
    dispatch(categoryWiseApi(id));
  };

  const handleAll = () => {
    dispatch(blogApi());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchApi(input));
    setInput("");
  };
  const recentClick = (val) => {
    // console.log(val);
    dispatch(add(val));
  };
  // console.log(data.pdata);
  const truncatedText = (text, maxLength) => {
    if (text.length > maxLength) {
        text = text.substring(0, maxLength);
        text = text.replace(/<[^>]*>/g, ''); 
        return text + "....";
    }
    return text;
};

  return (
    <Container sx={{ marginTop: "50px", marginBottom: "50px" }}>
      <Grid container spacing={4}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          {loading ? (
            <Skeleton height={"450px"} width={"600px"} />
          ) : (
            <>
              {data.bdata.length === 0 ? (
                <p>No Data</p>
              ) : (
                <>
                  {data.bdata.map((item, index) => (
                    <Card
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        marginTop: "30px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={item.title}
                        image={blog_pic(item._id)}
                        sx={{ height: 450, objectFit: "cover" }}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ fontWeight: "600" }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          // dangerouslySetInnerHTML={{ __html: item.postText }}
                          variant="body2"
                          sx={{ marginLeft: "15px" }}
                          dangerouslySetInnerHTML={{__html:truncatedText(item.postText, 150)}}
                        >
                          
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                          size="small"
                          component={Link}
                          to={`/blogdata/${item._id}`}
                        >
                          Read More.....
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </>
              )}
            </>
          )}
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <form className="form-container" onSubmit={handleSubmit}>
              <input
                type="text"
                name="input"
                id="input"
                value={input}
                onChange={handleChange}
              />
              <button type="submit" style={{ marginLeft: "50%" }}>
                Search
              </button>
            </form>
            <Button sx={{ marginBottom: "20px" }} onClick={handleAll}>
              All
            </Button>
            {data.cdata.map((item) => (
              <Button
                key={item._id}
                sx={{ marginBottom: "10px" }}
                onClick={() => handleCLick(item._id)}
              >
                {item.category}
              </Button>
            ))}
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ marginLeft: "60px", fontWeight: "800" }}
            >
              Recent Post
            </Typography>
            {data.pdata?.map((item) => (
              <div
                key={item._id}
                style={{
                  marginTop: "30px",
                  marginLeft: "60px",
                  display: "flex",
                }}
              >
                <img
                  src={blog_pic(item._id)}
                  alt=""
                  height={"80px"}
                  width={"100px"}
                />
                <Button
                  sx={{ marginLeft: "20px", fontWeight: "700" }}
                  onClick={() => recentClick(item)}
                >
                  {item.title}
                </Button>
              </div>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Blog;
