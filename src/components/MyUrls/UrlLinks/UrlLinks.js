import React, { useState, useEffect } from "react";
import NavBar from "../../../layouts/NavBar/NavBar";
import "./UrlLinks.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import bg from "../../../assests/images/bg-01.jpg";

function UrlLinks() {
  const navigate = useNavigate();
  let [data, setData] = useState([]);
  let token=localStorage.getItem("token");
  useEffect(() => {
    async function getData() {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        navigate("/");
      } else {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/shortify`,
          {
            headers: {
              accesstoken: localStorage.getItem("token"),
            },
          }
        );
        setData(res.data);
      }
    }
    getData();
  }, [token,navigate]);
  const handleDelete = async (id) => {
    const decodedToken = jwt_decode(localStorage.getItem("token"));
    if (decodedToken.exp * 1000 < Date.now()) {
      navigate("/");
    } else {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/shortify/delete/${id}`,
        {
          headers: {
            accesstoken: localStorage.getItem("token"),
          },
        }
      );
      //to render data after delete the url
      let renderData = data.filter((e) => e._id !== id);
      setData(renderData);
    }
  };

  return (
    <>
      <NavBar />
      <div
          className="container-login100"
          style={{ backgroundImage: `url(${bg})` }}
          >
      <div className="container col-contain ">
                <div className="container shadow ">
        <div className="row row-align">
            <span className="text-start mb-2"> 
              <h4>
                <strong>My Urls</strong>
              </h4>
            </span>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.no</TableCell>
                    <TableCell>Original Url</TableCell>
                    <TableCell align="left">Short Url</TableCell>
                    <TableCell align="left">Clicks</TableCell>
                    <TableCell align="left">CreatedAt</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((e, i) => (
                    <TableRow
                      key={e._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell align="left">
                        <a
                          href={e.orgUrl}
                          target="_blank"
                          rel="noopner noreferrer"
                        >
                          {e.orgUrl}
                        </a>
                      </TableCell>
                      <TableCell align="left">
                        <a
                          href={e.shortUrl}
                          target="_blank"
                          rel="noopner noreferrer"
                        >
                          {e.shortUrl}
                        </a>
                      </TableCell>
                      <TableCell align="left">{e.clicks}</TableCell>
                      <TableCell align="left">{e.created_At}</TableCell>
                      <TableCell align="left">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(e._id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default UrlLinks;
