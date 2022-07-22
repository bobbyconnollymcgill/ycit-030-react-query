import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import "./App.css"

export function AppWithCaching() {
    const [selectedCategoryId, setSelectedCategoryId] = useState(1) // <--- app state

    const query = useQuery(
        ["categories", selectedCategoryId, "products"],
        () => {
            return fetch(
                `https://api.escuelajs.co/api/v1/categories/${selectedCategoryId}/products`
            )
                .then((res) => {
                    // return Promise.reject("something terrible happened")

                    return res.json()
                })
                .then((data) => {
                    // console.log(data)

                    return data
                })
        }
    )

    const { isLoading, isError, data, error, isRefetch } = query

    console.log("error", isError, error)

    const divifiedProducts =
        data?.map((el) => {
            return (
                <div key={el.id}>
                    <div>{el.title}</div>
                    <img src={el.images[0]} />
                    <div>{el.price}</div>
                </div>
            )
        }) ?? null

    const buttons = [1, 2].map((el) => (
        <button key={`button-${el}`} onClick={() => setSelectedCategoryId(el)}>
            {el}
        </button>
    ))

    return (
        <div>
            <div>{buttons}</div>

            {/* Same as ternary above */}
            {isLoading && <div className="loading-spinner" />}
            {!isLoading && divifiedProducts}
        </div>
    )
}
