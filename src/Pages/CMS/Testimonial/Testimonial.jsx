import React, { useEffect } from "react";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {  CardActionArea,} from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { testimonialApi } from "../../../Store/homeSlice";
import Container from "@mui/material/Container";
import { testi_pic } from "../../../Helper";

function MultipleItems() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.home);
  // console.log(data.tdata);
  useEffect(() => {
    dispatch(testimonialApi());
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Box
      className="slider-container"
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "1000px",
        backgroundColor: "#f7f7f7",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "700",
          margin: "20px",
          paddingTop: "70px",
        }}
        className="Sp"
      >
        Testimonial
      </Typography>
      <hr
        style={{
          width: "60px",
          fontWeight: "bold",
          color: "#20b13c",
          border: "2px solid green",
          margin: "0 auto",
        }}
      />
      <Container>
        <Slider {...settings}>
          {data.tdata.map((item) => (
            <Box key={item._id} mx={2}>
              <Card sx={{ maxWidth: 345, height: "500px", marginTop: "30px" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={testi_pic(item._id)}
                    alt="green iguana"
                    sx={{
                      height: "250px",
                      width: "200px",
                      borderRadius: "20%",
                      alignContent: "center",
                      margin: "0 auto",
                      objectFit: "cover",
                      marginTop:"10px"
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="Box">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      "{item.talk}"
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
}

export default MultipleItems;
