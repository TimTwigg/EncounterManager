import React, { Suspense } from "react"
import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import "@src/styles/main.scss"

const TanStackRouterDevtools =
    process.env.NODE_ENV === "production"
        ? () => <></>
        : React.lazy(() =>
            import("@tanstack/router-devtools").then((res) => ({
                default: res.TanStackRouterDevtools
            })),
        )

export const Route = createRootRoute({
    component: () => (
        <div className="pageDiv container">
            <nav>
                <h4>Encounter Manager</h4>
                <span>
                    <Link to="/">
                        Home
                    </Link>{" "}
                    <Link to="/library">
                        Library
                    </Link>
                </span>
            </nav>
            <Outlet />
            <Suspense>
                <TanStackRouterDevtools />
            </Suspense>
        </div>
    ),
})
