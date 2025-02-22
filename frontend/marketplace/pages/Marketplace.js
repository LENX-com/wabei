import React, { useState, useEffect, Fragment } from "react";
import CategoryProduct from '../components/product/CategoryProduct'
import { getCategories} from "../../actions/categoryAction";
import {  getFilteredProducts,getProducts,  getBrands } from "../../actions/productAction";
import { getSubs, getSubByCategory } from "../../actions/subCategoryAction";
import { useDispatch, useSelector } from "react-redux";
import {  Pagination } from "@windmill/react-ui";
import Button from '../../components/Buttons/Button'
import ReactSlider from "react-slider";
import "../components/shop/Shop.scss";
import SectionTitle from '../../components/Typography/SectionTitle'
import { useMediaQuery } from 'react-responsive'
import FilterDialogue from '../components/category/FilterDialogue'
import NavBar from '../components/navBar/NavBar'
import { Disclosure } from '@headlessui/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Up, Star, EmptyStar, NotFound } from '../assets/icons'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import Rating from 'react-rating'
import { AiTwotoneShopping, AiFillShop, AiOutlineSearch, AiFillCar, AiOutlineDown, AiOutlineClose } from 'react-icons/ai'
import { NoProduct } from '../assets/icons'

const Marketplace = (props) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const { brands } = useSelector((state) => state.product.brands);
  const { products, count } = useSelector((state) => state.product.products);
  const [rating, setRating ] = useState("")
  const [price, setPrice] = useState([1, 500]);
  const [ pagination, setPagination ] = useState(false)
  const [ isOpen, setIsOpen ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ok, setOk] = useState(false);
  const [ isFiltered, setIsFiltered ] = useState(false);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [ value, setValue ] = useState("")
  const [brand, setBrand] = useState("");
  const [ menuOption, setMenuOption ] = useState("Products")
  const [ category, setCategory ] = useState("");
  
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory()
  let location = useLocation()

   let params = location.search

   console.log({params})

  useEffect(() => {
    // fetch categories
     dispatch(getCategories());
     dispatch(getBrands())
     dispatch(getFilteredProducts( params ? params : `?page=${page}&search=${value}&category=${category}&price=${price}&rating=${rating}&author=${brand}&sub=${sub}`))
     // fetch subcategories
    }, [dispatch]);

    useEffect(() => {
      if(category !== undefined || false ) {
        getSubByCategory(category).then((res) => setSubs(res.data));
      }
  }, [category]);


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getFilteredProducts(location.search))
  }

  // this filters by price
    const handleSlider = (data) => {
    history.push(`?page=${page}&search=${value}&category=${category}&price=${data}&rating=${rating}&author=${brand}&sub=${sub}`)
    setPrice(data);
    setIsFiltered(true)
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  }

    const handleRating = (num) => {
    // console.log(num);
    history.push(`?page=${page}&search=${value}&category=${category}&price=${price}&rating=${num}&author=${brand}&sub=${sub}`)
    setIsFiltered(true)
    setRating(num)
  }

  const handlePagination = (data) => {
    setPagination(data - 1)
    // history.push(`?page=${data - 1}&search=${value}&category=${category}&price=${price}&rating=${rating}&author=${brand}&sub=${sub}`)
    // let search = `?page=${data -1 }&search=${value}&category=${category}&price=${price}&rating=${rating}&author=${brand}&sub=${sub}`
    // setTimeout( 
    //   () => dispatch(getFilteredProducts(search))
    // , 300)
  };

  
  const handleSearch = React.useCallback((e) => {
    setIsFiltered(true)
    history.push(`?page=${page}&search=${e.target.value}&category=${category}&price=${price}&rating=${rating}&author=${brand}&sub=${sub}`)
    setValue(e.target.value)
  }, [value])

  const handleSub = (data) => {
    let address = `?page=${page}&search=${value}&category=${category}&price=${price}&rating=${rating}&author=${brand}&sub=${data._id}`
    setSub(data._id);
    setIsFiltered(true)
    setTimeout(() => dispatch(getFilteredProducts( address , brand )), 500)
  };

  const handleBrand = (data) => {
    history.push(`?page=${page}&search=${value}&category=${category}&price=${price}&rating=${rating}&author=${data}&sub=${sub}`)
    setIsFiltered(true)
    setBrand(data);
  };
  
    const handleCategory = (data) => {
      history.push(`?page=${page}&search=${value}&category=${data}&price=${price}&rating=${rating}&author=${brand}`)
      setIsFiltered(true)
      setSub("")
      setCategory(data);
    };
  
  const removeFilters = () => {
    setIsFiltered(false)
    setBrand("")
    setValue("")
    setCategory("")
    setPrice([1,500])
    setSub("")
    setRating("")
     dispatch(getFilteredProducts(`?page=${0}&search=${""}&category=${""}&price=${"1,500"}&rating=${""}&author=${""}&sub=${""}`))
  }

  const ratings = [ 5, 4, 3, 2, 1 ]

   const Ratings = React.memo(() => (
    <div className="grid gap-0">
        {ratings.map( (data, i) =>
            <div  
                onClick= { () => handleRating(data) } 
                className="cursor-pointer" 
            >
                <Rating
                    className=""
                    fullSymbol= { <Star className= "text-lg" style={{width:"16px", height: "16px"}}/> }
                    emptySymbol ={ <EmptyStar className= "text-lg" style={{width:"16px", height: "16px"}}/>}
                     readonly
                    initialRating={data}
                />
            </div>
         )}
    </div>
  ))

  const noProductsFound = () => (
    <div className="my-2">
      <div className="mx-auto text-center">
        <NoProduct className="mx-auto"/>
      </div>
      <div className="my-3 text-lg text-center">
        No Products Found
      </div>
    </div>
  )


  return (

      <div className="container mx-auto">
          <div className=" ">
      { !isTabletOrMobile &&
        <NavBar>
          <form onSubmit={handleSubmit}>
           <div className="mb-8">
            <div className="shadow-separator pb-4">
                  <div className="text-center">
                      <SectionTitle> Marketplace </SectionTitle>
                  </div>
                  <div className="px-3 mb-4">
                      <div className="flex bg-Grey-dashboard rounded-lg px-3 py-1 border-box">
                          <AiOutlineSearch className="my-auto ml-1  text-Black-medium"/>
                          <input className="bg-Grey-dashboard focus:outline-none focus:border-purple-50 " placeholder="Search marketplace" onChange={handleSearch}/>
                      </div>
                  </div>
                  { isFiltered &&
                  <div className="px-3">
                    <button className="bg-Black-text px-3 py-1 text-sm flex rounded-md my-3 text-white"
                            type="button"
                            onClick={removeFilters}        
                    >
                      Clear filters
                      < AiOutlineClose className="my-auto ml-2" />
                    </button>
                  </div>
                }
              </div>
              <div className="">
                  <div className="text-center">
                      <SectionTitle> Categories </SectionTitle>
                  </div>
                  <div className="px-3">
                      <div>
                          {categories?.map( data => 
                              <div className= {`p-3 rounded-md flex hover:bg-Grey-hover cursor-pointer my-1 ${category === data.id && "bg-Grey-hover"}`}
                                  onClick={() => handleCategory(data.id)}
                              >
                                  <div className="rounded-full bg-Grey-dashboard p-2">
                                      <AiFillCar className="m-auto"/>
                                  </div>
                                  <span className="font-bold text-base my-auto ml-2 text-Black capitalize">
                                      {data.name}
                                  </span>
                              </div>
                          )}
                      </div>
                  </div>
                  <div className="my-2">
                      <div className="border-t border-b border-Grey-border">
                          <Disclosure>
                              {({open}) => (
                              <>
                              <Disclosure.Button className="py-2 flex justify-between w-full">
                                  <span className="text-black font-bold my-auto text-base"> Rating </span>
                                  <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                      <Up
                                          className={`${
                                          open ? '' : 'transform rotate-180'
                                      } text-lg text-Black-medium m-auto font-bold`}
                                      />
                                  </div>
                              </Disclosure.Button>
                              <Disclosure.Panel className="text-gray-500 p-3">
                                  <Ratings />
                              </Disclosure.Panel>
                              </>
                              )}
                          </Disclosure>
                      </div>
                      <div className="border-b border-Grey-border">
                          <Disclosure>
                              {({open}) => (
                              <>
                              <Disclosure.Button className="py-2 flex justify-between w-full">
                                  <span className="text-black font-bold my-auto"> Filter by price </span>
                                  <div className="bg-Grey-dashboard rounded-full p-1 hover:bg-Grey-hover">
                                      <Up
                                          className={`${
                                          open ? '' : 'transform rotate-180'
                                      } text-lg text-Black-medium m-auto font-bold`}
                                      />
                                  </div>
                              </Disclosure.Button>
                              <Disclosure.Panel className="text-gray-500 px-3 mb-3">
                                  <div className="grid">
                                      <div onClick={() => handleSlider([0,25])}>
                                      <span className="ml-2 text-Black text-base cursor-pointer hover:text-Blue"> Under £25</span>
                                      </div>
                    
                                    
                                      <div onClick={() => handleSlider([25,50])}>
                                      <span className="ml-2 text-Black text-base cursor-pointer hover:text-Blue"> £25 to £50</span>
                                      </div>
                      
                                      <div onClick={() => handleSlider([50,100])}>
                                      <span className="ml-2 text-Black text-base cursor-pointer hover:text-Blue"> £50 to £100</span>
                                      </div>
                    
                                    
                                      <div onClick={() => handleSlider([100,200])}>
                                      <span className="ml-2 text-Black text-base cursor-pointer hover:text-Blue"> £100 to £200 </span>
                                      </div>
                    
                                  </div>
                              </Disclosure.Panel>
                              </>
                              )}
                          </Disclosure>
                      </div>
                      <div className="mt-3 px-3 pb-12">
                          <span className="text-black font-bold my-auto "> Stores </span>
                          { brands &&
                            <Swiper
                                slidesPerView= { 3 }
                                spaceBetween={ 20 }
                                className="mb-8 mt-3 brands"
                                pagination={{
                                    "type": "progressbar"
                                    }}
                                                        >
                                    {brands.map((b) => (
                                        <SwiperSlide>
                                            <button onClick={() => handleBrand(b.name)} type="button">
                                                <section className="h-12 w-12 bg-cover bg-center rounded-md shadow-button cursor-pointer" style={{background: `url("${b.avatar}")`}}/>
                                                <h1 className={`text-center mx-auto capitalize ${b.name === brand && "font-bold"}`}> {b.name} </h1>
                                            </button>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                          }  
                      </div>              
                  </div>
              </div>
            </div>
            <div className="px-3 text-center fixed bottom-0 p-3 bg-white border-t border-Grey-border z-50" style={{width: "300px"}}>
              <div className="grid w-3/4 mx-auto">
                <Button type="submit" className="text font-bold text-Black-text py-1 px-3 grid w-3/4 mx-auto"> Apply filters </Button>
              </div>
            </div>
          </form>
        </NavBar>
        }
          <div className="ml-36 mobile:ml-0">
            <div className="bar">
                <div className="">
                  <div className="grid grid-cols-2 max-w-sm">
                    <div className="text-Black-medium">
                    <NavLink to="/marketplace" className="p-2 border-b-2 justify-center font-bold text-center cursor-pointer flex "  activeClassName="border-Blue text-Blue" >
                          <AiTwotoneShopping className="my-auto text-xl mr-1"/>
                          Products
                    </NavLink>
                    </div>

                    <div className="text-Black-medium">
                    <NavLink to="/marketplace/stores" className="p-2 border-b-2 justify-center font-bold text-center cursor-pointer flex "  activeClassName="border-Blue text-Blue" >
                        <AiFillShop className="my-auto text-xl mr-1"/>
                        Stores
                          </NavLink>
                    </div>
                </div>
                <div className="px-5 my-5">

                  { isTabletOrMobile ?
                     ( 
                      <div>
                        <div className="flex bg-white rounded-lg px-3 border-box relative mb-2">
                          <input className="bg-white focus:outline-none focus:border-purple-50 py-1 w-full " value={value} placeholder="Search Products" onChange= {handleSearch} />
                           <button className=" absolute right-0 top-0 bg-Blue" style={{height:"34px", borderRadius: "12px 12px 12px 12px"}}
                                   onClick={handleSubmit}
                           >
                            <AiOutlineSearch className="my-auto ml-1  text-white text-xl"/>
                          </button>
                        </div>
                        <div className="flex my-5 mobile:justify-between">
                          <div>
                            { subs &&
                              <Swiper
                                spaceBetween={0}
                                slidesPerView={3}
                                className="w-full"
                              >
                                {subs.map( data => (
                                  <SwiperSlide className="w-auto">
                                    <div className= {`capitalize m-1 rounded-md px-4 py-1 font-bold cursor-pointer hover:bg-Grey-hover text-sm border-box  text-center bg-white ${sub === data._id  && 'bg-Grey-hover'}`}
                                      onClick={() => handleSub(data)}
                                    >
                                    {data.name}
                                    </div>
                                  </SwiperSlide>  
                                ))}
                              </Swiper> 
                            }
                          </div>
                          <div className="">
                            <FilterDialogue 
                              price ={price}
                              handleSlider= {handleSlider }
                              handleBrand = {handleBrand}
                              handleRating= {handleRating}
                              handleCategory = { handleCategory } 
                              brands ={brands}
                              categories={categories}
                              rating={rating}
                              handleSubmit={handleSubmit}
                              category= {category}
                              isopen={isOpen}
                              setIsOpen={setIsOpen}
                              isFiltered={isFiltered}
                              removeFilters={removeFilters}
                              brand={brand}
                            />
                          </div>
                        </div>
                      </div>
                        
                    ) : (
                      
                    <div className="flex mb-3 mobile:justify-between">
                      { subs && subs.map( data => (
                          <div className= {`capitalize m-1 rounded-md px-4 py-1 font-bold cursor-pointer hover:bg-Grey-hover text-sm border-box  text-center bg-white ${sub === data._id  && 'bg-Grey-hover'}`}
                             onClick={() => handleSub(data)}
                        >
                         {data.name}
                        </div>  
                      ))}
                    </div>
                   )}

                    { products?.length > 0 ? 
                    <>
                      <div className="grid grid-cols-4 gap-4 mobile:grid-cols-1">
                        { products?.map((p, i) => (
                          <div key={p._id}>
                            <CategoryProduct product={p} />
                          </div>
                          ))}
                      </div>
                    </>
                          :

                           <div className="mb-4 mx-auto">
                              <div className="m-auto text-center">
                                  <NotFound className="text-center mx-auto my-2"/>
                                  <span className="font-bold capitalize"> Sorry there are no products  available </span>
                              </div>
                          </div>
                      }
                <div className="my-3">
                  <Pagination
                    totalResults={count ? count : 0}
                    resultsPerPage={10}
                    onChange={(value) => handlePagination(value)}
                  />
                </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      </div>

  );
};

export default Marketplace;

