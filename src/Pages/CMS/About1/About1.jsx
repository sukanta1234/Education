import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Team from "../Team/Team";

const About = () => {
  return (
    <Box sx={{ marginTop: "50px" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <Box>
              <img src="https://webthemez.com/demo/digi-school-html-website-template/images/features.png" alt="" />
            </Box>
          </Grid>
          <Grid item lg={6}>
            <Box>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consec tetur adipisi cing elit. Ipsa
                sit, numquam amet voluptatibus obcaecati ea maiores totam
                nostrum, ad iure rerum quas harum ipsum. lobcaecati ea maiores
                totam nostrum, ad iure rerum quas harum ipsum. Rem ea ducimus
                quos quae quo.
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ marginTop: "10px", fontWeight: "600" }}
              >
                Skill Central
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam iusto, natus est ducimus saepe laborum
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ marginTop: "10px", fontWeight: "600" }}
              >
                Growth Central
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam iusto, natus est ducimus saepe laborum Lorem ipsum dolor
                sit amet.
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ marginTop: "10px", fontWeight: "600" }}
              >
                Active Central
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam iusto, natus est ducimus saepe laborum Lorem ipsum dolor
                sit amet.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
    </Box>
  );
};

export default About;
