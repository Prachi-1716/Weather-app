

let Map = () => {
  return (
    <div className="row mt-3">
      <div className="col-md-10 col-lg-8 m-auto mt-3"><h3>Map</h3></div>
      <div className="col-md-10 col-lg-8 m-auto" style={{ height: "400px" }}>
        <div id="map" style={{ height: "100%" }}></div>
      </div>
    </div>
  );
};

export { Map };
