import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import { useDispatch } from "react-redux";
import { courseApi } from "../../../Store/coursesSlice";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { course_pic } from "../../../Helper";

const Courses = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.course);
  console.log(data.data);
  useEffect(() => {
    dispatch(courseApi());
  }, []);
  return (
    <Box>
      <Container>
        <Grid container sx={{ marginTop: "50px" }}>
          {data.data.map((item) => (
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <Card
                sx={{
                  width: "280px",
                  height: "520px",
                  marginTop: "20px",
                  marginLeft: "30px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={course_pic(item._id)}
                    alt="green iguana"
                    sx={{ height: "280px" }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "center", fontWeight: "300" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ textAlign: "center", paddingRight: "2px" }}
                    >
                      <span style={{ color: "#1abd36", fontWeight: "800" }}>
                        {item.fees}
                      </span>
                      /{item.duration}
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                      Pre-requisties:{item.requirement}
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                      Course Duration:{item.duration}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      backgroundColor: "#1abd36",
                      color: "whitesmoke",
                      fontWeight: "800",
                    }}
                    component={Link}
                    to={`/Courses/${item._id}`}
                  >
                    Apply Course
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Courses;
