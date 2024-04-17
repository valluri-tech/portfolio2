"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/common/Pagination/index";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

export default function Visits() {
  const [resp, setResp] = useState({});
  const [forPreviousResultsLEK, SetForPreviousResultsLEK] = useState(null);
  const [lekMap, setLekMap] = useState(new Map());

  const [isPrevBtnEnabled, SetIsPrevBtnEnabled] = useState(false);
  const [isNextBtnEnabled, SetIsNextBtnEnabled] = useState(true);
  const [pageNumber, SetPageNumber] = useState(1);
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    setLekMap(lekMap.set("1", null));
    (async () => {
      axios
        .get("https://api.valluri-tech.com/portfolio")
        .then((response: any) => {
          // Handle the response
          setResp(response?.data);
          setLekMap(
            lekMap.set(
              Number(pageNumber + 1).toString(),
              response?.data?.LastEvaluatedKey
            )
          );
          SetIsLoading(false);
        })
        .catch((error: any) => {
          // Handle errors
          console.log("error");
        });
    })();
  }, []);

  async function getNextResults() {
    SetIsLoading(true);
    if (resp) {
      axios
        .get("https://api.valluri-tech.com/portfolio", {
          params: {
            queryParams: JSON.stringify({
              LastEvaluatedKey: resp?.LastEvaluatedKey,
              totalNumberRows: resp?.totalNumberRows,
            }),
          },
        })
        .then((response: any) => {
          SetIsLoading(false);

          setLekMap(
            lekMap.set(
              Number(pageNumber + 2).toString(),
              response?.data?.LastEvaluatedKey
            )
          );
          if (pageNumber === resp?.totalNumberRows / resp?.ScannedCount - 1) {
            SetIsNextBtnEnabled(false);
          }
          SetIsPrevBtnEnabled(true);
          setResp(response?.data);
          SetPageNumber((pv) => pv + 1);
        })
        .catch((error: any) => console.log(error));
    }
  }

  async function getPreviousResults() {
    SetIsLoading(true);
    if (resp) {
      axios
        .get("https://api.valluri-tech.com/portfolio", {
          params: {
            queryParams: JSON.stringify({
              LastEvaluatedKey: lekMap.get(Number(pageNumber - 1).toString()),
              totalNumberRows: resp?.totalNumberRows,
            }),
          },
        })
        .then((response: any) => {
          SetIsLoading(false);

          SetIsNextBtnEnabled(true);
          if (pageNumber === 2) {
            SetIsPrevBtnEnabled(false);
          } else {
            SetIsPrevBtnEnabled(true);
          }
          setResp(response?.data);
          SetPageNumber((pv) => pv - 1);
        })
        .catch((error: any) => console.log(error));
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosIcon />}
          onClick={getPreviousResults}
          disabled={!isPrevBtnEnabled}
        >
          Prev
        </Button>
        {/* @ts-ignore */}
        {!isLoading && resp?.totalNumberRows && (
          <Chip
            label={`Page ${pageNumber}. Total records : ${resp?.totalNumberRows}`}
            color="primary"
            variant="outlined"
            sx={{ mt: 0.5, ml: 15, mr: 15 }}
          ></Chip>
        )}
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIosIcon />}
          onClick={getNextResults}
          disabled={!isNextBtnEnabled}
        >
          Next
        </Button>
      </Box>

      <br />
      {!isLoading && resp?.totalNumberRows && (
        <Chip
          label={`Showing records ${
            resp?.ScannedCount * (pageNumber - 1) + 1
          } to ${resp?.ScannedCount * pageNumber}`}
          color="success"
        ></Chip>
      )}

      <br />
      <br />
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <List>
          {resp?.Items?.map((visit: any, index: number) => {
            let ls = visit.UserAgent.S + " - " + visit.Location.S;
            return (
              <ListItem disablePadding key={index}>
                <ListItemButton>
                  <ListItemText
                    primary={visit.DHMS.S.replace(/[#]/g, "-")}
                    secondary={ls}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <br />
    </>
  );
}

// {
//     "Items": [
//       {
//         "Location": { "S": "106.70.166.248" },
//         "UserAgent": { "S": "09 PostmanRuntime/7.36.3" },
//         "YM": { "S": "2024-04" },
//         "DHMS": { "S": "01#22#47#07#387" }
//       },
//       {
//         "Location": { "S": "106.70.166.248" },
//         "UserAgent": { "S": "09 PostmanRuntime/7.36.3" },
//         "YM": { "S": "2024-04" },
//         "DHMS": { "S": "05#22#47#07#387" }
//       }
//     ],
//     "Count": 2,
//     "ScannedCount": 2,
//     "LastEvaluatedKey": {
//       "YM": { "S": "2024-04" },
//       "DHMS": { "S": "05#22#47#07#387" }
//     },
// totalNumberRows: 2
//   }


