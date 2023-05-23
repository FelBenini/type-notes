import axios from "axios";
import React, { useEffect, useState } from "react";
import { Open_Sans } from "next/font/google";
import { FaRegCalendar, FaUserPlus } from "react-icons/fa";
import { Button, Tab, Tabs } from "@mui/material";
import UserPosts from "./UserPosts";
import { Cookies } from "react-cookie";
import { FiFeather } from "react-icons/fi";

const cookie = new Cookies();

const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });

export interface IUserInfo {
  _id: any;
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
  const [tabValue, setTabValue] = useState("post")
  const [userNameSession, setUserNameSession] = useState("");
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>();
  const [loading, setLoading] = useState(true);
  const followUser = async (id: string | undefined) => {
    const token = cookie.get('AUTHJWTKEY')
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/follow/${id}`, {}, { headers: { authorization: token } })
  }

  const fetchData = async (username: string | undefined) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${username}`);
    setUserInfo(data);
    setLoading(false);
  };
  const getUsername = async () => {
    const token = cookie.get("AUTHJWTKEY");
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
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
              onClick={() => followUser(userInfo?._id as string)}
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
          <Tabs value={tabValue} onChange={(event: React.SyntheticEvent, newValue: string) => {setTabValue(newValue)}}>
            <Tab label='Notes' value='post' sx={{margin: '0 auto'}}/>
            <Tab label='Notes and Replies' value='all' sx={{margin: '0 auto'}}/>
            <Tab label='Liked Notes' value='liked' sx={{margin: '0 auto'}}/>
          </Tabs>
        </div>
        <UserPosts username={username} type={tabValue} />
      </div>
    );
  } else {
    return <div className={`${openSans.className}`}>Now loading</div>;
  }
};

export default UserCard;
