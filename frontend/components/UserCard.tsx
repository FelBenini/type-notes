import axios from "axios";
import React, { useEffect, useState } from "react";
import { Open_Sans } from "next/font/google";
import { FaRegCalendar, FaUserPlus } from "react-icons/fa";
import { Button } from "@mui/material";
import UserPosts from "./UserPosts";
import { Cookies } from "react-cookie";
import { FiFeather } from "react-icons/fi";

const cookie = new Cookies();

const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });

export interface IUserInfo {
  username: string;
  email: string;
  displayName: string;
  followers: Array<string>;
  followerCount: Number;
  following: Array<string>;
  followingCount: Number;
  profilePic: string;
  bannerPic: string;
  createdAt: string;
}

const UserCard = ({ username }: { username: string | undefined }) => {
  const [userNameSession, setUserNameSession] = useState("");
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>();
  const [loading, setLoading] = useState(true);
  const fetchData = async (username: string | undefined) => {
    const { data } = await axios.get(`http://localhost:4000/user/${username}`);
    setUserInfo(data);
    setLoading(false);
  };
  const getUsername = async () => {
    const token = cookie.get("AUTHJWTKEY");
    const { data } = await axios.get(`http://localhost:4000/session`, {
      headers: {
        authorization: token,
      },
    });
    setUserNameSession(data.session.username);
  };
  useEffect(() => {
    if (!username) {
      return;
    }
    fetchData(username);
    getUsername();
    return;
  }, [username]);

  if (!loading) {
    const getUserPfpStyle = (pic: string, type: string) => {
      let picture;
      if (pic === "" && type === "pfp") {
        picture = "url(/img/defaultPfp.png)";
      } else if (pic === "" && type === "banner") {
        picture = "url(/img/defaultBanner.png)";
      } else {
        picture = `url(${pic})`;
      }
      let style = {
        backgroundImage: `${picture}`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      };
      return style;
    };
    const createdAt = new Date(userInfo?.createdAt as string);
    return (
      <div
        className={`UserCardContainer ${openSans.className} sideMenuPositioned`}
      >
        <div
          id="bannerUser"
          style={getUserPfpStyle(userInfo?.bannerPic as string, "banner")}
        ></div>
        <div className="userInformation">
          {userNameSession.toUpperCase() === username?.toUpperCase() ? (
            <Button
              startIcon={<FiFeather />}
              color="primary"
              sx={{ padding: "12px 24px", borderRadius: "60px" }}
              variant="outlined"
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              startIcon={<FaUserPlus />}
              color="secondary"
              sx={{ padding: "12px 24px", borderRadius: "60px" }}
              variant="contained"
            >
              Follow
            </Button>
          )}

          <span
            id="profilePicUser"
            style={getUserPfpStyle(userInfo?.profilePic as string, "pfp")}
          ></span>
          <h1>{userInfo?.displayName}</h1>
          <h4>@{userInfo?.username}</h4>
          <p>
            <FaRegCalendar /> Member since{" "}
            {createdAt.toLocaleString("en-US", { month: "long" })}{" "}
            {createdAt.getFullYear()}
          </p>
          <span className="followInformation">
            <p>
              <b>
                <>{userInfo?.followerCount}</>
              </b>{" "}
              followers
            </p>
            <p>
              <b>
                <>{userInfo?.followingCount}</>
              </b>{" "}
              following
            </p>
          </span>
        </div>
        <UserPosts username={username} />
      </div>
    );
  } else {
    return <div className={`${openSans.className}`}>Now loading</div>;
  }
};

export default UserCard;
