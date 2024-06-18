import { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import axios from "axios";
import Navbar from "../components/navbar";

const Collections = () => {
  const [figures, setFigures] = useState([]);
  const groupedFigures = [];

  useEffect(() => {
    console.log(groupedFigures);
  });

  useEffect(() => {
    axios.get("http://localhost:3004/figures").then(function (response) {
      console.log(response);
      setFigures(response.data);
    });
  }, []);

  for (let i = 0; i < figures.length; i += 3) {
    groupedFigures.push(figures.slice(i, i + 3));
  }

  return (
    <div className="App">
      <Navbar />
      {groupedFigures.length
        ? groupedFigures.map((row, rowIndex) => (
            <div className="figure-row" key={rowIndex}>
              {row.map((figure, index) => (
                <div className="figure-card" key={index}>
                  <img src={figure.image} alt={`Sonny Angel figure ${index}`} />
                  <p>{figure.caption}</p>
                  <AddCircleOutlineIcon
                    style={{ position: "absolute", top: 10, right: 10 }}
                    onClick={() => console.log(figure)}
                  />
                </div>
              ))}
            </div>
          ))
        : null}
    </div>
  );
};

export default Collections;
