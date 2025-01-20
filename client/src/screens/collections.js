import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, addWishlist, removeItem, removeWishlist } from "../actions";
import styled from "styled-components";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TocIcon from "@mui/icons-material/Toc";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import axios from "axios";
import { DEV_DB_URL, PROD_DB_URL } from "../constants";

const SeriesTabs = styled(Tabs)`
  .Mui-selected {
    font-weight: 900;
    color: black;
  }
`;

const FigureDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    width: 40px;
    height: 40px;
  }

  .MuiFab-primary {
    color: ${(props) => (props.selected ? "white" : "auto")};
    background-color: ${(props) => (props.selected ? "#90EE90" : "auto")};

    &:hover {
      background-color: ${(props) => (props.selected ? "#90EE90" : "auto")};
    }
  }
`;

const actions = [
  { icon: <AddCircleOutlineIcon />, name: "Add" },
  { icon: <TocIcon />, name: "Want" },
];

const Collections = ({ email }) => {
  const [figures, setFigures] = useState([]);
  const [groupedFigures, setGroupedFigures] = useState([]);
  const [seriesList, setSeriesList] = useState(new Set());
  const [atTop, setAtTop] = useState(false);
  const [isSeriesSelected, setIsSeriesSelected] = useState(false);
  const [topButtonShow, setTopButtonShow] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const items = useSelector((state) => state.items);

  const dispatch = useDispatch();

  const scrollViewRef = useRef(null);

  const handleAddItem = (newCaption, newImage, rowIndex, index) => {
    const newItem = {
      caption: newCaption,
      image: newImage,
      rowIndex: rowIndex,
      index: index,
    };
    dispatch(addItem(newItem));

    axios
      .post(
        `${DEV_DB_URL}/add_figures`,
        {
          email: email,
          caption: newCaption,
          image: newImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleRemoveItem = ({ rowIndex, index }) => {
    dispatch(removeItem([rowIndex, index]));
  };

  const handleAddWishlistItem = (newCaption, newImage) => {
    const newWishlistItem = { caption: newCaption, image: newImage };
    dispatch(addWishlist(newWishlistItem));
  };

  const handleRemoveWishlistItem = (index) => {
    dispatch(removeItem(index));
  };

  useEffect(() => {
    axios.get(`${DEV_DB_URL}/figures`).then(function (response) {
      setFigures(response.data);
      setLoaded(true);
    });

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setAtTop(true);
        setSeriesSelected(0);
      } else {
        setAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const newSeriesList = new Set();
    figures.forEach((figure) => {
      newSeriesList.add(figure.series.replace(/^\s+/, ""));
    });
    setSeriesList(newSeriesList);

    const sortedFigures = [...figures].sort((a, b) => {
      if (a.series.trim() < b.series.trim()) {
        return -1;
      }
      if (a.series.trim() > b.series.trim()) {
        return 1;
      }
      if (a.caption.trim() < b.caption.trim()) {
        return -1;
      }
      if (a.caption.trim() > b.caption.trim()) {
        return 1;
      }
      return 0;
    });

    const newGroupedFigures = [];
    let currentSeries = "";
    let tempGroup = [];

    for (let i = 0; i < sortedFigures.length; i++) {
      const figure = sortedFigures[i];

      if (tempGroup.length === 0) {
        currentSeries = figure.series;
      }

      if (figure.series === currentSeries) {
        tempGroup.push(figure);
      } else {
        if (tempGroup.length > 0) {
          newGroupedFigures.push(tempGroup);
        }
        tempGroup = [figure];
        currentSeries = figure.series;
      }

      if (tempGroup.length === 3) {
        newGroupedFigures.push(tempGroup);
        tempGroup = [];
      }
    }

    if (tempGroup.length > 0) {
      newGroupedFigures.push(tempGroup);
    }

    setGroupedFigures(newGroupedFigures);
  }, [figures]);

  useEffect(() => {
    if (!atTop && isSeriesSelected) {
      setTopButtonShow(true);
    } else {
      setTopButtonShow(false);
    }
  }, [atTop, isSeriesSelected]);

  const headerRefs = useRef(new Map());

  const handleChange = (event, newValue) => {
    setSeriesSelected(newValue);
    const seriesName = [...seriesList].sort()[newValue];
    if (headerRefs.current.get(seriesName)) {
      setIsSeriesSelected(true);
      headerRefs.current.get(seriesName).scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [seriesSelected, setSeriesSelected] = useState(0);

  return (
    <div className="App" ref={scrollViewRef}>
      {!loaded ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <span style={{ marginTop: 10, fontWeight: 900 }}>
            Loading figure data...
          </span>
        </div>
      ) : (
        <>
          <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            <SeriesTabs
              style={{ width: "100%", display: "flex" }}
              value={seriesSelected}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {[...seriesList].sort().map((series, index) => {
                return (
                  <Tab
                    style={{ textTransform: "none" }}
                    label={series}
                    key={`${series}-${index}`}
                  />
                );
              })}
            </SeriesTabs>
          </Box>
          {groupedFigures.length
            ? groupedFigures.map((row, rowIndex) => {
                const showHeader =
                  rowIndex === 0 ||
                  row[0].series !== groupedFigures[rowIndex - 1][0].series;
                return (
                  <div style={{ width: "90%" }} key={rowIndex}>
                    {showHeader && (
                      <h3
                        ref={(el) => headerRefs.current.set(row[0].series, el)}
                        style={{ paddingTop: 10, paddingBottom: 10 }}
                      >
                        {row[0].series}
                      </h3>
                    )}
                    <div className="figure-row">
                      {row.map((figure, index) => (
                        <div className="figure-card" key={index}>
                          {items.items.some(
                            (item) =>
                              item.caption === figure.caption &&
                              item.image === figure.image
                          ) && (
                            <RemoveCircleIcon
                              style={{
                                position: "absolute",
                                top: 20,
                                left: 10,
                                color: "#FFCCCB",
                              }}
                              onClick={() =>
                                handleRemoveItem({ rowIndex, index })
                              }
                            />
                          )}
                          <img
                            src={figure.image}
                            alt={`Sonny Angel figure ${index}`}
                          />
                          <p>{figure.caption}</p>
                          <FigureDial
                            ariaLabel="SpeedDial basic example"
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 20,
                              fontSize: 20,
                            }}
                            icon={
                              items.items.some(
                                (item) =>
                                  item.rowIndex === rowIndex &&
                                  item.index === index
                              ) ? (
                                <CheckCircleIcon
                                  style={{ backgroundColor: "#90EE90" }}
                                />
                              ) : (
                                <SpeedDialIcon />
                              )
                            }
                            direction="left"
                            selected={items.items.some(
                              (item) =>
                                item.rowIndex === rowIndex &&
                                item.index === index
                            )}
                          >
                            {actions.map((action) => (
                              <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => {
                                  action.name === "Add"
                                    ? handleAddItem(
                                        figure.caption,
                                        figure.image,
                                        rowIndex,
                                        index
                                      )
                                    : action.name === "Want"
                                    ? handleAddWishlistItem(
                                        figure.caption,
                                        figure.image
                                      )
                                    : console.log("Invalid action");
                                }}
                              />
                            ))}
                          </FigureDial>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            : null}
          {topButtonShow && (
            <Fab
              variant="extended"
              style={{ position: "fixed", bottom: 50, right: 50, opacity: 0.5 }}
              onClick={() => handleBackToTop()}
            >
              <ArrowUpwardIcon />
              Back to Top
            </Fab>
          )}
        </>
      )}
    </div>
  );
};

export default Collections;
