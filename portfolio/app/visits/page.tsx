"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BACKEND_PAGINATION_NUMBER = 5;
export default function Visits() {
  const [resp, setResp] = useState({});
  const [forPreviousResultsLEK, SetForPreviousResultsLEK] = useState(null);
  const [lekMap, setLekMap] = useState(new Map());

  const [isPrevBtnEnabled, SetIsPrevBtnEnabled] = useState(false);
  const [isNextBtnEnabled, SetIsNextBtnEnabled] = useState(true);
  const [pageNumber, SetPageNumber] = useState(1);
  const [isLoading, SetIsLoading] = useState(true);
  const mobile = useMediaQuery("(max-width:480px)");

  useEffect(() => {
    setLekMap(lekMap.set("1", null));
    (async () => {
      axios
        .get("https://api.valluri-tech.com/portfolio")
        .then((response: any) => {
          // Handle the response
          setResp(response?.data);
          if (Object.keys(response?.data).indexOf("LastEvaluatedKey") === -1) {
            SetIsNextBtnEnabled(false);
          }
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
    //@ts-ignore
    if (resp && resp?.LastEvaluatedKey) {
      axios
        .get("https://api.valluri-tech.com/portfolio", {
          params: {
            queryParams: JSON.stringify({
              //@ts-ignore
              LastEvaluatedKey: resp?.LastEvaluatedKey,
              //@ts-ignore
              totalNumberRows: resp?.totalNumberRows,
            }),
          },
        })
        .then((response: any) => {
          // If you have displayed 'n' number of results
          // And if you add the scanned count
          SetIsLoading(false);
          setLekMap(
            lekMap.set(
              Number(pageNumber + 2).toString(),
              response?.data?.LastEvaluatedKey
            )
          );
          //@ts-ignore
          if (Object.keys(response?.data).indexOf("LastEvaluatedKey") === -1) {
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
              //@ts-ignore
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
        {mobile ? (
          <IconButton
            aria-label="delete"
            onClick={getPreviousResults}
            disabled={!isPrevBtnEnabled}
          >
            <ArrowBackIosIcon />
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosIcon />}
            onClick={getPreviousResults}
            disabled={!isPrevBtnEnabled}
          >
            Prev
          </Button>
        )}

        <Chip
          label={
            //@ts-ignore
            !isLoading && resp?.totalNumberRows
              ? //@ts-ignore
                `Page ${pageNumber}. Total records : ${resp?.totalNumberRows}`
              : "Loading"
          }
          color="primary"
          variant="outlined"
          sx={{ mt: 0.5, ml: mobile ? 0 : 15, mr: mobile ? 0 : 15 }}
        ></Chip>

        {mobile ? (
          <IconButton
            aria-label="delete"
            onClick={getNextResults}
            disabled={!isNextBtnEnabled}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIosIcon />}
            onClick={getNextResults}
            disabled={!isNextBtnEnabled}
          >
            Next
          </Button>
        )}
      </Box>

      <br />
      {/* @ts-ignore */}
      {!isLoading && resp?.totalNumberRows && resp?.ScannedCount && (
        <Chip
          label={`Showing records ${
            //@ts-ignore
            BACKEND_PAGINATION_NUMBER * (pageNumber - 1) + 1
            //@ts-ignore
          } to ${
            //@ts-ignore
            BACKEND_PAGINATION_NUMBER * (pageNumber - 1) + resp?.ScannedCount
          }`}
          color="success"
        ></Chip>
      )}

      <br />
      <br />
      {isLoading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {/* @ts-ignore */}

          {resp?.Items?.map((visit: any, index: number) => {
            let ls = visit.UserAgent.S + " - " + visit.Location.S;
            return (
              <ListItem disablePadding key={index}>
                <ListItemButton>
                  <ListItemText primary={visit.HitTIme.S} secondary={ls} />
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


