import {useEffect, useState} from "react";

export function useSearch(data) {
  const [dataToShow, setDataToShow] = useState([]);
  useEffect(() => {
    setDataToShow(data);
  }, [data]);

  const searchBytype = (rocketType) => {
    const res = data.filter((v) =>
      v.rocketType.toLocaleLowerCase().includes(rocketType.toLocaleLowerCase()),
    );
    setDataToShow(res);
  };

  const searchByCity = (city) => {
    const res = data.filter((v) =>
      v.city.toLocaleLowerCase().includes(city.toLocaleLowerCase()),
    );
    setDataToShow(res);
  };
  const reset = () => {
    setDataToShow(data);
  };
  const searchByDestroyed = (mode) => {
    console.log(data[0].destroyed, data[1].destroyed, data[2].destroyed);
console.log(mode);

    setDataToShow(
      mode === "all" ? data : data.filter((v) => `${v.destroyed}` === mode),
    );
  };

  return {dataToShow, searchByDestroyed, searchByCity, searchBytype, reset};
}
