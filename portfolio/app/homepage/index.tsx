"use client";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HomePage() {
  const mobile = useMediaQuery("(max-width:480px)");

  const imageStyle = {
    borderRadius: "50%",
    my: "8rem",
    position: mobile ? "absolute" : "static",
    top: mobile ? "10px" : "",
    right: mobile ? "10px" : "",
  };

  return (
    <>
      <Box sx={{ my: mobile ? "" : "8rem" }}>
        <Image
          src={"/profile.jpg"}
          width={mobile ? 100 : 200}
          height={mobile ? 100 : 200}
          alt="Picture of the Prakash"
          style={imageStyle}
          priority={true}
        />
      </Box>
      <Box sx={{ my: mobile ? "8rem" : "" }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Prakash is working as a Senior Software engineer at Slalom Build.
        </Typography>
        <Typography
          component="h1"
          variant="h6"
          gutterBottom
          sx={{ my: "2rem" }}
        >
          He has worked in different software technologies which are used in
          todays web development world.
        </Typography>
      </Box>
    </>
  );
}
