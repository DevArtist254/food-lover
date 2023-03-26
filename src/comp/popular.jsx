import axios from "axios"
import {useEffect, useState} from "react"
import styled from "styled-components"
import {Splide, SplideSlide} from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"

function Popular() {
 const [trending, setTrending] = useState([])
 useEffect(() => {
  getPopular()
 }, [])

 const getPopular = async () => {
  try {
   const api = await axios.get(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_KEY}`
   )
   const data = await api.data.recipes[0].extendedIngredients

   console.log(data)
   setTrending(data)
  } catch (error) {
   console.log(error)
  }
 }

 return (
  <Wrapper>
   <q>Trending Extended Ingredients</q>

   <Splide
    options={{
     perPage: 3,
     arrows: false,
     pagination: false,
     drag: "free",
     gap: "5rem",
    }}
   >
    {trending.map((recipe) => {
     return (
      <SplideSlide>
       <Card key={recipe.id}>
        <h1>{recipe.nameClean}</h1>
        <Gradient />
        <img
         src={`https://spoonacular.com/recipeImages/716301-556x370.jpg`}
         alt={recipe.name}
        />
        <p>{recipe.original}</p>
       </Card>
      </SplideSlide>
     )
    })}
   </Splide>
  </Wrapper>
 )
}

const Wrapper = styled.div`
 margin: 4rem 0rem;
`

const Card = styled.div`
 min-height: 250px;
 overflow: hidden;
 border-radius: 2rem;
 position: relative;

 img {
  border-radius: 2rem;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
 }

 p {
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, 0%);
  color: white;
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
 }
`

const Gradient = styled.div`
 z-index: 3;
 position: absolute;
 width: 100%;
 height: 100%;
 background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`

export default Popular
