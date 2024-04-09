"use client";
import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

const ExperienceCard = (props: any) => {
  // const largeDesktop = useMediaQuery("(min-width:1200px)");
  const desktop = useMediaQuery("(min-width:992px)");
  const tablet = useMediaQuery("(max-width:991px)");
  const mobile = useMediaQuery("(max-width:480px)");
  const { companyName, workDuration, imageName, width, height } = props;
  let imageStyle = {
    borderRadius: "8%",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: tablet ? "column" : "row",
        width: "80%",
        height: mobile ? "" : "10rem",
        marginLeft: "1rem",
        boxShadow: "-1px 0.5px 3px #1976d2",
        padding: "2rem",
        marginTop: "2rem",
      }}
    >
      <Box
        sx={{
          marginRight: "5rem",
          marginBottom: tablet ? "0.5rem" : "",
        }}
      >
        <Image
          src={`/${imageName}`}
          width={width}
          height={height}
          alt="ABB company logo"
          style={imageStyle}
          priority={true}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          // marginBottom: tablet ? "1rem" : mobile ? "2rem" : "",
        }}
      >
        <Typography component="h1" variant={"body1"} color="primary.main">
          {companyName}
        </Typography>
        <Typography component="h1" variant={"body1"} color="primary.main">
          {workDuration}
        </Typography>
      </Box>
    </Box>
  );
};

const ExpInfo = [
  {
    name: "Slalom Build",
    duration: "2022 Jan - Present",
    imgName: "build.jpg",
    width: 75,
    height: 70,
  },
  {
    name: "ANZ Bank",
    duration: "2021 Dec - 2022 Jan",
    imgName: "anz.jpg",
    width: 140,
    height: 40,
  },
  {
    name: "Infosys Australia Pvt Ltd",
    duration: "2021 Dec - 2022 Jan",
    imgName: "infy.jpg",
    width: 150,
    height: 70,
  },
  {
    name: "ABB",
    duration: "2010 July - 2021 Nov",
    imgName: "abb.jpg",
    width: 120,
    height: 40,
  },
];
export default function Experience() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {ExpInfo.map((exp, index) => (
        <ExperienceCard
          companyName={exp.name}
          workDuration={exp.duration}
          imageName={exp.imgName}
          width={exp.width}
          height={exp.height}
          key={index}
        />
      ))}
      <Box sx={{ opacity: 0 }}>hi</Box>
    </Box>
  );
}
