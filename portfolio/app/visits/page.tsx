"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Visits() {
  const [resp, setResp] = useState({});

  useEffect(() => {
    console.log("send request - Visits page");
    (async () => {
      axios
        .get("https://api.valluri-tech.com/portfolio")
        .then((response: any) => {
          // Handle the response
          setResp(response?.data);
        })
        .catch((error: any) => {
          // Handle errors
          console.log("error");
        });
    })();
  }, []);

  //   console.log(resp);
  async function getNextResults() {
    // axios
    //   .get("https://api.valluri-tech.com/portfolio")
    //   .then((response: any) => {
    //     // Handle the response
    //     setResp(response?.data);
    //   })
    //   .catch((error: any) => {
    //     // Handle errors
    //     console.log("error");
    //   });
    if (resp) {
      //   const LastEvaluatedKey = resp?.LastEvaluatedKey;
      //   const  = resp?.totalNumberRows;
      //   const qpStr = encodeURI(
      //     JSON.stringify({ LastEvaluatedKey, totalNumberRows })
      //     // JSON.stringify({ name: "satya", location: "Melbourne" })
      //   );
      //   console.log(decodeURI(qpStr));
      //   let lek = JSON.stringify(resp?.LastEvaluatedKey);
      //   let tnr = JSON.stringify(resp?.totalNumberRows);
      axios
        .get("https://api.valluri-tech.com/portfolio", {
          params: {
            queryParams: JSON.stringify({
              LastEvaluatedKey: resp?.LastEvaluatedKey,
              totalNumberRows: resp?.totalNumberRows,
            }),
          },
        })
        .then((response: any) => setResp(response?.data))
        .catch((error: any) => console.log(error));
    }
  }

  return (
    <>
      <ul>
        {/* @ts-ignore */}
        {resp?.Items?.map((visit: any, index: number) => {
          return (
            <li key={index}>
              {visit.UserAgent.S} {visit.Location.S}{" "}
              {visit.DHMS.S.replace(/[#]/g, "-")}
            </li>
          );
        })}
        {resp?.totalNumberRows && (
          <div>
            <br />
            Showing {resp?.Count} results out of {resp?.totalNumberRows}{" "}
            results.
          </div>
        )}
      </ul>
      <br />
      <button onClick={getNextResults}>Get Next Results</button>
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
