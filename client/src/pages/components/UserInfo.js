import React from "react";
import { useGlobalState } from "state-pool";
import ManageAccountsIcon from "@material-ui/icons/AccountCircle";
import LogoutIcon from "@material-ui/icons/MeetingRoom";
import TagCreator from "./TagCreator";

function UserInfo() {
    const [userInfo] = useGlobalState("userInfo");
    // eslint-disable-next-line
    const [openAccount, setOpenAccount] = useGlobalState("openAccountSettings");
    const handleProfileClick = () => {
        setOpenAccount(true);
    };
    const handleLogoutClick = () => {
        console.log("clicked");
        // hopefully passport will redirect back to login automatically
        fetch("/api/logout").catch((error) => {
            console.log(error);
        });
    };
    return (
        <>
            <div className="user-info">
                <img src={userInfo.photo} alt="userphoto" />
                <h1>
                    Hello, {userInfo.firstName} {userInfo.lastName}
                </h1>
                <div>
                    <button onClick={handleProfileClick}>
                        <div style={{ display: "flex" }}>
                            <ManageAccountsIcon
                                style={{ paddingRight: "0.5rem" }}
                            />
                            Profile Settings
                        </div>
                    </button>

                    <button onClick={handleLogoutClick}>
                        <div style={{ display: "flex" }}>
                            <LogoutIcon style={{ paddingRight: "0.5rem" }} />
                            Logout
                        </div>
                    </button>
                    <TagCreator />
                </div>
                <h4>{userInfo.username}</h4>
            </div>
        </>
    );
}

export default UserInfo;
