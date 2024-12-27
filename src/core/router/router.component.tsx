import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { OrdersPage } from "../../scenes/orders"
import { RouteNotFound } from "../../common/routeNotFound"
import { OrdersProvider } from "../context/ordersContext"
import { CreateOrderPage } from "../../scenes/newOrder"
import { DetailOrderPage } from "../../scenes/DetailOrder"

export const RouterComponent: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <OrdersProvider>
                    <Routes>
                        <Route path="*" element={<RouteNotFound />} />
                        <Route path="/" element={<Navigate to={"/orders"} replace />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/orders/new_order" element={<CreateOrderPage />} />
                        <Route path="/orders/:orderId" element={<DetailOrderPage />} />
                    </Routes>
                </OrdersProvider>
            </BrowserRouter>
        </>
    )
}