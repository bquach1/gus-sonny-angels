import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateItem } from '../actions';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Fab from '@mui/material/Fab';

import axios from "axios";
import Navbar from "../components/navbar";

const SeriesTabs = styled(Tabs)`
  .Mui-selected {
    font-weight: 900;
    color: black;
  }
`

const Collections = () => {
  const [figures, setFigures] = useState([]);
  const [groupedFigures, setGroupedFigures] = useState([]);
  const [seriesList, setSeriesList] = useState(new Set());
  const [atTop, setAtTop] = useState(false);
  const [isSeriesSelected, setIsSeriesSelected] = useState(false);
  const [topButtonShow, setTopButtonShow] = useState(false);

  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const scrollViewRef = useRef(null);

  const handleAddItem = (newCaption, newImage) => {
    const newItem = { caption: newCaption, image: newImage };
    dispatch(addItem(newItem));
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItem(index));
  };

  const handleUpdateItem = (index) => {
    const updatedItem = { caption: 'Updated Caption', image: 'updatedImage.jpg' };
    dispatch(updateItem(index, updatedItem));
  };

  useEffect(() => {
    axios.get("http://localhost:3004/figures").then(function (response) {
      setFigures(response.data);
    });

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setAtTop(true);
        setSeriesSelected(null);
      } else {
        setAtTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const newSeriesList = new Set();
    figures.forEach(figure => {
      newSeriesList.add(figure.series.replace(/^\s+/, ''));
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
    }
    else {
      setTopButtonShow(false);
    }
  }, [atTop, isSeriesSelected])

  const headerRefs = useRef(new Map());

  const handleChange = (event, newValue) => {
    setSeriesSelected(newValue);
    const seriesName = [...seriesList].sort()[newValue];
    if (headerRefs.current.get(seriesName)) {
      setIsSeriesSelected(true);
      headerRefs.current.get(seriesName).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const [seriesSelected, setSeriesSelected] = useState(0);

  return (
    <div className="App" ref={scrollViewRef}>
      <Navbar />
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        <SeriesTabs
          style={{ width: "100%", display: "flex" }}
          value={seriesSelected}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {[...seriesList].sort().map((series, index) => {
            return (
              <Tab style={{ textTransform: "none", }} label={series} key={`${series}-${index}`} />
            )
          })}
        </SeriesTabs>
      </Box>
      {groupedFigures.length
        ? groupedFigures.map((row, rowIndex) => {
          const showHeader = rowIndex === 0 || row[0].series !== groupedFigures[rowIndex - 1][0].series;
          return (
            <React.Fragment key={rowIndex}>
              {showHeader && (
                <h3 ref={(el) => headerRefs.current.set(row[0].series, el)} style={{ paddingTop: 10, paddingBottom: 10 }}>{row[0].series}</h3>
              )}
              <div className="figure-row">
                {row.map((figure, index) => (
                  <div className="figure-card" key={index}>
                    {items.items.some(item => item.caption === figure.caption) &&
                      <CheckCircleIcon
                        style={{ position: "absolute", top: 10, left: 10, color: "#90ee90" }}
                        onClick={() => handleAddItem(figure.caption, figure.image)}
                      />}
                    <img src={figure.image} alt={`Sonny Angel figure ${index}`} />
                    <p>{figure.caption}</p>
                    <AddCircleOutlineIcon
                      style={{ position: "absolute", top: 10, right: 10 }}
                      onClick={() => handleAddItem(figure.caption, figure.image)}
                    />
                  </div>
                ))}
              </div>
            </React.Fragment>
          );
        })
        : null}
      {topButtonShow && <Fab variant="extended" style={{ position: "fixed", bottom: 50, right: 50, opacity: 0.5 }} onClick={() => handleBackToTop()}>
        <ArrowUpwardIcon />
        Back to Top
      </Fab>}
    </div>
  );
};

export default Collections;
