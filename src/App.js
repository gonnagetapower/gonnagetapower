import React, { useEffect, useState } from "react";
import { getIds, getItems, getPages, searchItems } from "./api/itemsApi";
import Product from "./components/Product/Product";

import './App.css'
import Pagination from "./components/Pagination/Pagination";
import ScreenSpinner from "./components/ScreenSpinner/ScreenSpinner";

const App = () => {

  const [items, setItems] = useState([])
  const [pages, setPages] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState()

  const [query, setQuery] = useState('')
  const [selectValue, setSelectValue] = useState('product')

  useEffect(() => {
    getPages().then(data => {
      setPages(Math.ceil(data / 50))
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    getIds(currentPage - 1)
      .then((ids) => {
        getItems(ids)
          .then((data) => {
            setItems(data)
            setLoading(false)
          })
      })
  }, [currentPage])

  const searchByQuery = (obj) => {
    setLoading(true)
    searchItems(obj).then((ids) => {
      getItems(ids, true)
        .then((data) => {
          setItems(data)
          setLoading(false)
        })
    })
  }

  if (!items) {
    return <ScreenSpinner />
  }
  console.log(selectValue)

  return (
    <div className="app">
      <h1>Тестовое задание!</h1>
      <div className="filter">
      <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
        <option value="product">По названию</option>
        <option value="price">По цене</option>
        <option value="brand">По бренду</option>
      </select>
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="filter__input" type={selectValue === "price" ? 'number' : 'text'} />
        <button disabled={!query ? true : false} onClick={() => searchByQuery({[selectValue]: query})}>Кнопочка</button>
      </div>
      {items.length === 50 ? <Pagination pageCount={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : ""}
      {loading ? (<><ScreenSpinner /></>) : (
        <>
          <div className='product-container' >
            {items.map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
