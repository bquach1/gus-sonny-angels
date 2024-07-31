import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateItem } from '../actions';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import axios from "axios";
import Navbar from "../components/navbar";

const Collections = () => {
  const [figures, setFigures] = useState([]);
  const [groupedFigures, setGroupedFigures] = useState([]);
  const [seriesList, setSeriesList] = useState(new Set());

  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

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
  }, []);

  useEffect(() => {
    figures.forEach(figure => {
      setSeriesList(seriesList.add(figure.series));
    });

    const sortedFigures = [...figures].sort((a, b) => {
      if (a.series < b.series) {
        return -1;
      }
      if (a.series > b.series) {
        return 1;
      }
      if (a.caption < b.caption) {
        return -1;
      }
      if (a.caption > b.caption) {
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

  const headerRefs = useRef([...Array(seriesList.size)].map(() => React.createRef()));

  const [seriesSelected, setSeriesSelected] = useState(0);

  const handleChange = (event, newValue) => {
    setSeriesSelected(newValue);
    // Scroll to the corresponding header
    headerRefs[newValue].current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Navbar />
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        <Tabs
          style={{ width: "100%", display: "flex" }}
          value={seriesSelected}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {[...seriesList].sort().map((series, index) => {
            return (
              <Tab label={series} key={`${series}-${index}`} />
            )
          })}
        </Tabs>
      </Box>
      {groupedFigures.length
        ? groupedFigures.map((row, rowIndex) => {
          const showHeader = rowIndex === 0 || row[0].series !== groupedFigures[rowIndex - 1][0].series;
          return (
            <React.Fragment key={rowIndex}>
              {showHeader && (
                <h3 style={{ paddingTop: 10, paddingBottom: 10 }}>{row[0].series}</h3>
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
    </div>
  );
};

export default Collections;
