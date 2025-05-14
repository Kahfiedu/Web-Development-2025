import { Button } from "@mui/material"
import { useAuth } from "../../../hooks/useAuth"

function DashboardAdmin() {
    const { logout } = useAuth()
    const handleLogout = () => {
        logout()
    }
    return (
        <div>
            <h1>Halman dashboard admin</h1>
            <Button onClick={handleLogout} >Logout</Button>
        </div>
    )
}

export default DashboardAdmin
