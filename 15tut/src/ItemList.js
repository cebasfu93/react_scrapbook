const ItemList = (data) => {
  //   return <ul>{items[0]}</ul>;
  console.log(data.data);
  console.log(data.data[0]);
  return (
    <ul>
      {data.data.map((item) => (
        <>
          <li key={item.id}>
            <label>{JSON.stringify(item)}</label>
          </li>
        </>
      ))}
    </ul>
  );
};

export default ItemList;
