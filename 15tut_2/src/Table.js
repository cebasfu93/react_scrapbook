import React from "react";

const Cell = ({ prop }) => {
  return <td>{JSON.stringify(prop[1])}</td>;
};

const Row = ({ item }) => {
  return (
    <tr>
      {Object.entries(item).map((prop, ix) => (
        <Cell key={ix} name={ix} prop={prop} />
      ))}
    </tr>
  );
};

const Table = ({ items }) => {
  return (
    <table>
      <tbody>
        {items.map((item) => (
          <Row key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
