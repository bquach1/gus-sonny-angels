import { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";

import axios from "axios";

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
      <div
        style={{
          padding: 20,
          fontSize: 40,
          width: "100%",
          backgroundColor: "#FFD580",
          borderBottom: "1px solid black",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div>Gus' Sonny Angel Collectors' Log</div>
        <MenuIcon style={{ position: "absolute", right: 50, fontSize: 50 }} />
      </div>
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
