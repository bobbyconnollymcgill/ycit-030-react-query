import { useEffect, useState } from "react"
import "./App.css"

// [
//   {
//     "id": 4,
//     "title": "Handmade Fresh Table",
//     "price": 687,
//     "description": "Andy shoes are designed to keeping in...",
//     "category": {
//       "id": 1,
//       "name": "Others",
//       "image": "https://placeimg.com/640/480/any?r=0.591926261873231"
//     },
//     "images": [
//       "https://placeimg.com/640/480/any?r=0.9178516507833767",
//       "https://placeimg.com/640/480/any?r=0.9300320592588625",
//       "https://placeimg.com/640/480/any?r=0.8807778235430017"
//     ]
//   }
//   // ...
// ]

export function App() {
    const [selectedCategoryId, setSelectedCategoryId] = useState(1) // <--- app state

    const [products, setProducts] = useState(null) // <--- server state

    useEffect(() => {
        setTimeout(() => {
            fetch(
                `https://api.escuelajs.co/api/v1/categories/${selectedCategoryId}/products`
            )
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(data)
                    setProducts(data)
                })
        }, 1000)
    }, [selectedCategoryId])

    const divifiedProducts = products?.map((el) => {
        return (
            <div>
                <div>{el.title}</div>
                <img src={el.images[0]} />
                <div>{el.price}</div>
            </div>
        )
    })

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        setProducts(null)
                        setSelectedCategoryId(1)
                    }}
                >
                    1
                </button>
                <button
                    onClick={() => {
                        setProducts(null)
                        setSelectedCategoryId(2)
                    }}
                >
                    2
                </button>
            </div>

            {!products ? <div className="loading-spinner" /> : divifiedProducts}

            {/* Same as ternary above */}
            {/* {!products && <div className="loading-spinner" />}
            {!!products && divifiedProducts} */}
        </div>
    )
}
